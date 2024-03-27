import getSingleBlog from "@/app/redux/apis/singleBlogApi";
import { Suspense } from "react";
import SinglePost from "./components/SinglePost";

export default  async function SingleBlogPage({params}) {

    const singleBlogData = await getSingleBlog(params.blogId)

    console.log(params.blogId,  'blogId going...')

    console.log(singleBlogData, 'single blog data')

    const singleBlogContent = (
        <div className="m-20">
        <Suspense fallback={<p>loading  single blog ...</p>}>
         <SinglePost promise={singleBlogData}/>
         </Suspense>
        </div>
    )


    return singleBlogContent;
}       