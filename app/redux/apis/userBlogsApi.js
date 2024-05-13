export default async function getBlogsByUser(userId) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/user/${userId}`, { next: { revalidate: 60 }})

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}