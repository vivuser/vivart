"use client"

import { useEffect, useState } from "react";
import CommentDrawer from "./Comments";
import getSingleBlog from "@/app/redux/apis/singleBlogApi";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import options from "@/app/api/auth/[...nextauth]/options";

const SingleBlogNav = () => {
    const [posts,setPosts] = useState([])
    
    let params = useParams()
    const router = useRouter();
    const { data: isUser } = useSession(options);
    console.log(isUser, 'this is the user')


    useEffect(() => {
            const fetchSinglePost = async () => {
                const singleBlogResponse = await getSingleBlog(params.blogId)
                setPosts(singleBlogResponse);
        };
        
        fetchSinglePost(); 
    },[params?.blogId])

    const handleTagSelect = () => {
        console.log(posts.tag, 'rr')
        router.push(`/blogsData/?tag=${posts[0].tags}`)  
    }

    const handleUserSelect = () => {
        console.log(isUser, 'iuser')
        router.push(`/blogsData/author/${isUser.user.id}`)
    }

    console

    return (
        <>
        {posts?.map((post) => (<>
        <div className="flex flex-row justify-between m-2">
        <h3 className="text-xs">Tags: 
        <span className="underline underline-offset-2 p-2 text-slate-600 cursor-pointer" onClick={() => handleTagSelect(posts?.tags)}>{post?.tags}</span></h3> 
        <h3 className="text-xs">Author: 
        <span className="underline underline-offset-2 p-2 text-slate-600 cursor-pointer">{post?.author.split(' ')[0]}</span></h3>
        <h3 className="text-xs">Date: 
        <span className="underline underline-offset-2 p-2 text-slate-600">{format(new Date(post.createdAt), 'MMMM dd, yy')}</span></h3>
        {/* <MapsUgcOutlinedComp /> */}
        <CommentDrawer />
        </div>
        </>))
        }
   </> )
}

export default SingleBlogNav;