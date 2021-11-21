import { useSession } from "next-auth/react";


export default function User() {
    const { data: session } = useSession() 


    if(session) {
        return (
            <div className="flex flex-row gap-3">
                <img className="h-10 w-10 rounded-full ring-2 ring-white" src={session.user.image} alt=''></img>
                <p className='text-2xl text-gray-800 dark:text-white'>{session.user.name}</p>
            </div>
        )
        
        
    }

    return (
        <></>
    )
}