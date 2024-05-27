import { format } from "date-fns";
import BookIconComp from "./BookIcon";
import MapsUgcOutlinedComp from "@/app/components/MapsUgcOutlined";
import CommentDrawer from "./Comments";
import SingleBlogNav from "./SingleBlogNavComp";
import SinglePost from "./SinglePost.css"

export default async function UserPosts({ promise }) {
    const posts = await promise;
    console.log(posts, 'this is posts on server')

    const applyCodeBlockStyling = (htmlContent) => {
        // Use regex to find <pre> tags with class "ql-syntax" and add a custom class
        return htmlContent.replace(/<pre class="ql-syntax"/g, '<pre class="ql-syntax custom-code-block-bg"');
    };

    const content = posts.map(post => (
        <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center mt-4" key={post.id}>
            <article>
                <h2 className="inline-block font-heading text-3xl tracking-tight lg:text-4xl mb-4">{post.title}</h2>
                <hr />
                <SingleBlogNav />
                <hr/>
                <div dangerouslySetInnerHTML={{ __html: applyCodeBlockStyling(post.content) }} className="mt-2"></div>
            </article>
            <BookIconComp />
        </div>
    ));

    return content;
}
