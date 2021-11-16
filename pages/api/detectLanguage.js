import axios from "axios";
import { languageDetection } from "../../utils/textAnalytics";



// url: "https://northeurope.api.cognitive.microsoft.com/text/analytics/v3.1/languages?"
export default async function handler(req, res) {
    // try {
    //     const azureRes = await axios(`${process.env.API2}/text/analytics/v3.1/languages?`, {
    //         method: 'post',
    //         headers: {
    //             'Ocp-Apim-Subscription-Key': process.env.KEY2,
    //             // 'Ocp-Apim-Subscription-Region': process.env.LOCATION,
    //             'Content-type': 'application/json',
    //             // 'X-ClientTraceId': uuidv4().toString()
    //         },
    //         data: req.body,
    //         responseType: 'json'
    //     })
    
    //     // const {status, data} = azureRes
    //     res.status(azureRes.status).json(azureRes)
    // } catch (err) {
    //     console.log(err)
    // }

    const l = await languageDetection(req.body.text)
    console.log(l)
    res.status(200).json(l)

}