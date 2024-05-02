'use client'

import getAllBlogs from "@/app/redux/apis/allBlogsApi"
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react"
import VisibleTagsLoader from "./visibleTagsLoader";
import getBlogsByUser from "@/app/redux/apis/userBlogsApi";
import { useSession } from "next-auth/react";
import options from "@/app/api/auth/[...nextauth]/options";

export default function VisibleTagsButton () {

    const [blogsData , setBlogsData] = useState({ data: { values:[], tags:[] }})
    const [ selectedTag, setSelectedTag ] = useState(null);
    const [ filteredBlogs, setFilteredBlogs ] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const router =useRouter()
    const user = useSession(options)
    const userId = user?.data?.user?.id
    console.log(userId, 'th')

   useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                let response;
                console.log(userId, 'userO')
                if (userId) { 
                    response = await getBlogsByUser(userId)
                    console.log(response, 'user res blogs....')
                }
                else {
                    response = await getAllBlogs() 
                    console.log(response, 'all res blogs....')
                }
                setBlogsData(response)
                setFilteredBlogs(response.data.values);
            } catch(error) {
                console.error("Error fetching data: ", error)
            } finally{
                setIsLoading(false);
            }
        }
        fetchData()
   }, [userId])

   const visibleTags = ['All', ...(blogsData?.data?.tags || []).filter(tag => tag && tag.trim() !== '')];
   
   const handleFilterBlogs = (tag) => {
    let filtered;
    if (tag === 'All') {
        filtered = blogsData.data.values;
    }
    else {
        filtered = blogsData.data.values.filter(blog => blog?.tags?.includes(tag));
    }
    
    setFilteredBlogs(filtered)
    setSelectedTag(tag);
    const url  = new URL(window.location.href);
    console.log(url, 'kk')
    url.searchParams.set("tag",tag);
    router.push(url.href)
   }

   console.log(filteredBlogs, 'client side filtered blogs')

    return (
    
      <div className="flex flex-wrap gap-1 mt-2">
            {isLoading ? 
            <Suspense fallback={<VisibleTagsLoader />}>
               <VisibleTagsLoader />
            </Suspense>
            : (<>
                { visibleTags?.map((tag, index) => (
                    <div key={index} className={`${selectedTag === tag ? 'bg-slate-300' : 'bg-gray-100'} px-2 py-1 text-xs`}>
                        <button onClick={() => handleFilterBlogs(tag)}>{tag}</button>
                    </div>
                ))} 
                </>
            )}
            </div>  
    )

}