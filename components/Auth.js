import { useSession, signIn, signOut } from "next-auth/react"
import { Menu } from '@headlessui/react'
export default function Auth() {
    const { data: session } = useSession()  
    if (session) {
        return (      
            <div className="">   
                <Menu as='div' className='relative inline-block'>
                    <Menu.Button className="ml-3">
                    {/* <div className="flex flex-row gap-3">
                        <img className="h-10 w-10 rounded-full ring-2 ring-white" src={session.user.image} alt=''></img>
                        <p className='text-2xl text-gray-800 dark:text-white'>{session.user.name}</p>
                    </div>   */}
                        <span className='flex flex-row text-2xl items-center text-gray-800 dark:text-white'>
                            {session.user.name}
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </span>
                        <p className='text-2xl text-gray-800 dark:text-white'></p>
                        
                    </Menu.Button>
                    <Menu.Items className='absolute w-32 right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                        {({ active }) => (
                            <button
                            className={`${active ? 'bg-blue-500' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            onClick={() => signOut()}
                            >
                                Sign out
                            </button>
                        )}
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
            </div>    
        )  
    }  
    return (    
        <>         
            <button
                className="inline-flex justify-center ml-3 px-4 py-2 text-sm font-medium
                 text-white bg-blue-500 border border-transparent rounded-md 
                 hover:bg-blue-300 focus:outline-none focus-visible:ring-2 
                 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
                onClick={() => signIn('azure-ad')}
            >
                Sign in
            </button>
        </>  
    )
}