import { keyPhraseExtraction } from "../../utils/textAnalytics"


export default async function handler(req, res) {
    const kp = await keyPhraseExtraction(req.body.text)
    res.status(200).json(kp)
}