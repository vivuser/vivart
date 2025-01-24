import getAllBlogs from '@/app/redux/apis/allBlogsApi'
import React from 'react'

const Author =  async ({ params }) => {
  const {id} = params

  const blogsData = await getAllBlogs()
  const mapBlogData = blogsData.data.values
  console.log(mapBlogData, 'bddd')

  const filteredBlogs = mapBlogData.filter(blog => blog.userId === id)

  return (
    <div className='max-w-6xl flex flex-col justify-center items-center m-1'>
        {filteredBlogs.map(blog => (
            <div className='bg-slate-100 shadow-sm p-2 m-2'>
                <h3 className='m-2 text-xl'>{blog.title}</h3>
                <p>{blog.content}</p>
            </div>
        ))

        }
    </div>
    
  )
}

export default Author