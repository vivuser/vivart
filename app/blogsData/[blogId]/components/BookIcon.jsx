'use client'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookIcon from '@mui/icons-material/Book';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import options from '@/app/api/auth/[...nextauth]/options';

const BookIconComp =()=> {
    const [savePost, setSavePost] = useState(false)
    const { data: isUser } = useSession(options);
    console.log(isUser?.data, 'hainn')

    const handleSavePosts = () => {
        setSavePost(!savePost)
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