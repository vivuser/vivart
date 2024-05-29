"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import options from "../api/auth/[...nextauth]/options";


const Sidebar = ({ isOpen, onClose }) => {

    const router = useRouter()

    const { data: isUser } = useSession(options)
    console.log(isUser, 'check is User')

    const handleOnClose = () => {
        onClose();
    }

    const handleNavigate = (route) => {
        handleOnClose();
        router.push(route);
    }

    return (
        <div className={`bg-slate-200 flex flex-col fixed z-50 w-full h-full overflow-hidden ${isOpen ? '' :'hidden'} md:hidden`}>
            <p className="m-6 underline underline-offset-2 text-lg"><button onClick={() => handleNavigate('/')} >Home</button></p>
            <hr className="mx-6 border border-slate-300"/>
            <p className="m-6 underline underline-offset-2 text-lg"><button onClick={() => handleNavigate('/blogsData')}>Blogs</button></p>
            <hr className="mx-6 border border-slate-300"/>
            {isUser ? 
            <p className="m-6 underline underline-offset-2 text-lg"><button onClick={() => handleNavigate('/account')}>{isUser.user.name.split(' ')[0]}</button></p>
                :
            <p className="m-6 underline underline-offset-2 text-lg"><button onClick={() => handleNavigate('/login')}>Login</button></p>
            }
            <hr className="mx-6 border border-slate-300"/>
            {isUser &&
            <p className="m-6 underline underline-offset-2 text-lg"><button onClick={() => handleNavigate('/write')}>Write</button></p>
            }
            <hr className="mx-6 border border-slate-300"/>
        </div>
    )
}

export default Sidebar;