"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import options from '../api/auth/[...nextauth]/options'
import { kMaxLength } from 'buffer'
import Link from 'next/link'

const MyPosts = () => {
  const [showUserPosts, setShowUserPosts] = useState(false);
  const { data: session, status }  = useSession(options);
  if (status !== "loading") {
    console.log(session, '8888')
  }

  const handleShowPosts = () => {
    setShowUserPosts(!showUserPosts);
  }

  const truncateContent = (content, maxLength) => {
    return content.length > maxLength ? content.slice(0, maxLength - 3) + '...' : content;
  }

  return (<>
      <button className='bg-gray-200 p-1'
      onClick={handleShowPosts}>
     My posts
      </button>
      {showUserPosts && ( 
      <>
      <div className="flex flex-col">
        {session?.user?.userposts.map((post) => (
          <div key={post._id} className='bg-slate-100 p-2 m-2'>
          <Link href={`/blogsData/${post._id}`}>
            <h2 className='font-medium text-2xl'>{post.title}</h2>
            <p>{truncateContent(post.content, 100)}</p>
            </Link>
          </div>
        ))}
        {showUserPosts.length > 0 ?
          <button className='bg-gray-200 p-2 mx-auto'>View All</button>
          :
          <div className='flex justify-center'>
          <p className='text-slate-600'>Write your <span className='underline underline-offset-2' ><Link href={'/write'}>first post</Link></span></p>
          </div>
        }
      </div>
      </> 
      )}
      </>)
}

export default MyPosts;
