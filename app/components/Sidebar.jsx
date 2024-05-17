"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";


const Sidebar = ({ isOpen, onClose }) => {

    const router = useRouter()

    const handleOnClose = () => {
        onClose();
    }

    const handleNavigate = (route) => {
        handleOnClose();
        router.push(route);
    }

    return (
        <div className={`bg-slate-200 flex flex-col absolute z-50 w-full h-full ${isOpen ? '' :'hidden'} md:hidden`}>
            <p className="m-6 underline underline-offset-2 text-lg"><button onClick={() => handleNavigate('/')} >Home</button></p>
            <p className="m-6 underline underline-offset-2 text-lg"><button onClick={() => handleNavigate('/blogsData')}>Blogs</button></p>
            <p className="m-6 underline underline-offset-2 text-lg"><button onClick={() => handleNavigate('/login')}>Login</button></p>
        </div>
    )
}

export default Sidebar;