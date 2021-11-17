import useDarkMode from "../hook/useDarkMode"
import Link from 'next/link'


export default function Nav() {

    const [colorTheme, setTheme] = useDarkMode()
    return (
        <div className="fixed top-0 w-full p-5 flex justify-end gap-6 border-b-2 dark:border-white border-blue-500 z-20">
            <Link href='/'>
                <a className="text-2xl text-gray-600 dark:text-white hover:opacity-50">Language</a>
            </Link>
            <Link href='/Face'>
                <a className="text-2xl text-gray-600 dark:text-white hover:opacity-50">Face</a>
            </Link>
            <span onClick={() => setTheme(colorTheme)} className="w-10 h-10 bg-blue-500 flex rounded-full 
            cursor-pointer text-white items-center justify-center shadow-xl">
                {colorTheme === 'light' ? 
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                    :
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                }
            </span>
        </div>
    )
}