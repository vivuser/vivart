import { format } from "date-fns";
import BookIconComp from "./BookIcon";
import MapsUgcOutlinedComp from "@/app/components/MapsUgcOutlined";
import CommentDrawer from "./Comments";
import SingleBlogNav from "./SingleBlogNavComp";

export default async function UserPosts({ promise }) {
    const posts = await promise;
    console.log(posts, 'this is posts on server')


    const content = posts.map(post => (
        <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center mt-4" key={post.id}>
            <article>
                <h2 className="inline-block font-heading text-3xl tracking-tight lg:text-4xl mb-4">{post.title}</h2>
                <hr />
                <SingleBlogNav />
                <hr/>
                <p dangerouslySetInnerHTML={{ __html: post.content }} className="mt-2"></p>
            </article>
            <BookIconComp />
        </div>
    ));

    return content;
}
