     import axios from "axios"
     

    export default async function getSingleBlog(blogId)  {

        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${blogId}`)
            if (!res.ok) throw new Error('failed to fetch single blog data')

            return res.json()
        } catch (error) {
            console.error('error fetching data')
            return []
        }
}
    