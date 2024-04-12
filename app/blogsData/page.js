    import getAllBlogs from '../redux/apis/allBlogsApi'
    import Link from "next/link";
    import { format } from 'date-fns';

    export const metadata ={
        title: 'Blogs',
    }

    
    export default async function Page() {
        const blogsData = await getAllBlogs()

        const blogs = await blogsData.data.values
        const tags = await blogsData.data.tags
        const visibleTags = tags?.filter(tag => tag && tag.trim() !== '');


        const content = (
            <div className="container max-w-4xl py-6 lg:py-10 mx-auto">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
              <div className="flex-1 space-y-4">
                <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
                  Blogs
                </h1>
                <p className="text-xl text-muted-foreground">
                  A blogs website built in nextJs
                </p>
              </div>
            </div>    
            <div className="flex flex-wrap gap-1 mt-2">
                { visibleTags?.map((tag, index) => (
                    <div key={index} className="bg-gray-100 px-2 py-1 text-xs">
                        {tag}
                    </div>
                ))}
            </div>  
            <hr className="my-8" />     
            <div className='grid gap-10 sm:grid-cols-2 mx-10'>
                {blogs.map(blog => {
                    return (
                        <>
                        <article key={blog._id} className='p-2 bg-slate-50 rounded-sm border-black'>
                            <h3 className='text-lg'>
                                <Link href={`/blogsData/${blog._id}`}>
                                    <>
                                    {blog.title}
                                    <hr/>
                                    <br/>
                                    <span className='text-sm' 
                                    dangerouslySetInnerHTML={{__html: blog.content}}>
                                    </span>
                                    <br/>
                                    <span className='text-xs'>
                                    {format(new Date(blog.createdAt),'MMMM dd yyyy')}
                                    </span>
                                    </>
                                    </Link>
                            </h3>
                            <br />
                        </article>
                        </>
                    )
                })}
                        </div>
                </div>
        )
        return content;
    }   