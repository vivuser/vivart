'use client'

import getAllBlogs from "@/app/redux/apis/allBlogsApi"
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react"
import VisibleTagsLoader from "./visibleTagsLoader";

export default function VisibleTagsButton () {

    const [blogsData , setBlogsData] = useState({ data: { values:[], tags:[] }})
    const [ selectedTag, setSelectedTag ] = useState(null);
    const [ filteredBlogs, setFilteredBlogs ] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const router =useRouter()

   useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await getAllBlogs()
                setBlogsData(response)
                setFilteredBlogs(response.data.values);
            } catch(error) {
                console.error("Error fetching data: ", error)
            } finally{
                setIsLoading(false);
            }
        }
        fetchData()
   }, [])

   const visibleTags = ['All', ...blogsData.data.tags?.filter(tag => tag && tag.trim() !== '')];
   
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