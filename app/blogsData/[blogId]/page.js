import getSingleBlog from "@/app/redux/apis/singleBlogApi";
import { Suspense } from "react";
import SinglePost from "./components/SinglePost";
import { UserPostMeta} from "./components/MetaData";

export async function generateMetaData({params}){
    const singleMetaData = await getSingleBlog(params.blogId);
    <UserPostMeta promise={singleMetaData}/>
    console.log('going..')
}


export default  async function SingleBlogPage({params}) {

    const singleBlogData = await getSingleBlog(params.blogId)

    // console.log(params.blogId,  'blogId going...')

    // console.log(singleBlogData, 'single blog data')

    const singleBlogContent = (
        <div className="m-20">
        <Suspense fallback={<p>loading  single blog ...</p>}>
         <SinglePost promise={singleBlogData}/>
         </Suspense>
        </div>
    )


    return singleBlogContent;
}       