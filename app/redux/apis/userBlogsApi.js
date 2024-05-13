export default async function getBlogsByUser(userId) {

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';


    const res = await fetch(`${backendUrl}/blogs/user/${userId}`, { next: { revalidate: 60 }})

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}