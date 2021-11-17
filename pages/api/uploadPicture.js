import { uploadPictureToAzure } from "../../utils/storage";

import { BlobServiceClient } from "@azure/storage-blob";
import { v1 as uuidv1 } from 'uuid'

// const multer = require('multer')

import formidable from 'formidable'

import multer from "multer";
// const getStream = require('into-stream')
import intoStream from "into-stream";
const inMemoryStorage = multer.memoryStorage()
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image')
const ONE_MEGABYTE = 1024 * 1024
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 }

const containerName = 'erlarsen'
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.BLOB_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient('faces');

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

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { dataString } = req.body
        const buf = Buffer.from(dataString, 'base64')
        console.log(buf)
        const stream = intoStream(buf)
        // console.log(dataString)

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
        const faces = []
        for await (const blob of containerClient.listBlobsFlat()) {
            faces.push(blob)
        }
        res.status(200).json(faces)
    }
}