'use client'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookIcon from '@mui/icons-material/Book';
import { useState } from 'react';

const BookIconComp =()=> {
    const [savePost, setSavePost] = useState(false)

    const handleSavePosts = () => {
        setSavePost(!savePost)
    }

    return (
        <>
        { savePost ?
        <BookmarkAddIcon onClick={() => handleSavePosts()} />
                    :
        <BookIcon  onClick={() => handleSavePosts()} className='text-slate-300 hover:text-slate-500 cursor-pointer'/>
        }
        </>)
    }

    export default BookIconComp;