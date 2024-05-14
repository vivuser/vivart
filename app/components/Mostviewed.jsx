import getAllBlogs from "../redux/apis/allBlogsApi"

const Mostviewed = async () => {

    const allBlogs = await getAllBlogs()
    const topBlogs =  allBlogs?.data?.values
    const allSortedPosts =  topBlogs?.slice().sort((a,b) => b.views - a.views);
    const sortedPosts = allSortedPosts?.splice(0,6);

    console.log(topBlogs , 'top posts')
    console.log(sortedPosts , 'sorted posts')

    return (
        <div>
            <p className="font-2xl">Most viewed posts</p>
            <div className="flex flex-row">
            {sortedPosts.map((blog) => {
                return (    
                    <div key={blog.id}>
                        <div className="bg-gray-100 m-4 p-4">
                            <div className="flex flex-col">
                            <div className="mb-2"> 
                    <h2 className="text-lg font-semibold">{blog.title}</h2> 
                </div>
                <div>
                    <p className="text-gray-700">{blog.content}</p>
                </div>
                            </div>
                        </div>
                     </div>)
            } )}
            </div>
        </div>
    )

}

export default Mostviewed;