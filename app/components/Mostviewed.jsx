import Link from "next/link";
import getAllBlogs from "../redux/apis/allBlogsApi"
import { format } from "date-fns";

const Mostviewed = async () => {

    const allBlogs = await getAllBlogs()
    const topBlogs =  allBlogs?.data?.values
    const allSortedPosts =  topBlogs?.slice().sort((a,b) => b.views - a.views);
    const sortedPosts = allSortedPosts?.splice(0,6);


    const truncateContent = (content, maxLength) => {
        return content.length > maxLength ? content.slice(0, maxLength - 3) + '...' : content;
      }

    return (
        <div>
            <p className="text-muted-foreground text-2xl">Most viewed posts</p>
            <hr className="m-4"/>
            <div className="flex flex-wrap justify-center" >
            {sortedPosts.map((blog) => {
                return (    
                    <div key={blog.id} style={{ width: '400px', height:'200px', margin:'6px'}}>
                        <Link href={`blogsData/${blog._id}`}>
                        <div className="bg-gray-100 m-2 p-2" style={{ height: '100%'}}>
                        <div className="flex flex-col">
                            <div className="mb-2"> 
                          <h2 className="text-lg font-semibold">{blog.title}</h2> 
                            <hr/>
                            <br/>
                            </div>
                            <span className='text-sm'
                            dangerouslySetInnerHTML={{__html: truncateContent(blog.content,150)}}>
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