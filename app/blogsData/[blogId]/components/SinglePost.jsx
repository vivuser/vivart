import BookIconComp from "./BookIcon";

export default async function UserPosts({ promise }) {

    const posts = await promise;

    const content = posts.map(post => {
        return (<>
            <div className="max-w-4xl mx-auto flex flex-wrap justify-between">
            <article key={post.id}>
                <h2>{post.title}</h2>
                <p dangerouslySetInnerHTML = {{ __html: post.content }}></p>
                <br />
            </article>
            <BookIconComp />
            </div>
            </>);
    });

    return content;
}
