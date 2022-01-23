import axios from "axios";

export default async function handler(req, res) {
    const { text } = req.body
    const data = {
        documents: [
            {
                id: 1,
                text
            }
        ]
    }

    try {
        const azureResponse = await axios.post(`${process.env.ENDPOINT}/text/analytics/v3.1/languages`, data, {
            headers: {
                'content-type': 'application/json',
                'Ocp-Apim-Subscription-Key': process.env.KEY
            }
        })
        res.status(200).json(azureResponse.data.documents[0].detectedLanguage.name)
    } catch (error) {
        console.log(error)
        res.status(error.response.status).json(error.response.data)
    }
}