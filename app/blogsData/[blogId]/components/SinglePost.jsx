import { format } from "date-fns";
import BookIconComp from "./BookIcon";
import MapsUgcOutlinedComp from "@/app/components/MapsUgcOutlined";
import CommentDrawer from "./Comments";
import SingleBlogNav from "./SingleBlogNavComp";
import SinglePost from "./SinglePost.css"
import { Suspense } from "react";
import VisibleTagsLoader from "./visibleTagsLoader";
import LoveIconComp from "./LoveIconComp";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

export default async function UserPosts({ promise }) {
    const posts = await promise;
    const session = await getServerSession(options);
    const userId = session?.user?.id
    console.log(session?.user?.id, 'userdata on server .. .')

    console.log(posts[0]?.likes?.userIds?.length , 'POST DATA COMING')


    const applyCodeBlockStyling = (htmlContent) => {
        // Use regex to find <pre> tags with class "ql-syntax" and add a custom class
        return htmlContent.replace(/<pre class="ql-syntax"/g, '<pre class="ql-syntax custom-code-block-bg"');
    };

    const content = posts.map(post => (
        <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center mt-4" key={post._id}>
            <article>
                <h2 className="inline-block font-heading text-3xl tracking-tight lg:text-4xl mb-4">{post.title}</h2>
                <hr />
                <Suspense fallback={<p>Loading..</p>}>
                <SingleBlogNav />
                </Suspense>
                <hr/>
                <div dangerouslySetInnerHTML={{ __html: applyCodeBlockStyling(post.content) }} className="mt-2 p-2"></div>
            </article>
            <BookIconComp />
            <LoveIconComp userId={userId} blogId={post._id} initialLikes={post?.likes?.userIds?.length || 0} alreadyLiked={post?.likes?.userIds?.includes(userId)}/>
        </div>
    ));

    return content;
}
