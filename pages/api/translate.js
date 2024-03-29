import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res){

    try {
        const azureRes = await axios(`${process.env.API}/translate`, {
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.KEY,
                'Ocp-Apim-Subscription-Region': process.env.LOCATION,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: {
                'api-version': '3.0',
                'from': 'en', // by removing the 'from' parameter we can attempt to detect language (score of 1 = almost certainty)
                'to': ['de', 'fr']
            },
            data: [req.body],
            responseType: 'json'
        })
        res.status(200).json(azureRes.data)
        // console.log(JSON.stringify(azureRes.data, null, 4));
    } catch (err) {
        res.status(err.response.status).json(err.response.data)
    }
}