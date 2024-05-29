  "use client"
  import React, { useEffect, useState } from 'react'
  import axios from 'axios'
  import { useSession } from 'next-auth/react'
  import options from '../api/auth/[...nextauth]/options'
  import { kMaxLength } from 'buffer'
  import Link from 'next/link'
import getBlogsByUser from '../redux/apis/userBlogsApi'
import { format } from 'date-fns'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditedPost from './EditedPostComponent'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { openSnackbar } from '../redux/slices/commonSlice'
import AutohideSnackbar from '../components/Snackbar'

  const MyPosts = () => {
    const [showUserPosts, setShowUserPosts] = useState(false);
    const [userPosts, setUserPosts] = useState([])
    const [showUpdateButton, setShowUpdateButton] = useState(false);
    const [editedPost, setEditedPost] = useState(false);
    const { data: session, status }  = useSession(options);
    const dispatch = useDispatch();
    if (status !== "loading") {
      console.log(session, '8888')
    }

    const router = useRouter();
    const userId = session?.user?.id;
  

    const handleShowPosts =async () => {
      setShowUserPosts(!showUserPosts);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/mypost/${userId}`)
      if (response.data.length > 6) {
      const postResponse = response?.data
      setUserPosts(postResponse.slice(0,6))
      }
      else {
      const postResponse = response?.data
      setUserPosts(postResponse)
      }
      console.log(response, 'user blogs')
    }

    const truncateContent = (content, maxLength) => {
      return content.length > maxLength ? content.slice(0, maxLength - 3) + '...' : content;
    }

    const handleShowMore = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/mypost/${userId}`)
      setUserPosts(response?.data)
    }

    const handleDelete =  async (id) => {
      console.log(id, 'this id to be deleted')
      try {
          const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${userId}/${id}`,)
          handleShowPosts();
          setShowUserPosts(true);
          dispatch(
            openSnackbar({
              content: 'Post deleted successfully',
              color: 'success'
            })
          )
        }
        catch(error) {
          console.log('Error deleting post', error)
        }
        }

      const handleEditPost = async (id) => {
        router.push(`/blogsData/${id}/edit`)
        // const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${id}`)
        // setEditedPost(response.data);
        // setShowUpdateButton(true)
      }

      const handleUpdatePost = async (updatedPost) => {
        setShowUpdateButton(false);
        setEditedPost(null)
      }

      const handleCancelUpdatePost = () => {
        setShowUpdateButton(false);
        setEditedPost(null);
      }

      return (<>
      <AutohideSnackbar/>
          <button className='bg-gray-200 p-1 m-2'
          onClick={handleShowPosts}>
        My posts
          </button>
          {showUserPosts && ( 
          <>
          <div className="max-w-3xl mx-auto  flex flex-col md:grid grid-cols-2">
            {userPosts.map((post) => (
              <div key={post._id} className='bg-slate-100 p-3 m-3'>
              <Link href={`/blogsData/${post._id}`}>
                <h2 className='font-medium text-lg'>{post.title}</h2>
                <hr/>
                <span className='text-sm mt-1' 
                dangerouslySetInnerHTML={{__html: truncateContent(post.content,100)}}>
                </span>
                <br/>
                <span className='text-xs'>
                {format(new Date(post.createdAt),'MMMM dd yyyy')}
                </span>
                </Link>
                <button><DeleteIcon onClick={() => handleDelete(post._id)} className='text-slate-400'/></button>
                <button><EditIcon onClick={() => handleEditPost(post._id)} className='text-slate-400'/></button>
                {showUpdateButton && editedPost && (
                  <EditedPost post={editedPost} onUpdate={handleUpdatePost} onCancel={handleCancelUpdatePost}/>
                )}
              </div>
            ))}

            {userPosts.length > 5 ?
              <button className='bg-gray-200 p-2 mx-auto align-center' onClick={handleShowMore}>View All</button>
              :
              userPosts.length < 1 ? 
              <div className='flex justify-center'>
              <p className='text-slate-600'>Write your <span className='underline underline-offset-2' ><Link href={'/write'}>first post</Link></span></p>
              </div>
              : null 
          }
          </div>
          </> 
          )}
          </>)
    }

    export default MyPosts;
