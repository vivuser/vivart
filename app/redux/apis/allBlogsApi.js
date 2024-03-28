export default async function getAllBlogs() {
    const res = await fetch('http://localhost:3001/blogs', { next: { revalidate: 60 }})


    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}