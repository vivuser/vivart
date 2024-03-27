    import getAllBlogs from '../redux/apis/allBlogsApi'
    import Link from "next/link";

    export const metadata ={
        title: 'Blogs',
    }

    
    export default async function Page() {
        const blogsData = await getAllBlogs()

        const blogs = await blogsData.data.values


        const content = (
            <section>   
                <br/>
                {blogs.map(blog => {
                    return (
                        <>
                            <p key={blog._id}>
                                <Link href={`/blogsData/${blog._id}`}>{blog.title}</Link>
                            </p>
                            <br />
                        </>
                    )
                })}
            </section>
        )
        return content;
    }   