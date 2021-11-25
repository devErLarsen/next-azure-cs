import axios from "axios";



// url: "https://northeurope.api.cognitive.microsoft.com/text/analytics/v3.1/languages?"
export default async (req, res) => {

    // const l = await languageDetection(req.body.text)
    // console.log(l)
    // res.status(200).json(l)

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