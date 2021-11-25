import axios from "axios"


export default async (req, res) => {

    const location = process.env.LOCATION

    try {
        const azureRes = await axios(`https://${location}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, {
            // baseURL: process.env.API,
            // url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.KEY,
                // 'Ocp-Apim-Subscription-Region': process.env.LOCATION,
                'Content-type': 'application/x-www-form-urlencoded',
                // 'X-ClientTraceId': uuidv4().toString()
            }
        })
        res.status(200).json({token: azureRes.data, region: location})
        // console.log(JSON.stringify(azureRes.data, null, 4));
    } catch (err) {
        console.log(err)
        res.status(401).send('error authorizing')
    }
}