import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";
import Logout from "../components/Logout";
import MyPosts from "./MyPosts";
import SavedPost from "./SavedPosts";


const Account = async () => {

    const getSessionUser = await getServerSession(options)

    return (
        <div className="flex flex-col max-w-xl mx-auto">
            <h1 className="text-lg font-semibold m-2">Account Settings</h1>
            <p className="m-2"><span className="underline underline-offset-2 text-slate-700">Logged-in user:</span> {getSessionUser?.user?.name?.split(' ')[0] || getSessionUser?.user?.email} </p>
            <MyPosts />
            <SavedPost />
            <Logout/>
        </div>
    )
}

export default Account;