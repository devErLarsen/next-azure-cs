

import { BlobServiceClient } from "@azure/storage-blob";
import { v1 as uuidv1 } from 'uuid'
import intoStream from "into-stream";
import axios from "axios";

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.BLOB_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(process.env.BLOB_CONTAINER);

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