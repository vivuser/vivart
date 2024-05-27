"use client"

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import 'react-quill/dist/quill.snow.css';
import { useSession } from "next-auth/react";
import options from "../api/auth/[...nextauth]/options";
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
})

const modules = {
    toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
    ],
    clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
    },
}
/*
* Quill editor formats
* See https://quilljs.com/docs/formats/
*/
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]

const EditedPost = () => {
    const [editedPost, setEditedPost] = useState([]);

    const params = useParams();
    console.log(params, 'this is params')
    const id = params.blogId
    const { data: isUser } = useSession(options);
    console.log(isUser, 'isUser')
    const userId = isUser?.user.id

    const fetchPostResponse = async () => {
        try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${id}`)
    console.log(response.data[0], 'this is edited post')
        setEditedPost(response.data[0]);
        } catch (error) {
            console.error('Error fetching post')
        }
    }

    useEffect(() => {
    fetchPostResponse()
    },[id])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPost({...editedPost, [name]:value });
    }

    const handleUpdate = async () => {
        const updateResponse = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${userId}/${id}`)
    }

    return (
        <div className="max-w-4xl mx-auto m-6">
            <div className="mx-auto m-4">
            <input type="text" name="title" value={editedPost?.title} onChange={handleInputChange} className="h-10 text-2xl border-none"/>
            </div>
            <div className="flex flex-wrap m-2">
            <button className="bg-slate-300 m-1 p-2" onClick={handleUpdate} >Update</button>
            <button className="bg-slate-300 m-1 p-2" >Cancel</button>
            </div>



            <ReactQuill
                    className='max-w-6xl mb-6'
                    modules={modules}
                    theme="snow"
                    value={editedPost?.content}
                    onChange={editedPost?.content}
                    placeholder='Content here...'
                    style={{ height: '400px'}}
                />
        </div>
    )
}

export default EditedPost;