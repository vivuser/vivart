'use client'

import { useDispatch} from "react-redux";
import { logout } from "@/app/redux/slices/authSlice";


const Logout = () => {
const dispatch = useDispatch()

    const handleLogout = () => {
        console.log('function dispatching')
        console.log(dispatch(logout()))   
    }

    return (
        <button onClick={() => handleLogout()} className="underline underline-offset-2">Logout</button>
    )
}

export default Logout;