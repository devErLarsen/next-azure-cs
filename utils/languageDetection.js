"use strict";

import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics"
const key = process.env.KEY2
const endpoint = process.env.ENDPOINT;
// Authenticate the client with your key and endpoint
const textAnalyticsClient = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));

// Example method for detecting the language of text
export default async function languageDetection(text) {

    const languageInputArray = [
        text
    ];
    const languageResult = await textAnalyticsClient.detectLanguage(languageInputArray);

    // languageResult.forEach(document => {
    //     // console.log(`ID: ${document.id}`);
    //     console.log(`\tPrimary Language ${document.primaryLanguage.name}`)
    // });

    return languageResult
}