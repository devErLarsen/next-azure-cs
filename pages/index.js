import axios from 'axios'
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk'
import React, { useEffect, useState } from 'react'
import Microphone from '../components/Microphone'
import Nav from "../components/Nav"
import getToken from '../utils/getToken'
import WebcamCapture from '../components/WebcamCapture'
import Modal from '../components/Modal'
const speechsdk = require('microsoft-cognitiveservices-speech-sdk')



export default function Home() {

  const [input, setInput] = useState("")
  const [output, setOutput] = useState([]) // change to translations
  // const [english, setEnglish] = useState(false)
  const [sentiment, setSentiment] = useState("")
  const [keyPhrases, setKeyPhrases] = useState([])

  const [loading, setLoading] = useState(false)
  const [activeMic, setActiveMic] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")

  const [openModal, setOpenModal] = useState(false)

  // useEffect(async () => {
  //   console.log("HEI")
  //   const tokenRes = await getToken()
  //   if(tokenRes.authToken === null)
  //     setErrorMessage("Something went wrong when trying to fetch authorization token")
  // }, [])

  // request check if input language is English, otherwise alert user that only english is accepted.
  const checkLanguage = async () => {
    const res = await axios.post('/api/detectLanguage', {
      text: input
    })
    if (res.status === 200) {
      if (res.data === 'English')
        return true
    }
    alert("Something went wrong when detecting language")
    return false
  }

  // request translation
  const translate = async () => {
    const res = await axios.post('/api/translate', {
      text: input
    })
    setOutput(res.data[0].translations)
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
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const colorSentiment = () => {
    if(sentiment === 'positive')
      return 'text-green-600'
    else if(sentiment === 'negative')
      return 'text-red-600'
    return 'text-yellow-200'
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
    })
    setActiveMic(false)
  }

  const faceAPI = async () => {
    const res = await axios.post('/api/face')
    console.log(res)
  }

  return (
    <div className="bg-white dark:bg-gray-800 h-screen 
    flex justify-center items-center flex-col gap-7">
      <Nav />
      <div className='container mx-auto'>
        {errorMessage && 
          <p className='text-gray-600 dark:text-white'>
          {errorMessage}
        </p>
        }
      </div>
      {/* <WebcamCapture /> */}
      {openModal && <Modal setOpenModal={setOpenModal}/>}
      <button onClick={() => setOpenModal(true)}>open</button>
      <Microphone micFunction={stt} activeMic={activeMic} />
      <textarea className="text-gray-900 dark:text-white
      bg-gray-100 dark:bg-gray-700 resize-none border-md rounded-lg
      lg:w-1/2 w-10/12 h-32 px-6 pt-2"
        placeholder="input..."
        value={input}
        onChange={ev => setInput(ev.target.value)}
      />
      <button className="bg-blue-500 hover:bg-blue-400 
      text-gray-600 dark:text-white font-bold py-2 px-4 border-b-4 
      border-blue-700 hover:border-blue-500 rounded" disabled={loading && input.length > 2}
        onClick={() => bundleRequests()}
      >
        Analyze
      </button>
      <button className="bg-blue-500 hover:bg-blue-400 
      text-gray-600 dark:text-white font-bold py-2 px-4 border-b-4 
      border-blue-700 hover:border-blue-500 rounded"
        onClick={() => faceAPI()}
      >
        Test FaceAPI
      </button>
      {/* <button onClick={() => testknapp()}>testknapp</button>   */}
      {!loading ?
        <div>
          {sentiment && <h2 className='text-2xl text-gray-900 dark:text-white mb-2'>
            sentiment is <span className={colorSentiment()}>{sentiment}</span>
          </h2>}
          {keyPhrases.length > 0 &&
            <div>
              <h2 className='text-2xl text-gray-900 dark:text-white mb-2'>Key phrases are:</h2>
              <p className='text-gray-900 dark:text-white'>{keyPhrases.join(' | ')}</p>
            </div>
          }
          {output.length > 0 &&
            <div>
              <h2 className='text-2xl text-gray-900 dark:text-white mb-2'>Translations</h2>
              {output.map((l, i) => (
                <p className='text-gray-900 dark:text-white' key={i}>{l.to}: {l.text}</p>
              ))}
            </div>
          }
        </div>
        :
        <div
          className="bg-gray-600 dark:bg-white flex space-x-2 p-6 rounded-full 
          justify-center items-center animate-ping mt-10"
        />
      }


    </div>
  )
}
