export default async function getAllBlogs() {
    const res = await fetch('http://localhost:3001/blogs')


    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}