'use client'

import getAllBlogs from "@/app/redux/apis/allBlogsApi"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function VisibleTagsButton () {

    const [blogsData , setBlogsData] = useState({ data: { values:[], tags:[] }})
    const [ selectedTag, setSelectedTag ] = useState(null);
    const [ filteredBlogs, setFilteredBlogs ] = useState([]); 
    const router =useRouter()

   useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllBlogs()
                setBlogsData(response)
                setFilteredBlogs(response.data.values);
            } catch(error) {
                console.error("Error fetching data: ", error)
            }
        }
        fetchData()
   }, [])

   const visibleTags = blogsData.data.tags?.filter(tag => tag && tag.trim() !== '');
   
   const handleFilterBlogs = (tag) => {
    const filtered = blogsData.data.values.filter(blog => blog.tags.includes(tag));
    setFilteredBlogs(filtered)
    setSelectedTag(tag);
    const url  = new URL(window.location.href);
    console.log(url, 'kk')
    url.searchParams.set("tag",tag);
    window.history.pushState({ path: url.href }, "", url.href); 
    router.push(url.href)
   }

   console.log(filteredBlogs, 'client side filtered blogs')

    return (
      <div className="flex flex-wrap gap-1 mt-2">
                { visibleTags?.map((tag, index) => (
                    <div key={index} className="bg-gray-100 px-2 py-1 text-xs">
                        <button onClick={() => handleFilterBlogs(tag)}>{tag}</button>
                    </div>
                ))}
            </div>  
    )

}