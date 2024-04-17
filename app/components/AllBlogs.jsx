import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";
import options from "../api/auth/[...nextauth]/options";

const AllBlogs = async () => {
    const user = await getServerSession(options)


    console.log(user, '///')


    return (
        <>
        <h2>Blogs</h2>
        </>
    )
}

export default AllBlogs;