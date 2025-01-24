
export default async function getAllBlogsAPI() {


    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`, { cache: 'no-store' })


    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}