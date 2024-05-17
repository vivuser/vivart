'use client'

import { useDispatch} from "react-redux";
import { logout } from "@/app/redux/slices/authSlice";
import { signOut } from "next-auth/react";
import { redirect, useRouter} from "next/navigation";


const Logout = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut('github', {redirect: false})
            console.log('signedOut,,,,..')
            console.log('pushing,,,,..')
                router.push('/');
            }
            catch(error){ 
                console.error('Logout failed', error);
            };
    }

    return (
        <button onClick={handleLogout} className="underline underline-offset-2 m-2">Logout</button>
    )
}

export default Logout;