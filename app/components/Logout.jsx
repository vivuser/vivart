'use client'

import { useDispatch} from "react-redux";
import { logout } from "@/app/redux/slices/authSlice";
import { signOut } from "next-auth/react";
import { redirect, useRouter} from "next/navigation";
import AutohideSnackbar from "./Snackbar";
import { openSnackbar } from "../redux/slices/commonSlice";


const Logout = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await signOut({ callbackUrl:'/'})
            dispatch (
                openSnackbar({
                    content : 'Logged-out successfully',
                    color: 'success'
                })
            )
            }
            catch(error){ 
                console.error('Logout failed', error);
            };
    }



    return (<>
        <AutohideSnackbar />
        <button onClick={handleLogout} className="underline underline-offset-2 m-2 text-slate-700">Logout</button>
        </>)
}

export default Logout;