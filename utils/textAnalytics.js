"use strict";

import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics"

const key = process.env.KEY2
const endpoint = process.env.ENDPOINT;
// Authenticate the client with your key and endpoint
const textAnalyticsClient = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));

// Example method for detecting the language of text
export async function languageDetection(text) {

    const languageInputArray = [
        text
    ];
    const languageResult = await textAnalyticsClient.detectLanguage(languageInputArray);

    // languageResult.forEach(document => {
    //     // console.log(`ID: ${document.id}`);
    //     console.log(`\tPrimary Language ${document.primaryLanguage.name}`)
    // });

    return languageResult[0].primaryLanguage.name
}

export async function keyPhraseExtraction(text){

    const keyPhrasesInput = [
        text,
    ];
    const keyPhraseResult = await textAnalyticsClient.extractKeyPhrases(keyPhrasesInput);
    
    return keyPhraseResult[0].keyPhrases
}


export async function sentimentAnalysis(text){

    const sentimentInput = [
        text
    ];
    const sentimentResult = await textAnalyticsClient.analyzeSentiment(sentimentInput);

    return sentimentResult[0].sentiment
}