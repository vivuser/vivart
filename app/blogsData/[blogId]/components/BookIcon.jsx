'use client'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookIcon from '@mui/icons-material/Book';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import options from '@/app/api/auth/[...nextauth]/options';
import { useParams } from 'next/navigation';

const BookIconComp =()=> {
    const [savePost, setSavePost] = useState(false)
    const { data: isUser } = useSession(options);
    console.log(isUser, 'hainn')
    const blogParams = useParams();
    const postId = blogParams.blogId;

    const handleSavePosts = async () => {
        setSavePost(!savePost)  

        try {

        if (!isUser) return;
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/savedPosts/${isUser.user.id}/${postId}`, {
            method: 'PUT',
            headers: {  
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: isUser.user.id, postId: postId }),
        });
        } catch (error) {
            console.error('Error while updating, please try later', error);
        }
    }

    if (!isUser) {
        return null;
    }

    return (
        <>
        {savePost?
        <BookmarkAddIcon onClick={() => handleSavePosts()} />
                    :
        <BookIcon  onClick={() => handleSavePosts()} className='text-slate-300 hover:text-slate-500 cursor-pointer'/>
        }
        </>)
    }

    export default BookIconComp;