import { useSession, signIn, signOut } from "next-auth/react"
export default function Auth() {
    const { data: session } = useSession()  
    if (session) {
        return (      
            <div className="">        
                <button
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium
                    text-white bg-blue-500 border border-transparent rounded-md 
                    hover:bg-blue-300 focus:outline-none focus-visible:ring-2 
                    focus-visible:ring-offset-2 focus-visible:ring-blue-600"
                    onClick={() => signOut()}
                >
                    Sign out
                </button>
            </div>    
        )  
    }  
    return (    
        <>         
            <button
                className="inline-flex justify-center px-4 py-2 text-sm font-medium
                 text-white bg-blue-500 border border-transparent rounded-md 
                 hover:bg-blue-300 focus:outline-none focus-visible:ring-2 
                 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
                onClick={() => signIn()}
            >
                Sign in
            </button>
        </>  
    )
}