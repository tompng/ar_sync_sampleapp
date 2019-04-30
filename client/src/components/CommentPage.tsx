import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { useArSyncModel } from '../typed/hooks'
import ReactionButton from './ReactionButton'

const currentUserQuery = ['id', 'name'] as const
const commentQuery = {
  id: true,
  body: true,
  postId: true,
  reactionSummary: true,
  user: ['id', 'name'],
  myReaction: 'kind'
} as const

export const CommentPage: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
  const id = Number(props.match.params.id)
  const [currentUser] = useArSyncModel({ api: 'profile', query: currentUserQuery })
  const [comment] = useArSyncModel({ api: 'comment', params: { id }, query: commentQuery })
  if (!comment || !currentUser) return null
  return <>
    <Link to={'/posts/' + comment.postId}>
      <i className='material-icons'>reply</i>
      Back
    </Link>
    <div>
      <b><Link to={'/users/' + comment.user.id}>{ comment.user.name }</Link>:</b>
      <span>{ comment.body }</span>
      &nbsp;
      {
        comment.user.id === currentUser.id
        ? <a href={'/comments/' + comment.id + '/edit'}><i className='material-icons'>edit</i></a>
        : null
      }
    </div>
    <ReactionButton url={'/comments/' + comment.id + '/reaction'} summary={ comment.reactionSummary } mine={ comment.myReaction } />
    <hr />
  </>
}
