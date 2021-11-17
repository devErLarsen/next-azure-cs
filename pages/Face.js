import Nav from "../components/Nav";
import AddPhoto from '../components/AddPhoto'
import { useState } from "react";


export default function Face() {

    const [resultImage, setResultImage] = useState(null)
    const [loading, setLoading] = useState(false)
        

    return (
        <div className="bg-white dark:bg-gray-800 h-screen 
        flex justify-center items-center flex-col gap-7">
            <Nav />
            {loading ? 
                <div
                    className="bg-gray-600 dark:bg-white flex space-x-2 p-6 rounded-full 
                    justify-center items-center animate-ping mt-10"
                /> 
            : 
                [resultImage ? 
                    <div className="flex flex-col gap-3">
                        <img src={resultImage} alt="recognized face" />
                        <button 
                            className="p-2 border-none bg-blue-500 text-white rounded-md text-xl cursor-pointer"
                            onClick={() => setResultImage(null)}
                        >
                            Clear Result
                        </button>
                    </div>
                    :
                    <div className="flex flex-row gap-3">
                        <AddPhoto setLoading={setLoading} setResultImage={setResultImage} storage={true} text="Add Reference Photo"/>
                        <AddPhoto setLoading={setLoading} setResultImage={setResultImage} storage={false} text="Photo to Face API"/>
                    </div>
                ]
            }
        </div>
    )
}