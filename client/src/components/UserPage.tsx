import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { useArSyncModel } from '../typed/hooks'
import RemoteButton from './RemoteButton'

const currentUserQuery = ['id', 'name'] as const
const userQuery = {
  id: true, name: true, isFollowing: true, isFollowed: true,
  posts: {
    id: true, title: true, commentsCount: true, createdAt: true,
    commentsLast5: { attributes: { id: true, user: ['id', 'name'], body: true }, params: { limit: 3 } },
  }
} as const

export const UserPage: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
  const id = Number(props.match.params.id)
  const [currentUser] = useArSyncModel({ api: 'profile', query: currentUserQuery })
  const [user] = useArSyncModel({ api: 'user', params: { id }, query: userQuery })
  if (!currentUser || !user) return null
  return <>
    <h1>
      { user.name }
      &nbsp;&nbsp;
      <small>
        {user.isFollowed ? 'follows you' : user.id == currentUser.id ? "It's me" : null}
      </small>
    </h1>
    { user.id !== currentUser.id
      ? (
          user.isFollowing
          ? <>
              following&nbsp;&nbsp;
              <RemoteButton url={'/follows/unfollow?user_id=' + user.id} method='post' text='unfollow' />
            </>
          : <RemoteButton url={'/follows/follow?user_id=' + user.id} method='post' text='follow' />
        )
      : null
    }
    <h2>{ user.name }'s posts</h2>
    { user.posts.map(post =>
      <div key={post.id}>
        <Link to={'/posts/' + post.id}><b>{ post.title }</b></Link>
        &nbsp;&nbsp;
        <small>date: { post.createdAt }</small>
        <small>&nbsp;&nbsp;comments:{ post.commentsCount }</small>
        <div>recent 3 comments:</div>
        { post.commentsLast5.map(comment =>
          <div key={ comment.id } style={{ paddingLeft: '40px' }}>
            <b>{ comment.user.name }:</b>
            { comment.body }
          </div>
        ) }
      </div>
    ) }
  </>
}
