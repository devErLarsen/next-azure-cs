import { BlobServiceClient } from "@azure/storage-blob";
import { v1 as uuidv1 } from 'uuid'


const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.BLOB_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient('faces');


export async function uploadPictureToAzure(base64String) {
    const blobName = 'face_' + uuidv1() + '.jpg'

    // const res = await fetch(base64String);
    // const blob = await res.blob();
    // const file = new File([blob], uuidv1())
    // const filestream = file.stream()

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // const stream = blob.stream()
    const content = "hello world"
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length)
    console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
    return `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
}