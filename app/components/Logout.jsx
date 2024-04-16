'use client'

import { useDispatch} from "react-redux";
import { logout } from "@/app/redux/slices/authSlice";
import { signOut } from "next-auth/react";


const Logout = () => {

    return (
        <button onClick={() => signOut()} className="underline underline-offset-2">Logout</button>
    )
}

export default Logout;