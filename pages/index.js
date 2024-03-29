import axios from 'axios'
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Microphone from '../components/Microphone'
import Nav from "../components/Nav"
import TextResultBox from '../components/TextResultBox'
import getToken from '../utils/getToken'
const speechsdk = require('microsoft-cognitiveservices-speech-sdk')



export default function Home() {

  const [input, setInput] = useState("")
  const [translations, setTranslations] = useState([])
  const [sentiment, setSentiment] = useState("")
  const [keyPhrases, setKeyPhrases] = useState([])

  const [loading, setLoading] = useState(false)
  const [activeMic, setActiveMic] = useState(false)

  // request check if input language is English, otherwise alert user that only english is accepted.
  const checkLanguage = async () => {
    const res = await axios.post('/api/detectLanguage', {
      text: input
    })
    if (res.status === 200) {
      if (res.data === 'English')
        return true
    }
    return false
  }

  // request translation
  const translate = async () => {
    const res = await axios.post('/api/translate', {
      text: input
    })
    setTranslations(res.data[0].translations)
  }

  // request analytics (key phrase extraction and sentiment analysis)
  const analytics = async () => {
    const kpRes = await axios.post('/api/keyPhrase', {
      text: input
    })
    const sRes = await axios.post('/api/sentiment', {
      text: input
    })
    setKeyPhrases(kpRes.data)
    setSentiment(sRes.data)

  }

  const bundleRequests = async () => {
    setLoading(true)
    try {
      const eng = await checkLanguage()
      if (eng) {
        await translate()
        await analytics()
      } else {
        setLoading(false)
        alert("This app only supports english!")
        return
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  

  const stt = async () => {
    setActiveMic(true)
    const tokenObj = await getToken()
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region)
    speechConfig.speechRecognitionLanguage = 'en-US'

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput()
    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig)

    recognizer.recognizeOnceAsync(result => {
      let text
      if(result.reason === ResultReason.RecognizedSpeech) {
        text = result.text
      }
      setInput(text)
      setActiveMic(false)
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen">
      <Head>
          <title>Text-analytics/Translate</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />
      <div className='container mx-auto pt-32 lg:pt-56 gap-6 flex flex-col justify-center items-center'>
        <Microphone micFunction={stt} activeMic={activeMic}/>
        <textarea className="text-gray-900 dark:text-white
        bg-gray-100 dark:bg-gray-700 resize-none border-md rounded-lg
        lg:w-1/2 w-10/12 h-32 px-6 pt-2"
          placeholder="input..."
          value={input}
          onChange={ev => setInput(ev.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-400 
        text-gray-600 dark:text-white font-bold py-2 px-4 border-b-4 
        border-blue-700 hover:border-blue-500 rounded" disabled={input.length < 2}
          hidden={loading}
          onClick={() => bundleRequests()}
        >
          Analyze
        </button>
        {!loading ?
          <TextResultBox sentiment={sentiment} keyPhrases={keyPhrases} translations={translations} />
          :
          <div
            className="bg-gray-600 dark:bg-white flex p-6 rounded-full 
            justify-center items-center animate-ping mt-12"
          />
        }
      </div>
    </div>
  )
}
