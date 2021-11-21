import axios from "axios"



export default async function handler(req, res) {
    // const kp = await keyPhraseExtraction(req.body.text)
    // res.status(200).json(kp)
    const { text } = req.body

    const data = {
        documents: [
            {
                language: 'en',
                id: 1,
                text
            }
        ]
    }

    try {
        const azureResponse = await axios.post(
            `${process.env.ENDPOINT}text/analytics/v3.1/keyPhrases`,
            data, 
            {
                headers: {
                    'content-type': 'application/json',
                    'Ocp-Apim-Subscription-Key': process.env.KEY2
                }
            }
        )
    
        res.status(200).json(azureResponse.data.documents[0].keyPhrases)
    } catch (error) {
        res.status(error.response.status).json(error.response.data)
    }
}