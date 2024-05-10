import BookIconComp from "./BookIcon";

export default async function UserPosts({ promise }) {

    const posts = await promise;

    console.log(posts, 'commtss posts')

    const content = posts.map(post => {

        let postContent ; 
        const extractCodeContent = (content) => {
            const preRegex = /<pre.*?>([\s\S]*?)<\/pre>/; // Match everything inside <pre> tags
            const matches = content.match(preRegex);
            return matches ? matches[1] : ''; // Return the content inside <pre> tags
        };

        if (post.content.includes("<img")) {
            postContent = (
                <div className="max-w-4xl mx-auto flex flex-wrap justify-between">
                    <article key={post.id}>
                        <h2 className="inline-block font-heading text-3xl tracking-tight lg:text-4xl mb-4">{post.title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: post.content }} className="bg-slate-100 "></p>
                        <br />
                    </article>
                    <BookIconComp />
                </div>
            );
        } else {
            // Check if the post content contains a code block
            if (post.content.includes("<pre")) {
                const codeContent = extractCodeContent(post.content);
                postContent = (
                    <div className="max-w-4xl mx-auto flex flex-wrap justify-between">
                        <article key={post.id}>
                            <h2 className="inline-block font-heading text-3xl tracking-tight lg:text-4xl mb-4">{post.title}</h2>
                            <pre className="bg-black text-white p-4 max-w-4xl">{codeContent}</pre>
                            <br />
                        </article>
                        <BookIconComp />
                    </div>
                );
            } else {
                // Default content rendering
                postContent = (
                    <div className="max-w-4xl mx-auto flex flex-wrap justify-between">
                        <article key={post.id}>
                            <h2 className="inline-block font-heading text-3xl tracking-tight lg:text-4xl mb-4">{post.title}</h2>
                            <p dangerouslySetInnerHTML={{ __html: post.content }} className="bg-slate-100"></p>
                            <br />
                        </article>
                        <BookIconComp />
                    </div>
                );
            }
        }

        return postContent;
    });

    return content;
}
