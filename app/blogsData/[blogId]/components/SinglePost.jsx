import BookIconComp from "./BookIcon";

export default async function UserPosts({ promise }) {

    const posts = await promise;

    console.log(posts, 'commtss posts')

    const content = posts.map(post => {
        return (<>
            <div className="max-w-4xl mx-auto flex flex-wrap justify-between">
            <article key={post.id}>
                <h2 className="inline-block font-heading text-3xl tracking-tight lg:text-4xl">{post.title}</h2>
                <p dangerouslySetInnerHTML = {{ __html: post.content }}></p>
                <br />
            </article>
            <BookIconComp />
            </div>
            <div className="max-w-4xl mx-auto flex flex-wrap justify-between">
                {post.comment.map((comment, index) => (
                    <p key={index}>{comment?.text}</p>
                ))}
            </div>
            </>);
    });

    return content;
}
