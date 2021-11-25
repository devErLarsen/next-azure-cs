import axios from "axios";



export default async (req, res) => {
    // const s = await sentimentAnalysis(req.body.text)
    // res.status(200).json(s)

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
            `${process.env.ENDPOINT}/text/analytics/v3.1/sentiment`,
            data, 
            {
                headers: {
                    'content-type': 'application/json',
                    'Ocp-Apim-Subscription-Key': process.env.KEY
                }
            }
        )
    
        res.status(200).json(azureResponse.data.documents[0].sentiment)
    } catch (error) {
        console.log(error)
        res.status(error.response.status).json(error.response.data)
    }
}