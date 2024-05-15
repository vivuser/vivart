    import getAllBlogs from '../redux/apis/allBlogsApi'
    import Link from "next/link";
    import { format } from 'date-fns';
import VisibleTagsButton from './[blogId]/components/VisibleTagsButton';
import Search from '../components/Search';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import VisibleTagsLoader from './[blogId]/components/visibleTagsLoader';

    export const metadata ={
        title: 'Blogs',
    }
    
    
    export default async function Page(searchParams) {
        let query = searchParams.searchParams.query
        const tag = searchParams.searchParams.tag;
        console.log(tag, '<=tag on server side..')
        console.log(query, '<=query on server side..')
        const blogsData = await getAllBlogs()

        const blogs = await blogsData.data.values

        let filteredBlogs = blogs;



        if (tag?.length > 0) { 
            query = "";
            console.log(query, 'setting query')
            if (tag === 'All'){
                filteredBlogs = blogs;
            }
            else {
            filteredBlogs = blogs.filter(blog => {
                const blogTags = blog.tags || [];
                return blogTags.includes(tag); 
            });
        }
        }

        if (query) {
            filteredBlogs = blogs.filter(blog => {
               return blog.title.toLowerCase().includes(query.toLowerCase());
            })
        }

        console.log(filteredBlogs, 'filtered blogs on server side')

        const truncateContent = (content, maxLength) => {
            return content.length > maxLength ? content.slice(0, maxLength - 3) + '...' : content;
          }

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
            <Search />
            <Suspense fallback={<VisibleTagsLoader />}>
            <VisibleTagsButton />
            </Suspense>
            <hr className="my-8" />     
            <div className='grid gap-10 sm:grid-cols-2 mx-10'>
                {filteredBlogs.map(blog => {
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
                                    dangerouslySetInnerHTML={{__html: truncateContent(blog.content, 250)}}>
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