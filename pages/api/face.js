
import { FaceClient } from "@azure/cognitiveservices-face"
import  { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js"
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'
import { b64toBlob, b64toByteArray, dataURLtoBlob, sleep } from "../../utils/utils";

// import formidable from 'formidable'


export const config = {
    api: {
      bodyParser: {
          sizeLimit: '25mb'
      }
    }
};



const credentials = new CognitiveServicesCredentials(process.env.KEY2);
const client = new FaceClient(credentials, process.env.ENDPOINT);


const personsWithPicture = {
    'Erna': 'https://erlarsen.blob.core.windows.net/faces/2021-11-15T08:51:13.785Z-301685a0-45f1-11ec-b5cb-7701fe06a285.jpg',
    'Jonas': 'https://erlarsen.blob.core.windows.net/faces/2021-11-15T08:51:31.343Z-3a8d81f0-45f1-11ec-b5cb-7701fe06a285.jpg',
    'Jens': 'https://erlarsen.blob.core.windows.net/faces/2021-11-15T08:51:46.694Z-43b3e260-45f1-11ec-b5cb-7701fe06a285.jpg',
    'Erik': 'https://erlarsen.blob.core.windows.net/faces/2021-11-15T10:06:03.756Z-a451b9d0-45fb-11ec-b8f6-0360d4612d3d.jpg'
}

// const source = 'https://gfx.nrk.no/12b-5Fm2CsLZ53ax_AhAqAbkX8Yi3UlScDrlE_NTPRVg'

export default async function handler(req, res) {
    
    if(req.method === 'POST') {


        // THIS WORKS!!!!!'
        const { capture, images } = req.body
        const buf = Buffer.from(capture, 'base64')
        // console.log(buf)
        // console.log(images)
        // console.log(images[0].name)
        // console.log(`${process.env.ENDPOINT}face/v1.0/detect?detectionModel=detection_03&returnFaceId=true&returnFaceLandmarks=false`)


        // images from blob storage
        const targetFaces = await Promise.all(images.map(async image => {
            // console.log(process.env.ENDPOINT, process.env.STORAGE_ACCOUNT, process.env.KEY2, image.name)
            let imageURL = `https://${process.env.STORAGE_ACCOUNT}.blob.core.windows.net/faces/${image.name}`
            
            let detected = await axios.post(`${process.env.ENDPOINT}face/v1.0/detect?detectionModel=detection_03&returnFaceId=true&returnFaceLandmarks=false`,
            { 
                url: imageURL
            }, {
                headers: { 'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.KEY2 }
            })
            console.log(detected)

            await sleep(1000)

            if (detected.data[0]?.faceId)
                return {imageURL, faceId: detected.data[0]?.faceId}
        }))

        // console.log(targetFaces)

        // current image from webcam
        const sourceFace = await axios.post(`${process.env.ENDPOINT}face/v1.0/detect?detectionModel=detection_03&returnFaceId=true&returnFaceLandmarks=false`, buf, {
            headers: { 'content-type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': process.env.KEY2 }
        })

        // console.log(sourceFace)
        const sourceFaceId = sourceFace.data[0]?.faceId
        if (!sourceFaceId || sourceFace.data.length > 1)
            return res.status(400).json('found no/too many faces in submitted image. Make sure there is only one face in the image you capture')

        const match = await axios.post(`${process.env.ENDPOINT}face/v1.0/findsimilars`, {
            faceId: sourceFaceId,
            faceIds: targetFaces.map(f => f.faceId),
            maxNumOfCandidatesReturned: 10,
            mode: 'matchPerson'
        },{
            headers: { 'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.KEY2 }
        })

        // console.log(match)
        const matchingPersonId = match.data[0].faceId

        const matchingPersonURL = targetFaces.filter(p => p.faceId === matchingPersonId)[0].imageURL

        console.log(matchingPersonURL)
        res.status(200).json(matchingPersonURL)
        
       



        


        

        // const personGroupId = uuidv4()
        // await client.personGroup.create(personGroupId, { name : personGroupId, recognitionModel : "recognition_04" });
        // await addFacesToPersonGroup(personsWithPicture, personGroupId)
        // await client.personGroup.train(personGroupId);
        // await WaitForPersonGroupTraining(personGroupId)

        // let faceIds = (await DetectFaceRecognize(blob)).map(face => face.faceId)

        // let results = await client.face.identify(faceIds, { personGroupId : personGroupId});
        // await Promise.all (results.map (async result => {
        //     let person = await client.personGroupPerson.get(personGroupId, result.candidates[0].personId);
        //     console.log("Person: " + person.name + " is identified for face in: " + source + " with ID: " + result.faceId + ". Confidence: " + result.candidates[0].confidence + ".");
        // }));

        // res.status(200).json("success")


    } else {
        res.end()
    }
}


const addFacesToPersonGroup = async (personsWithPicture, personGroupId) => {

    await Promise.all(Object.keys(personsWithPicture).map(async (key) => {
        const value = personsWithPicture[key]

        await sleep(1000)

        let person = await client.personGroupPerson.create(personGroupId, {name: key})


        await client.personGroupPerson.addFaceFromUrl(personGroupId, person.personId, value);
        // await Promise.all(value.map(async (image) => {
        //     await client.personGroupPerson.addFaceFromUrl(personGroupId, person.personId, image);
        // }));
    }))
}

const WaitForPersonGroupTraining = async (personGroupId) => {
    // Wait so we do not exceed rate limits.
    console.log ("Waiting 10 seconds...");
    await sleep (10000);
    let result = await client.personGroup.getTrainingStatus(personGroupId);
    console.log("Training status: " + result.status + ".");
    if (result.status !== "succeeded") {
        await WaitForPersonGroupTraining(personGroupId);
    }
}

const DetectFaceRecognize = async (body) => {
    // Detect faces from image URL. Since only recognizing, use the recognition model 4.
    // We use detection model 3 because we are not retrieving attributes.url
    let detectedFaces = await client.face.detectWithStream(body,
        {
            detectionModel: "detection_03",
            recognitionModel: "recognition_04"
        });     
    return detectedFaces;
}




 // const targetImages = await axios.get(`https://${process.env.STORAGE_ACCOUNT}.blob.core.windows.net/${process.env.BLOB_CONTAINER}?restype=container&comp=list`, {
        //     headers: {
        //         'Ocp-Apim-Subscription-Key': process.env.KEY2
        //     }
        // })
        // res.status(200).json(targetImages.data)