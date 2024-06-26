'use client'
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const AllBlogs =  () => {
    const router = useRouter()
    const userId = useSelector(state => state?.auth?.user) 

    console.log(userId, 'userId')

    const handleRedirectUser = () => {
        console.log('running')
        router.push(`blogsData/userBlogs/${userId}`)
    }


    return (
        <>
        <button onClick={handleRedirectUser}>Blogs</button>
        </>
    )
}

export default AllBlogs;