    'use client'
    import dynamic from 'next/dynamic';
    import axios from 'axios';
    import { useState } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import DrawIcon from '@mui/icons-material/Draw';
    import ControlPointIcon from '@mui/icons-material/ControlPoint';
    import DesignServicesIcon from '@mui/icons-material/DesignServices';
    import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
    // import ReactQuill from 'react-quill';
    import 'react-quill/dist/quill.snow.css';
    import { useSession } from 'next-auth/react';
    import options from '../api/auth/[...nextauth]/options';
import { openSnackbar } from '../redux/slices/commonSlice';
import { useRouter } from 'next/navigation';

    const ReactQuill = dynamic(() => import('react-quill'), {
        ssr: false
    })

    const Write = () => {
        const [open, setOpen ] = useState(false);
        const [postContent, setPostContent] = useState("");
        const [imageUrl, setImageUrl] = useState(null);
        const [title, setTitle] = useState('')
        const [postTags, setPostTags] = useState('')
        const [isLoading, setIsLoading] = useState(false);
        const dispatch = useDispatch()
        const userData = useSelector((state) => state.auth);
        console.log(userData, 'userData')
        const { data } = useSession(options);
        console.log(data, ' name..')
        const author = data?.user?.name
        const authorId = data?.user?.id
        const router = useRouter();

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

        const handleOpenAttachment = () => {
            setOpen((prev) => !prev);
        }

        const handleImageUpload = async (e) => {
            try {
                const file = e.target.files[0];
                const formData = new FormData();    
                formData.append('file', file);

                const response = await axios.post('blogs/image', formData);
                const uploadedImageUrl = response.data.imageUrl;
                setImageUrl(uploadedImageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        const handleSubmit = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/userposts/${authorId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: title, 
                        content: postContent,
                        tags :postTags,
                        userId: authorId,
                        author: author,
                        imageUrl: imageUrl
                    })
                })

                if (response.ok) {
                    dispatch(
                        openSnackbar({
                            content: 'Post created successfuly',
                            color: 'success'
                        })
                    )
                    setTitle("");
                    setPostTags("")
                    setPostContent("");
                    router.push('/account')
                }

            } catch (error) {
                console.error('Error submitting the post', error)
            }
        }

        return (
            <div className="max-w-6xl mx-auto m-10">
                <div className='flex flex-wrap justify-between'>
                <h2 className="text-center text-3xl text-slate-700">Write <span className='text-orange-200'><DesignServicesIcon fontSize='large'/></span></h2>
                <button className={`${isLoading ? 'bg-slate-100' : 'bg-slate-200'} mx-auto p-2`} onClick={handleSubmit}>Publish</button>
                </div>
                <div className='flex flex-col'>
    
                <input type="text" placeholder="Title" value={title} className='mt-10 text-3xl border-none outline-none'
                onChange={(e) => setTitle(e.target.value)}/> 
                <input type="text" placeholder='Give your post a tag' value={postTags} className='outline-none p-2 text-yellow-900'
                onChange={(e) => setPostTags(e.target.value)}/>

                <div className='flex items-start mt-4'>
                <button className='float-left' onClick={handleOpenAttachment}><ControlPointIcon/></button>
                { open && (
                    <div className='outline mx-4 shadow-md border text-slate-500'>
                        <label className='m-2 p-1 hover:bg-white rounded-md'>
                            <input type='file' accept='image/*' onChange={handleImageUpload} style={{ display: 'none' }}/>
                            <AddPhotoAlternateIcon/>
                        </label>
                    </div>)
                }
            </div>
            {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-2 max-w-full h-auto" height={100} width={100}/>}

                {/* <input type="text" placeholder='Content' className='outline-none p-2 h-80'
                onChange={(e) => setPostContent(e.target.value)}/> */}

                <ReactQuill
                    className='max-w-6xl'
                    modules={modules}
                    theme="snow"
                    value={postContent}
                    onChange={setPostContent}
                    placeholder='Content here...'
                    style={{ height: '400px'}}
                />
                </div>
            </div>
        )
    }

    export default Write;