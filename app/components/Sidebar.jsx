"use client"
import Link from "next/link";


const Sidebar = () => {

    return (
        <div className="bg-slate-200 flex flex-col absolute z-50 w-full h-full md:hidden">
            <p className="m-6 underline underline-offset-2 text-lg"><Link href="/">Home</Link></p>
            <p className="m-6 underline underline-offset-2 text-lg"><Link href="/blogsData">Blogs</Link></p>
            <p className="m-6 underline underline-offset-2 text-lg"><Link href="/login">Login</Link></p>
        </div>
    )
}

export default Sidebar;