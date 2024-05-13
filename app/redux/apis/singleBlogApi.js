     import axios from "axios"
     

    export default async function getSingleBlog(blogId)  {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';


        try {
            const res = await axios.get(`${backendUrl}/blogs/${blogId}`)
            if (!res.ok) throw new Error('failed to fetch single blog data')

            return res.json()
        } catch (error) {
            console.error('error fetching data')
            return []
        }
}
    