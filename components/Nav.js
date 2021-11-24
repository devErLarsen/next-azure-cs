import Link from 'next/link'
import { Menu } from '@headlessui/react'
import { useTheme } from '../hook/useTheme'


export default function Nav() {

    const [colorTheme, setTheme] = useTheme()
    return (
        <div className="absolute top-0 h-16 w-full flex items-center justify-between p-5 border-b-2 border-blue-500">
            {/* <User /> */}
            <span onClick={() => setTheme(colorTheme)} className="w-10 h-10 bg-blue-500 flex rounded-full 
            cursor-pointer text-white items-center justify-center shadow-xl">
                {colorTheme === 'light' ? 
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                    :
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                }
            </span>
            <div className="hidden md:flex">
                <div className='flex gap-4'> {/*hidden md:flex */}
                    <Link href='/'>
                        <a className="text-2xl text-gray-600 dark:text-white hover:opacity-50">Language</a>
                    </Link>
                    <Link className='' href='/Face'>
                        <a className="text-2xl text-gray-600 dark:text-white hover:opacity-50">Face</a>
                    </Link>
                </div>
            </div>
            <div className="md:hidden flex items-center">
                <Menu as='div' className='relative inline-block'>
                    <Menu.Button className="ml-3 mt-1.5 text-blue-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </Menu.Button>
                    <Menu.Items className='absolute w-32 right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                        {({ active }) => (
                            <Link href='/'>
                                <a className={`${active ? 'bg-blue-500' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>Language</a>
                            </Link> 
                        )}
                        </Menu.Item>
                        <Menu.Item>
                        {({ active }) => (
                            <Link className='' href='/Face'>
                                <a className={`${active ? 'bg-blue-500' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>Face</a>
                            </Link>
                        )}
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
            </div>
        </div>
    )
}