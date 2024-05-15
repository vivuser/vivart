import Link from "next/link";
import { getServerSession } from "next-auth/next"
import options from "../api/auth/[...nextauth]/options";
import Logout from "./Logout";
import AllBlogs from "./AllBlogs";
import Hamburger from "./Hamburger";

const MainNavbar = async ( {showNavbar}) => {
    const session = await getServerSession(options)

    console.log(session, 'session on server')
    console.log(showNavbar, 'showNavbar state')

    return (
        <div>
            <ul className="hidden md:flex m-2">
                <li className="mx-6"><Link href="/">Home</Link></li>
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