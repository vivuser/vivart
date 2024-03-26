import Link from "next/link";

const MainNavbar = () => {


    return (
        <div className="m-4">
            <ul className="flex flex-wrap mx-10">
                <li className="mx-10"><Link href="/client">Client Login</Link></li>
                <li className="mx-10"><Link href="/server">Server Login</Link></li>
                <li className="mx-10"><Link href="/contact">Contact</Link></li>
                <li className="mx-10"><Link href="/blogsData">All blogs page</Link></li>
            </ul>
        </div>
    )
}

export default MainNavbar;