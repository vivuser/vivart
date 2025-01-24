'use client'
import { use } from 'react'
 
export default function Authors({ users }) {
  const authors = use(users)
 
  return (
    <ul>
      {authors.users.map((author) => (
        <li key={author._id}>{author.name}</li>
      ))}
    </ul>
  )
}