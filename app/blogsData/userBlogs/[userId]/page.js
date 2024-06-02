import Link from "next/link";
import { format } from 'date-fns';
import getBlogsByUser from '@/app/redux/apis/userBlogsApi';
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import Search from "@/app/components/Search";
import VisibleTagsButton from "../../[blogId]/components/VisibleTagsButton";

export const metadata ={
    title: 'Blogs',
}


export default async function Page(searchParams) {

    console.log(searchParams, ' searcg')
      const tag = searchParams.searchParams.tag;
      let query = searchParams.searchParams.query;
      const userId = searchParams?.params?.userId

    const blogsData = await getBlogsByUser(userId)
    const blogs = await blogsData.data.values

    let filteredBlogs = blogs;


    const tags = await blogs
    console.log(tags, 'tagss')

    if (tag?.length > 0) { 
      console.log(tag, 'meher tag')
      query = "";
      console.log(query, 'setting query')
      if (tag === 'All'){
          filteredBlogs = blogs;
      }
      else {
      filteredBlogs = blogs?.filter(blog => {
          const blogTags = blog.tags || [];
          return blogTags.includes(tag); 
      });
  }
  }

  if (query) {
    console.log(query, ' This is query searched for')
      filteredBlogs = blogs?.filter(blog => {
         return blog.title.toLowerCase().includes(query.toLowerCase());
      })
  }


    const truncateContent = (content, maxLength) => {
        return content.length > maxLength ? content.slice(0, maxLength - 3) + '...' : content;
      }


    const content = (
        <div className="container max-w-4xl py-6 lg:py-10 mx-auto">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4 mx-auto">
            <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
              Blogs
            </h1>
            <p className="text-xl text-muted-foreground">
              A blogs website built in nextJs
            </p>
          <Search />
          </div>
        </div>    
         <div className="flex flex-wrap gap-1 mt-2">
            <VisibleTagsButton />
        </div> 
        <hr className="my-8" />     
        <div className='grid gap-10 sm:grid-cols-2 mx-10'>
            {filteredBlogs?.map(blog => {
                return (
                    <>
                    <article key={blog._id} className='p-2 bg-slate-50 rounded-sm border-black'>
                        <h3 className='text-lg'>
                            <Link href={`/blogsData/${blog._id}`}>
                                <>
                                {blog.title}
                                <hr/>
                                <br/>
                                <span className='text-sm m-2' 
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