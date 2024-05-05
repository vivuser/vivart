"use client"
import React from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import options from '../api/auth/[...nextauth]/options'

const MyPosts = () => {

    const user = useSession(options);
    console.log(user, 'this is user details')

  return (
    <div>
      <button className='bg-gray-200 p-1'
      >My posts</button>
    </div>
  )
}

export default MyPosts;
