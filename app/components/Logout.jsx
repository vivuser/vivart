'use client'

import { useDispatch} from "react-redux";
import { logout } from "@/app/redux/slices/authSlice";
import { signOut } from "next-auth/react";
import { redirect, useRouter} from "next/navigation";


const Logout = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut({ callbackUrl:'/'})
            }
            catch(error){ 
                console.error('Logout failed', error);
            };
    }



    return (
        <button onClick={handleLogout} className="underline underline-offset-2 m-2 text-slate-700">Logout</button>
    )
}

export default Logout;