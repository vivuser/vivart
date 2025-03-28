import { method } from "lodash"

export async function getSingleBlog(blogId)  {

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${blogId}`, { cache: 'no-store' })
            if (!res.ok) throw new Error('failed to fetch single blog data')

            return res.json()
        } catch (error) {
            console.error('error fetching data')
            return []
        }
}

export async function updateSingleBlogLike(blogId, userId) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${blogId}/like`, {
            method: 'PUT', // Use 'PUT' since you're updating the resource (liking the post)
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }), // Send the userId in the request body
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update like count');
        }

        // Assuming the backend responds with the updated blog data
        const updatedBlog = await response.json();
        return updatedBlog; // Return the updated blog to use on the frontend
    } catch (error) {
        console.error('Error updating like count:', error);
        throw error;
    }
}

    