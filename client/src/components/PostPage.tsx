import * as React from 'react'
import { useRef } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { useArSyncModel } from '../typed/hooks'
import ReactionButton from './ReactionButton'
import RemoteButton from './RemoteButton'
import { sendData } from '../lib'

const currentUserQuery = ['id', 'name'] as const
const postQuery = {
  id: true,
  title: true,
  body: true,
  reactionSummary: true,
  user: ['id', 'name'],
  createdAt: true,
  myReaction: 'kind',
  comments: { id: true, body: true, reactionSummary: true, user: ['id', 'name'], myReaction: 'kind' }
} as const

const CommentForm: React.FC<{ postId: number }> = ({ postId }) => {
  const inputElement = useRef<HTMLInputElement>(null);
  const send = () => {
    const text = inputElement.current!.value
    inputElement.current!.value = ''
    if (text) sendData({ url: '/comments?post_id=' + postId, method: 'POST', data: { comment: { body:  text } } })
  }
  return <form className='comment-form' onSubmit={e => { e.preventDefault(); send() }}>
    <input placeholder='comment' ref={inputElement}></input>
    <a onClick={send}><i className='material-icons'>send</i></a>
  </form>
}

export const PostPage: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
  const id = Number(props.match.params.id)
  const [currentUser] = useArSyncModel({ api: 'profile', query: currentUserQuery })
  const [post] = useArSyncModel({ api: 'post', params: { id }, query: postQuery })
  if (!currentUser || !post) return null
  return <>
    <h1>
      { post.title }
      &nbsp;
      {
        post.user.id == currentUser.id
        ? <Link to={'/posts/' + post.id + '/edit'}><i className='material-icons'>edit</i></Link>
        : null
      }
    </h1>
    <p>
      <b>
        author: <Link to={'/users/' + post.user.id}>{ post.user.name }</Link>
        &nbsp;&nbsp;date: { post.createdAt }
      </b>
    </p>
    <article>
      { post.body }
    </article>
    <ReactionButton url={'/posts/' + post.id + '/reaction'} summary={ post.reactionSummary } mine={ post.myReaction } large={ true } />
    <hr />
    <div style={{ marginLeft: '50px' }}>
      { post.comments.map(comment =>
        <div key={comment.id}>
          <p>
            <b>
              <Link to={'/users/' + comment.user.id}>{ comment.user.name }</Link>
              :&nbsp;
            </b>
            <span>{ comment.body }</span>
            &nbsp;
            <Link to={'/comments/' + comment.id}><i className='material-icons'>link</i></Link>
            { comment.user.id === currentUser.id
              ? <span>
                  &nbsp;
                  <RemoteButton url={'/comments/' + comment.id + '.json'} method='delete'>
                    <i className='material-icons'>clear</i>
                  </RemoteButton>
                  &nbsp;
                  <a href={'/comments/' + comment.id + '/edit'}>
                    <i className='material-icons'>edit</i>
                  </a>
                </span>
              : null
            }
          </p>
          <ReactionButton url={'/comments/' + comment.id + '/reaction'} summary={ comment.reactionSummary } mine={ comment.myReaction } />
          <hr />
        </div>
      ) }
    </div>
    <CommentForm postId={post.id} />
  </>
}
