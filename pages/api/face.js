
import { FaceClient } from "@azure/cognitiveservices-face"
import  { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js"
import axios from "axios";
import { sleep } from "../../utils/utils";


export const config = {
    api: {
      bodyParser: {
          sizeLimit: '25mb'
      }
    }
};



const credentials = new CognitiveServicesCredentials(process.env.KEY);
const client = new FaceClient(credentials, process.env.ENDPOINT);

export default async function handler(req, res) {
    
    if(req.method === 'POST') {

        // destructure request body
        const { capture, images } = req.body
        // image string to buffer
        const buf = Buffer.from(capture, 'base64')

        // images from blob storage
        const targetFaces = await Promise.all(images.map(async image => {
            // console.log(process.env.ENDPOINT, process.env.STORAGE_ACCOUNT, process.env.KEY, image.name)
            // let imageURL = `https://${process.env.STORAGE_ACCOUNT}.blob.core.windows.net/${process.env.BLOB_CONTAINER}/${image.name}`
            
            let detected = await axios.post(`${process.env.ENDPOINT}/face/v1.0/detect?detectionModel=detection_03&returnFaceId=true&returnFaceLandmarks=false`,
            { 
                url: image
            }, {
                headers: { 'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.KEY }
            })

            await sleep(1000)

            if (detected.data[0]?.faceId)
                return {image, faceId: detected.data[0]?.faceId}
        }))

        // current image from webcam
        const sourceFace = await axios.post(`${process.env.ENDPOINT}/face/v1.0/detect?detectionModel=detection_03&returnFaceId=true&returnFaceLandmarks=false`, buf, {
            headers: { 'content-type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': process.env.KEY }
        })

        const sourceFaceId = sourceFace.data[0]?.faceId
        if (!sourceFaceId || sourceFace.data.length > 1)
            return res.status(400).json('found no/too many faces in submitted image. Make sure there is only one face in the image you capture')

        const match = await axios.post(`${process.env.ENDPOINT}/face/v1.0/findsimilars`, {
            faceId: sourceFaceId,
            faceIds: targetFaces.map(f => f.faceId),
            maxNumOfCandidatesReturned: 10,
            mode: 'matchPerson'
        },{
            headers: { 'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.KEY }
        })

        const matchingPersonId = match.data[0]?.faceId
        if(matchingPersonId === undefined) {
            return res.status(404).json('No match')
        }

        const matchingPersonURL = targetFaces.filter(p => p.faceId === matchingPersonId)[0].image

        res.status(200).json(matchingPersonURL)


    } else {
        res.end()
    }
}


