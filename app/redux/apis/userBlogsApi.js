export default async function getBlogsByUser(userId) {

    const res = await fetch(`http://localhost:3001/blogs/user/${userId}`, { next: { revalidate: 60 }})

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}