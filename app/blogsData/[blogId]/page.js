import getSingleBlog from "@/app/redux/apis/singleBlogApi";
import { Suspense } from "react";
import SinglePost from "./components/SinglePost";
import getAllBlogs from "@/app/redux/apis/allBlogsApi";


export const metadata =  {
        title: 'single blog page'
    }

export default  async function SingleBlogPage({params}) {

    const singleBlogData = await getSingleBlog(params.blogId)

    const singleBlogContent = (
        <div className="m-20">
        <Suspense fallback={<p>loading  single blog ...</p>}>
         <SinglePost promise={singleBlogData}/>
         </Suspense>
        </div>
    )
    return singleBlogContent;
}       

export async function generateStaticParams() {
    const allBlogData = await getAllBlogs()
    const blogs = await allBlogData.data.values

    console.log(blogs, 'static')

    return blogs.map(blog => ({
        blogId: blog._id.toString()
    }))

}