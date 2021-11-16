import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'

export default function MyModal({text}) {
  let [isOpen, setIsOpen] = useState(false)
  const webcamRef = useRef(null)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const capture = useCallback(
    async () => {
    // setImageSrc(webcamRef.current.getScreenshot())
    // console.log(webcamRef.current.getScreenshot())
    // const blob = await fetch(webcamRef.current.getScreenshot()).then((res) => res.blob());
    // const blob = await dataUrlToFile(webcamRef.current.getScreenshot())
    const fullString = webcamRef.current.getScreenshot()

    

    

    
    
    
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

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {text}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add a reference photo of you to the Azure Face API
                </Dialog.Title>
                <div className="mt-2">
                    <Webcam
                        audio={false}
                        height={1920}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={1080}
                        // videoConstraints={videoConstraints}
                    />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Take photo!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
