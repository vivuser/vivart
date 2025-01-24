import { Suspense } from 'react'
import getAllAuthors from '../redux/apis/getAllUsersApi'
import Authors from './authorComponent'
 
export default function Page() {
  // Don't await the data fetching function
  const users = getAllAuthors()
 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Authors users={users} />
    </Suspense>
  )
}