'use client'

import { useEffect, useState } from "react";
import getAllBlogs from "../redux/apis/allBlogsApi";

const Modal = () => {
    const [tags, setTags] =  useState([])

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
        // Handle tag selection logic here
        console.log("Selected tag:", tag);
    };
   
    
    return (
        <div className="bg-slate-100 flex justify-center items-center">
            <div className=" overflow-y-auto p-6 bg-white rounded-lg shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                    {tags.map((tag) => (
                        <div
                            key={tag.id}
                            className="cursor-pointer bg-gray-100 rounded-md p-3 hover:bg-gray-200 transition duration-300"
                            onClick={() => handleTagClick(tag)}
                        >
                            {tag.tags}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Modal;