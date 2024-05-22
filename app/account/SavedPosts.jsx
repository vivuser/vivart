"use client"
import { useSession } from "next-auth/react"
import options from "../api/auth/[...nextauth]/options"
import { useEffect, useState } from "react"
import axios from "axios"

const SavedPost = () => {

    const { data: isUser } = useSession(options)
    const [showSavedBlogs, setShowSavedBlogs] =  useState([])
    const [showResponse, setShowResponse] = useState(false)

    const fetchSavedPosts = async () => {
        try {
            setShowResponse(true)
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/user/${isUser.user.id}`)
            const savedPostResponse = response?.data?.data?.userSavedPosts
            setShowSavedBlogs(savedPostResponse)
        } catch (error) {
            console.error("Error fetching saved posts:", error)
        }
    }

    useEffect(() => {
        if (isUser) {
            fetchSavedPosts()
        }
    }, [isUser])

    console.log(showSavedBlogs, 'j')


    return (
        <>
        <button className='bg-gray-200 p-1 m-2' onClick={fetchSavedPosts}>Saved posts</button>

        {setShowResponse && showSavedBlogs?.map((post) => {
            return (
                <div key={post._id}>
                    {post.title}
                </div>
            )
        })}
        </>
    )
}

export default SavedPost;