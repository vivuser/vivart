
export async function UserPostMeta({ promise }) {
    const posts = await promise;

    const content = posts.map(post => {
        return {
            title: post.title,
            description: `This is the page of ${blog.content}`
        }
    });

    console.log(content, 'meta......')

    return content;
}
