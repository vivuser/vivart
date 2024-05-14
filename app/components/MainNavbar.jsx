import Link from "next/link";
import { getServerSession } from "next-auth/next"
import options from "../api/auth/[...nextauth]/options";
import Logout from "./Logout";
import AllBlogs from "./AllBlogs";

const MainNavbar = async () => {
    const session = await getServerSession(options)

    console.log(session, 'session on server')

   

    return (
        <div className="m-4">
            <ul className="flex flex-wrap mx-10">
                <li className="mx-10"><Link href="/">Home</Link></li>
                {/* <li className="mx-10"><Link href="/server">Server Login</Link></li> */}
                {/* <li className="mx-10"><Link href="/contact">Contact</Link></li> */}
        
            {  
            session && session?.user.topics.length > 0 ?
            <li className="mx-10"><Link href={`blogsData/userBlogs/${session.user.id}`}>Blogs</Link></li>
                       :
            <li className="mx-10"><Link href="/blogsData">Blogs</Link></li>

            }
            {   session ?
                <li className="mx-10"><Link href="/account">{session?.user?.name?.split(' ')[0] || session?.user?.email}</Link></li>
                        :
                        <>
                {/* <li className="mx-10"><Link href="/client">Login using OAuth</Link></li> */}
                <li className="mx-10"><Link href="/login">Login</Link></li>
                </>
            }
            {  session &&
                <li className="mx-10"><Link href="/write">Write</Link></li>
            }
            </ul>
        </div>
    )
}

export default MainNavbar;