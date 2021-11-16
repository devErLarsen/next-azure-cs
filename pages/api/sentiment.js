import { sentimentAnalysis } from "../../utils/textAnalytics";


export default async function handler(req, res) {
    const s = await sentimentAnalysis(req.body.text)
    res.status(200).json(s)
}