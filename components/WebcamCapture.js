import axios from "axios";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { b64toBlob, b64toByteArray, dataURLtoBlob, dataUrlToFile } from "../utils/utils";

// capture photo -> convert base64 string to jpg image file -> send image file to azure blob storage

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  
export default function WebcamCapture() {
    const webcamRef = useRef(null);
    // const [imageSrc, setImageSrc] = useState(null)
    const [file, setFile] = useState(null)

    const [azureImages, setAzureImages] = useState([])
    const capture = useCallback(
        async () => {
        // setImageSrc(webcamRef.current.getScreenshot())
        // console.log(webcamRef.current.getScreenshot())
        // const blob = await fetch(webcamRef.current.getScreenshot()).then((res) => res.blob());
        // const blob = await dataUrlToFile(webcamRef.current.getScreenshot())
        const fullString = webcamRef.current.getScreenshot()

       
        const dataString = fullString.split(',')[1]
        console.log(dataString)

        const getImages = await axios.get('/api/uploadPicture')

        const images = getImages.data

        

        const res = await axios.post('/api/face', {
            capture: dataString,
            images: images
        })
        console.log(res)
        
        // const x = await dataUrlToFile(dataString)
        
        
        // const a = document.createElement('a')
        // a.href = dataString
        // a.download = new Date().toUTCString()
        // a.click()


        // const res = await axios.post('/api/uploadPicture', {
        //     dataString
        // })
        
        },
        [webcamRef]
    );

    const upload = async () => {
        const formData = new FormData()
        formData.append('file', file)
        console.log(formData.get('file'))
        const res = await axios.post('/api/uploadPicture', formData)
        console.log(res)
    }

    const list = async () => {
        const res = await axios.get('/api/uploadPicture')
        console.log(res.data)
        setAzureImages(res.data)
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            />
            <button className="m-2 p-2 border-none bg-blue-500 text-white rounded-md text-xl cursor-pointer" onClick={capture}>Capture photo</button>
            <input type='file' onChange={ev => setFile(ev.target.files[0])}></input>
            <button className="m-2 p-2 border-none bg-blue-500 text-white rounded-md text-xl cursor-pointer" onClick={upload}>upload photo</button>
            <button className="m-2 p-2 border-none bg-blue-500 text-white rounded-md text-xl cursor-pointer" onClick={list}>List</button>
            {azureImages.length > 0 && <img src={`${azureImages[0].name}`} alt="image" />}
        </div>
    );
};