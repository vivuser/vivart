import { format } from "date-fns";
import BookIconComp from "./BookIcon";
import MapsUgcOutlinedComp from "@/app/components/MapsUgcOutlined";
import CommentDrawer from "./Comments";

export default async function UserPosts({ promise }) {
    const posts = await promise;
    console.log(posts, 'this is posts on server')


    const content = posts.map(post => (
        <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center mt-4" key={post.id}>
            <article>
                <h2 className="inline-block font-heading text-3xl tracking-tight lg:text-4xl mb-4">{post.title}</h2>
                <hr />
                <div className="flex flex-row justify-between m-2">
                <h3 className="text-xs">Tags: 
                <span className="underline underline-offset-2 p-2 text-slate-">{post?.tags}</span></h3> 
                <h3 className="text-xs">Author: 
                <span className="underline underline-offset-2 p-2 text-slate-600">{post?.author.split(' ')[0]}</span></h3>
                <h3 className="text-xs">Date: 
                <span className="underline underline-offset-2 p-2 text-slate-600">{format(new Date(post.createdAt), 'MMMM dd, yy')}</span></h3>
                {/* <MapsUgcOutlinedComp /> */}
                <CommentDrawer />
                </div>
                <hr/>
                <p dangerouslySetInnerHTML={{ __html: post.content }} className="mt-2"></p>
            </article>
            <BookIconComp />
        </div>
    ));

    return content;
}
