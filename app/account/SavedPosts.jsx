"use client"
import { useSession } from "next-auth/react"
import options from "../api/auth/[...nextauth]/options"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { format } from "date-fns"

const SavedPost = () => {

    const { data: isUser } = useSession(options)
    const [showSavedBlogs, setShowSavedBlogs] =  useState([])
    const [showResponse, setShowResponse] = useState(false)

    const fetchSavedPosts = async () => {
        try {
            setShowResponse(!showResponse)
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/user/${isUser.user.id}`)
            const savedPostResponse = response?.data?.data?.userSavedPosts
            setShowSavedBlogs(savedPostResponse)
        } catch (error) {
            console.error("Error fetching saved posts:", error)
        }
    }

    const truncateContent = (content, maxLength) => {
        return content.length > maxLength ? content.slice(0, maxLength - 3) + '...' : content;
      }

    return (
        <>
        <button className='bg-gray-200 p-1 m-2 text-slate-800' onClick={fetchSavedPosts}>Saved posts</button>

        <div className="max-w-3xl mx-auto  flex flex-col md:grid grid-cols-2">
          {showResponse && showSavedBlogs.map((post) => (
            <div key={post._id} className='bg-slate-100 p-3 m-3'>
            <Link href={`/blogsData/${post._id}`}>
              <h2 className='font-medium text-lg'>{post.title}</h2>
              <hr/> 
              <span className='text-sm mt-1' 
              dangerouslySetInnerHTML={{__html: truncateContent(post.content,100)}}>
              </span>
              <br/>
              <span className='text-xs'>
              {format(new Date(post.createdAt),'MMMM dd yyyy')}
              </span>
              </Link>
            </div>))
            }
            </div>
        </>
    )
}

export default SavedPost;