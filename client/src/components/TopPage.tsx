import * as React from 'react'
import { Link } from 'react-router-dom'
import { useArSyncModel } from '../typed/hooks'

const currentUserQuery = {
  name: true, followedCount: true, followingCount: true,
  posts: ['id', 'title', 'commentsCount', 'createdAt']
} as const
const postsQuery = {
  id: true,
  user: ['id', 'name'],
  title: true,
  createdAt: true,
  commentsCount: true
} as const

export const TopPage: React.FC = () => {
  const [currentUser] = useArSyncModel({ api: 'profile', query: currentUserQuery })
  const [posts] = useArSyncModel({ api: 'newposts', query: postsQuery })
  if (!currentUser || !posts) return null
  return <>
    <h1>Top Page: welcome { currentUser.name }!</h1>
    <h2>
      Following: { currentUser.followingCount }
      &nbsp;&nbsp;
      Followers: { currentUser.followedCount }
      &nbsp;&nbsp;
      <a href='/follows'>detail</a>
    </h2>
    <hr />
    <a href='/posts/new'>Create New Post</a>
    &nbsp;
    <a href='/users'>Find friends</a>
    <hr />
    <h2>Your posts</h2>
    { currentUser.posts.map(post =>
      <div key={post.id}>
        <Link to={'/posts/' + post.id}><b>{ post.title }</b></Link>
        &nbsp;&nbsp;
        <small>date: { post.createdAt }</small>
        <small>&nbsp;&nbsp;comments:{ post.commentsCount }</small>
      </div>
    )}
    <h2>Everyone's posts</h2>
    { posts.map(post =>
      <div key={post.id}>
        <Link to={'/posts/' + post.id}><b>{ post.title }</b></Link>
        &nbsp;&nbsp;
        <small>author: <Link to={'/users/' + post.user.id}>{post.user.name}</Link></small>
        <small>date: { post.createdAt }</small>
        <small>&nbsp;&nbsp;comments:{ post.commentsCount }</small>
      </div>
    )}
  </>
}
