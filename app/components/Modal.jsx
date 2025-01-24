    'use client'

    import { useEffect, useState } from "react";
    import getAllBlogs from "../redux/apis/allBlogsApi";
    import { redirect } from "next/dist/server/api-utils";
    import { useRouter } from "next/navigation";
    import axios from "axios";
import { useSelector } from "react-redux";
import { signIn } from "next-auth/react";

    const Modal = () => {
        const [tags, setTags] =  useState([])
        const router = useRouter()
        const [selectedTags, setSelectedTags] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const userId = useSelector((state) => state.auth?.user?.userId)
        const email = useSelector((state) => state.auth?.user?.user?.email)
        const password = useSelector((state) => state.auth?.user.user?.confirmPassword)

        console.log(email, password, 'This is email and password')

        console.log(userId, 'getting user Id from redux')

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const modalData = await getAllBlogs();
                    setTags(modalData.data.values)
                    const filteredData = tags?.filter(tags && tags.trim() !== '')
                    const limitedData = filteredData.slice(0,18)
                    console.log(limitedData, 'length check')
                    setTags(limitedData);
                } catch (error) {
                    console.error("Error fetching modal data:", error);
                }
            };

            fetchData();
        }, []);

        const handleTagClick = (tag) => {
            const index = selectedTags.indexOf(tag.tags);
            if (index !== -1) {
                setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag.tags));
            } else {
                setSelectedTags([...selectedTags, tag.tags]);
            }

        };

        const handleSignIn = async () => {
            console.log(email, 'this is email')
            console.log(password, 'this is password')
            await signIn('credentials', {
                email,
                password,
                redirect: false
            });
        }
    

        const handleUserSelections = async () => {
            setIsLoading(true);
        try {

            const requestData = {
                selectedTopics: selectedTags
            }
                
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/topics/${userId}`, requestData )

            if (response.status === 200) {
                console.log('Inside checjking.....')
                handleSignIn()
            }

            console.log('also signed in')
            setIsLoading(false);
            router.push(`/blogsData/userBlogs/${userId}`)
            router.refresh()
            
        } catch(error) {
                console.error("Error sending selected topics: ", error);
        }
        }

        const handleSkip = () => {
            handleSignIn();
            router.push('/blogsData')
            router.refresh()
        }

        
        return (
            <div className="flex justify-center items-center">
                <div className=" overflow-y-auto p-6 bg-white rounded-lg shadow-xl">
                    <h2 className="text-lg underline underline-offset-2 text-slate-800 text-muted-foreground mb-2">Choose your preferences</h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-6">
                        {tags.map((tag) => (
                            <div key={tag.id}>
                            <input 
                                key={tag.id}
                                type="checkbox"
                                className="mr-2"
                                onChange={() => handleTagClick(tag)}
                            />
                            <div
                                key={tag.id}
                                className="cursor-pointer bg-gray-100 text-slate-800 rounded-md p-3 hover:bg-gray-200 transition duration-300"
                                onClick={() => handleTagClick(tag)}
                            >
                                {tag.tags}
                            </div>
                            </div>
                        ))}
                        <span className="underline underline-offset-4 text-slate-500 cursor-pointer" onClick={handleSkip}>skip</span>
                        <span className={`underline underline-offset-4 ${isLoading ? 'text-slate-300' : 'text-slate-500'} cursor-pointer`} onClick={handleUserSelections}>next</span>
                    </div>
                </div>
            </div>
        );
    }

    export default Modal;