import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";
import Logout from "../components/Logout";
import MyPosts from "./MyPosts";


const Account = async () => {

    const getSessionUser = await getServerSession(options)

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-lg font-semibold m-2">Account Settings</h1>
            <MyPosts />
            <p className="m-2">My drafts </p>
            <p className="m-2">My saved posts </p>
            <p className="m-2">Logged-in user: {getSessionUser?.user?.name?.split(' ')[0] || getSessionUser?.user?.email} </p>
            <Logout/>
        </div>
    )
}

export default Account;