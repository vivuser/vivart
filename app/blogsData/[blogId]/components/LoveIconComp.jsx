"use client"
import React, { startTransition, useState } from 'react';
import LoveIcon from './LoveIcon';
import { updateSingleBlogLike } from '@/app/redux/apis/singleBlogApi';
import { useSession } from 'next-auth/react';
import options from '@/app/api/auth/[...nextauth]/options';
import LoginModal from '@/app/components/LoginModal';

const LoveIconComp = ({ userId, blogId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes); // Use useState for managing likes
  const [showModal, setShowModal] = useState(false)
  const user = useSession(options)
  console.log(user, 'USSER')

  console.log(userId, blogId, '7777777777777777777')

  const handleIncrementLike = async() => {
      setLikes((prevLikes) => prevLikes + 1);
      await updateSingleBlogLike(blogId, userId)
    };

  

  return (
    <div className="flex flex-wrap cursor-pointer">
      <div onClick= {() => user?.data  ? handleIncrementLike() : setShowModal(true)}>
        <LoveIcon />
      </div>
      <p>{likes}</p> 
      {showModal && <LoginModal/>}
    </div>
  );
};

export default LoveIconComp;
