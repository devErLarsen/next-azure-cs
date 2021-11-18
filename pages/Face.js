import Nav from "../components/Nav";
import AddPhoto from '../components/AddPhoto'
import { useState } from "react";
import { Dialog } from "@headlessui/react";


export default function Face() {

    const [resultImage, setResultImage] = useState(null)
    const [loading, setLoading] = useState(false)

    // const [isOpen, setIsOpen] = useState(false)
        

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
                // [resultImage ? 
                //     <div key={'imageResult'} className="flex flex-col gap-3">
                //         <img src={resultImage} alt="recognized face" />
                //         <button 
                //             className="p-2 border-none bg-blue-500 text-white rounded-md text-xl cursor-pointer"
                //             onClick={() => setResultImage(null)}
                //         >
                //             Clear Result
                //         </button>
                //     </div>
                //     :
                //     <div key={'addphoto'} className="flex flex-row gap-3">
                //         <AddPhoto setLoading={setLoading} setResultImage={setResultImage} storage={true} text="Add Reference Photo"/>
                //         <AddPhoto setLoading={setLoading} setResultImage={setResultImage} storage={false} text="Photo to Face API"/>
                //     </div>
                // ]
                <>
                    <Dialog 
                        open={Boolean(resultImage)} onClose={() => setResultImage(null)}
                        className="fixed inset-0 z-10 overflow-y-auto"
                        as='div'
                    >
                        <div className="min-h-screen px-4 text-center">
                            <Dialog.Overlay className="fixed inset-0"/>
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-white dark:bg-gray-700 shadow-xl rounded-2xl">
                                <Dialog.Title className="mb-2 text-gray-600 dark:text-white">Result</Dialog.Title>
                                <img src={resultImage} alt="recognized face" />
                                <button 
                                    onClick={() => setResultImage(null)}
                                    className=" flex flex-start p-2 border-none bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-300"    
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </Dialog>
                    <div className="flex flex-row gap-5">
                        <AddPhoto setLoading={setLoading} setResultImage={setResultImage} storage={true} text="Add Reference Photo"/>
                        <AddPhoto setLoading={setLoading} setResultImage={setResultImage} storage={false} text="Photo to Face API"/>
                    </div>
                </>
            }
        </div>
    )
}