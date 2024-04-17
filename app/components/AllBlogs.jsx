'use client'
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const AllBlogs =  () => {
    const router = useRouter()
    const userId = useSelector(state => state?.auth?.user) 

    const handleRedirectUser = () => {
        router.push(`blogsData/user/${userId}`)
    }


    return (
        <>
        <button onClick={handleRedirectUser}>Blogs</button>
        </>
    )
}

export default AllBlogs;