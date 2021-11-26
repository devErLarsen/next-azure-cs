

import { BlobServiceClient } from "@azure/storage-blob";
import { v1 as uuidv1 } from 'uuid'

// const multer = require('multer')

import formidable from 'formidable'

import multer from "multer";
// const getStream = require('into-stream')
import intoStream from "into-stream";
import axios from "axios";
const inMemoryStorage = multer.memoryStorage()
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image')
const ONE_MEGABYTE = 1024 * 1024
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 }

const containerName = 'erlarsen'
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.BLOB_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(process.env.BLOB_CONTAINER);

// export const config = {
//     api: {
//       bodyParser: false
//     }
// };
export const config = {
    api: {
      bodyParser: {
          sizeLimit: '25mb'
      }
    }
};

export default async (req, res) => {
    if (req.method === 'POST') {

        const { dataString } = req.body
        const buf = Buffer.from(dataString, 'base64')

        const facecheck = await axios.post(`${process.env.ENDPOINT}/face/v1.0/detect?detectionModel=detection_03&returnFaceId=true&returnFaceLandmarks=false`, buf, {
            headers: { 'content-type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': process.env.KEY }
        })
        if (!facecheck || facecheck.data.length > 1)
            return res.status(400).json('found no/too many faces in submitted image. Make sure there is only one face in the image you capture')

        const stream = intoStream(buf)

        const blobName = new Date().toISOString() + '-' + uuidv1() + '.jpg'
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        try {
            await blockBlobClient.uploadStream(stream)
            res.status(200).json({ message: 'File uploaded to Azure Blob Storage.' })
        } catch (error) {
            console.log(error)
        }
        
        
        // const form = new formidable.IncomingForm()
        // form.parse(req, async (err, fields, files) => {
        //     console.log(files.file.filepath)
        //     const blobName = new Date().toISOString() + '-' + uuidv1() + '.jpg'
        //     const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        //     await blockBlobClient.uploadFile(files.file.filepath)
        //     return res.status(200).json({ message: 'File uploaded to Azure Blob Storage.' })
        //     // return res.status(200).json('hei')
        // })
        
        // console.log(req.body)s
        // const stream = intoStream(req.file)
        // console.log(stream)

        // try {
        //     await blockBlobClient.uploadFile(stream, uploadOptions.bufferSize, uploadOptions.maxBuffers, {
        //          blobHTTPHeaders: { blobContentType: 'image/jpeg' } 
        //     })
        //     res.status(200).json({ message: 'File uploaded to Azure Blob Storage.' })
        // } catch (err) {
        //     res.status(500).json({ message: 'error' })
        // }


    } else {
        // url example https://erlarsen.blob.core.windows.net/faces/2021-11-15T08:51:13.785Z-301685a0-45f1-11ec-b5cb-7701fe06a285.jpg
        try {
            const faces = []
            for await (const blob of containerClient.listBlobsFlat()) {
                faces.push(blob)
            }
            res.status(200).json(faces)
        } catch (error) {
            res.status(error.response.status).json(error.response.data)
        }
    }
}