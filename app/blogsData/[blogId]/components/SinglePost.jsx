import BookIconComp from "./BookIcon";

export default async function UserPosts({ promise }) {

    const posts = await promise;

    console.log(posts, 'commtss posts')

    const content = posts.map(post => {
        // Helper function to extract content inside <pre> tags
        const extractCodeContent = (content) => {
            const preRegex = /<pre.*?>([\s\S]*?)<\/pre>/; // Match everything inside <pre> tags
            const matches = content.match(preRegex);
            return matches ? matches[1] : ''; // Return the content inside <pre> tags
        };
    
        // Helper function to remove <pre> tags and their content from the regular content
        const removePreContent = (content) => {
            return content.replace(/<pre.*?>[\s\S]*?<\/pre>/g, ''); // Remove all <pre> tags and their content
        };
    
        let postContent;
    
        // Check if the post content contains a <pre> tag
        if (post.content.includes("<pre")) {
            const codeContent = extractCodeContent(post.content);
            const cleanedContent = removePreContent(post.content);
            // Modify postContent to render both code and regular content
            postContent = (
                <div className="max-w-4xl mx-auto flex flex-wrap justify-between" key={post.id}>
                    <article>
                        <h2 className="inline-block font-heading text-3xl tracking-tight lg:text-4xl mb-4">{post.title}</h2>
                        {/* Render the code block with a black background */}
                        <pre className="bg-black text-white p-4 max-w-4xl">{codeContent}</pre>
                        {/* Render the regular content */}
                        <p dangerouslySetInnerHTML={{ __html: cleanedContent }} className="bg-slate-100"></p>
                    </article>
                    <BookIconComp />
                </div>
            );
        } else {
            // Render the post content without modification
            postContent = (
                <div className="max-w-4xl mx-auto flex flex-wrap justify-between" key={post.id}>
                    <article>
                        <h2 className="inline-block font-heading text-3xl tracking-tight lg:text-4xl mb-4">{post.title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: post.content }} className="bg-slate-100"></p>
                    </article>
                    <BookIconComp />
                </div>
            );
        }
    
        return postContent;
    });
    

    return content;
}
