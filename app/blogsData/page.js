    // import MetaData from 'next'
    import getAllBlogs from '../redux/apis/allBlogsApi'
    import Link from "next/link";

    export const MetaData = {
        title: 'Users',
    } 
    
    export default async function Page() {
        const blogsData = getAllBlogs()

        const blogs = await blogsData.values

        console.log(blogsData?.values, 'blogs')

        const content = (
            <section>
                <h2>
                    <Link href="/">Back to home</Link>
                </h2>
                <br/>
                {blogs.map(blog => {
                    return (
                        <>
                            <p key={blog.id}>
                                <Link href={`/blog/${blog.id}`}>{blog.name}</Link>
                            </p>
                            <br />
                        </>
                    )
                })}
            </section>
        )
        return content;
    }   