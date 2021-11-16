import WebcamCapture from "./WebcamCapture";


export default function Modal({setOpenModal}) {

	return (
		<div className="h-screen w-screen bg-gray-300 fixed flex justify-center items-center">
			<div className="rounded-xl bg-white shadow-md flex flex-col p-6">
				<div className="flex justify-end">
					<button className="bg-transparent border-none text-2xl cursor-pointer"
					onClick={() => setOpenModal(false)}	>
						X
					</button>
				</div>
				<div className="inline-block text-center mt-2.5 mb-3 text-2xl">
					<h1>Who are you?</h1>
				</div>
				<div className="flex h-1/2 justify-center items-center">
					<WebcamCapture />
				</div>
				{/* <div className="flex h-1/5 justify-center items-center">
					<button className="m-2 p-2 border-none bg-red-500 text-white rounded-md text-xl cursor-pointer"
						onClick={() => setOpenModal(false)}
					>
						Cancel
					</button>
					<button className="m-2 p-2 border-none bg-blue-500 text-white rounded-md text-xl cursor-pointer">Continue</button>
				</div> */}
			</div>
		</div>
	)
}