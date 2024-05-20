  "use client"
  import React, { useState } from 'react'
  import axios from 'axios'
  import { useSession } from 'next-auth/react'
  import options from '../api/auth/[...nextauth]/options'
  import { kMaxLength } from 'buffer'
  import Link from 'next/link'
import getBlogsByUser from '../redux/apis/userBlogsApi'

  const MyPosts = () => {
    const [showUserPosts, setShowUserPosts] = useState(false);
    const { data: session, status }  = useSession(options);
    if (status !== "loading") {
      console.log(session, '8888')
    }

    const userId = session?.user?.id;
  

    const handleShowPosts =async () => {
      setShowUserPosts(!showUserPosts);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/mypost/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
      console.log(response, 'user blogs')
    }

    const truncateContent = (content, maxLength) => {
      return content.length > maxLength ? content.slice(0, maxLength - 3) + '...' : content;
    }


    return (<>
        <button className='bg-gray-200 p-1 m-2'
        onClick={handleShowPosts}>
      My posts
        </button>
        {showUserPosts && ( 
        <>
        <div className="flex flex-col">
          {session?.user?.userposts.map((post) => (
            <div key={post._id} className='bg-slate-100 p-3 m-3'>
            <Link href={`/blogsData/${post._id}`}>
              <h2 className='font-medium text-2xl'>{post.title}</h2>
              <hr/>
              <span className='text-sm mt-1' 
              dangerouslySetInnerHTML={{__html: truncateContent(post.content,100)}}>
              </span>
              </Link>
            </div>
          ))}

          {session?.user?.userposts.length > 5 ?
            <button className='bg-gray-200 p-2 mx-auto'>View All</button>
            :
            session?.user?.userposts.length < 1 ? 
            <div className='flex justify-center'>
            <p className='text-slate-600'>Write your <span className='underline underline-offset-2' ><Link href={'/write'}>first post</Link></span></p>
            </div>
            : null 
        }
        </div>
        </> 
        )}
        </>)
  }

  export default MyPosts;
