
export default async function getAllBlogs() {


    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`, { next: { revalidate: 60 }})


    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}