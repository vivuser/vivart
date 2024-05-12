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
                    console.log(filteredData)
                    setTags(filteredData);
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

        try {

            const requestData = {
                selectedTopics: selectedTags
            }
                
            const response = await axios.put(`blogs/topics/${userId}`, requestData )

            if (response.status === 200) {
                console.log('Inside checjking.....')
                handleSignIn()
            }

            console.log('also signed in')
            router.push(`/blogsData/userBlogs/${userId}`)
            
        } catch(error) {
                console.error("Error sending selected topics: ", error);
        }
        }

        
        return (
            <div className="bg-slate-100 flex justify-center items-center">
                <div className=" overflow-y-auto p-6 bg-white rounded-lg shadow-xl">
                    <h2 className="text-lg text-muted-foreground">Choose your preferences</h2>
                    <div className="grid grid-cols-2 gap-4">
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
                                className="cursor-pointer bg-gray-100 rounded-md p-3 hover:bg-gray-200 transition duration-300"
                                onClick={() => handleTagClick(tag)}
                            >
                                {tag.tags}
                            </div>
                            </div>
                        ))}
                        <span className="underline underline-offset-4 text-slate-500 cursor-pointer" onClick={()=>router.push('/blogsData')}>skip</span>
                        <span className="underline underline-offset-4 text-slate-500 cursor-pointer" onClick={handleUserSelections}>next</span>
                    </div>
                </div>
            </div>
        );
    }

    export default Modal;