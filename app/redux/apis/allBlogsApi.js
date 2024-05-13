import axios from "axios";

export default async function getAllBlogs() {

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
    const res = await axios.get(`${backendUrl}/blogs`, { next: { revalidate: 60 }})


    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}