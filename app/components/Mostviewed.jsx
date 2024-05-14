import Link from "next/link";
import getAllBlogs from "../redux/apis/allBlogsApi"
import { format } from "date-fns";

const Mostviewed = async () => {

    const allBlogs = await getAllBlogs()
    const topBlogs =  allBlogs?.data?.values
    const allSortedPosts =  topBlogs?.slice().sort((a,b) => b.views - a.views);
    const sortedPosts = allSortedPosts?.splice(0,6);

    console.log(topBlogs , 'top posts')
    console.log(sortedPosts , 'sorted posts')

    return (
        <div>
            <p className="text-muted-foreground text-2xl">Most viewed posts</p>
            <div className="flex flex-col md:flex-row" >
            {sortedPosts.map((blog) => {
                return (    
                    <div key={blog.id}>
                        <Link href={`blogsData/${blog._id}`}>
                        <div className="bg-gray-100 m-4 p-4">
                        <div className="flex flex-col">
                            <div className="mb-2"> 
                          <h2 className="text-lg font-semibold">{blog.title}</h2> 
                            <hr/>
                            <br/>
                            </div>
                            <span className='text-sm' 
                            dangerouslySetInnerHTML={{__html: blog.content}}>
                            </span>
                            <br/>
                            <span className='text-xs'>
                            {format(new Date(blog.createdAt),'MMMM dd yyyy')}
                            </span>
                            </div>
                        </div>
                        </Link>
                        </div>)
            } )}
            </div>
        </div>
    )

}

export default Mostviewed;