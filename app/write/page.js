// 'use client'
// import dynamic from 'next/dynamic';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import DrawIcon from '@mui/icons-material/Draw';
// import DesignServicesIcon from '@mui/icons-material/DesignServices';
// const ReactQuill = dynamic(() => import('react-quill'), {
//     ssr:false
// })
// const Write = () => {
//     const [open, setOpen ] = useState(false);
//     const [postContent, setPostContent] = useState("");
//     const [imageUrl, setImageUrl] = useState(null);
//     const [title, setTitle] = useState('')
//     const [postTags, setPostTags] = useState('')
//     const dispatch = useDispatch()

//     const handleOpenAttachment = () => {
//         setOpen((prev) => !prev);
//     }

//     const handleImageUpload = async (e) => {
//         try {
//             const file = e.target.files[0];
//             const formData = new FormData();
//             formData.append('file', file);

//             const response = await axios.post('http://localhost:3001/blogs/image', formData);
//             const uploadedImageUrl = response.data.imageUrl;
//             setImageUrl(uploadedImageUrl);
//         } catch (error) {
//             console.error('Error uploading image:', error);
//         }
//     }

//     const handleSubmit = async () => {
//         try {
//             const response = await fetch('http://localhost:3001/blogs', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                   },
//                 body: JSON.stringify({
//                     title: title, 
//                     content: postContent,
//                     tags :postTags,
//                     userId: userId,
//                     author: userData.name,
//                     imageUrl: imageUrl
//                 })
//             })
            
//             setTitle('')
//             setPostContent('')
//             setImageUrl('')

//         } catch (error) {

//         }
//     }


//     return (
//         <div className="max-w-6xl mx-auto m-10">
//             <h2 className="text-center text-3xl text-slate-700">Write <span className='text-orange-200'><DesignServicesIcon fontSize='large'/></span></h2>

//             <div className='flex flex-col'>
//             <input type="text" placeholder="Title" className='mt-10 text-3xl border-none outline-none'
//             onChange={(e) => setTitle(e.target.value)}/> 
//             <input type="text" placeholder='Give your post a tag' className='outline-none p-2 text-yellow-900'
//             onChange={(e) => setPostTags(e.target.value)}/>
//             <input type="text" placeholder='Content' className='outline-none p-2 h-80'
//             onChange={(e) => setPostContent(e.target.value)}/>
//             <button className='bg-slate-100 mx-auto p-2'>Post</button>

//             </div>
//         </div>
//     )
// }

// export default Write;