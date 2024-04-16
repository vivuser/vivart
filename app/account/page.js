import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";
import Logout from "../components/Logout";


const Account = async () => {

    const getSessionUser = await getServerSession(options)

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-lg font-semibold m-10">Account Settings</h1>
            <p className="m-10">Logged-in user: {getSessionUser?.user?.name.split(' ')[0]} </p>
            <Logout/>
        </div>
    )
}

export default Account;