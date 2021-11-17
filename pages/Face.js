import Nav from "../components/Nav";
import AddPhoto from '../components/AddPhoto'


export default function Face() {



    return (
        <div className="bg-white dark:bg-gray-800 h-screen 
        flex justify-center items-center flex-col gap-7">
            <Nav />
            <div className="flex flex-row gap-3">
                <AddPhoto text="Add Reference Photo"/>
                <AddPhoto text="Photo to Face API"/>
            </div>
        </div>
    )
}