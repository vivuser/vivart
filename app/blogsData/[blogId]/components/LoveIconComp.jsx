"use client"
import React, { startTransition, useState } from 'react';
import LoveIcon from './LoveIcon';
import { updateSingleBlogLike } from '@/app/redux/apis/singleBlogApi';
import { useSession } from 'next-auth/react';
import options from '@/app/api/auth/[...nextauth]/options';
import LoginModal from '@/app/components/LoginModal';

const LoveIconComp = ({ userId, blogId, initialLikes, alreadyLiked }) => {
  const [likes, setLikes] = useState(initialLikes); // Use useState for managing likes
  const [showModal, setShowModal] = useState(false)
  const [likePresent, setLikePresent] = useState(false);
  const user = useSession(options)
  console.log(user, 'USSER')


  const handleIncrementLike = async () => {
    console.log(userId, 'This is the user id . . .')
    const result = await updateSingleBlogLike(blogId, userId);
    console.log(result, 'RESULT123')
    if (result.success) {
      // ✅ Successfully liked
      setLikes(result.blog.likesCount); // update count
      setLikePresent(true)
    } else if (result.message === 'You have already liked this post') {
      // ⚠ Already liked, but update count anyway
      setLikes(result.count);
      console.log("User already liked this post");
    } else {
      console.error(result.message);
    }
  };
  
console.log(likes, 'LII')

  return (
    <div className="flex flex-wrap cursor-pointer">
      <div onClick= {() => user?.data  ? handleIncrementLike() : setShowModal(true)}>
        <LoveIcon color={likePresent || alreadyLiked ? 'red' : 'gray'}/>
      </div>
      <p>{likes}</p> 
      {showModal && <LoginModal/>}
    </div>
  );
};

export default LoveIconComp;
