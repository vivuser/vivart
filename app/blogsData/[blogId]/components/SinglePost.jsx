import BookIconComp from "./BookIcon";

export default async function UserPosts({ promise }) {
    const posts = await promise;

    const content = posts.map(post => (
        <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center" key={post.id}>
            <article>
                <h2 className="inline-block font-heading text-3xl tracking-tight lg:text-4xl mb-4">{post.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: post.content }} ></p>
            </article>
            <BookIconComp />
        </div>
    ));

    return content;
}
