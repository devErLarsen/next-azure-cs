

export default function Microphone({micFunction, activeMic}) {

    return (
        <>
        {!activeMic && <button className="lg:fixed flex flex-shrink-0 bottom-5 right-5 border-2 border-blue-100 w-24 h-24 bg-blue-500 rounded-full 
        cursor-pointer text-white items-center justify-center filter drop-shadow-2xl border-opacity-25
        transform hover:-translate-y-1 hover:scale-110 hover:bg-blue-400 transition duration-500 ease-in-out"
            onClick={micFunction}
        >
            <svg
                className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
        </button>}
        </>

    )
}