

export default function Microphone({micFunction, activeMic}) {

    return (
        <button className="w-24 h-24 bg-blue-500 flex rounded-full 
        cursor-pointer text-white items-center justify-center"
            onClick={micFunction}
        >
            <svg
                className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
        </button>

    )
}