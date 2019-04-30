import * as React from 'react'
import RemoteButton from './RemoteButton'

interface ReactionProps {
  url: string
  summary: { like?: number; dislike?: number }
  large?: boolean
  mine: { kind: 'like' | 'dislike' } | null
}
const ReactionButton: React.FC<ReactionProps> = ({ url, mine, large, summary }) => {
  const liked = mine && mine.kind === 'like'
  const disliked = mine && mine.kind === 'dislike'
  return <div>
    <RemoteButton className={'reaction-button' + (liked ? ' active' : '')}
      url={url + '?kind=' + (liked ? 'null' : 'like')} method='post'>
      <i className={'material-icons ' + (large ? ' material-icons-large' : '')}>thumb_up</i>
    </RemoteButton>
    <RemoteButton className={'reaction-button' + (disliked ? ' active' : '')}
      url={url + '?kind=' + (disliked ? 'null' : 'dislike')} method='post'>
      <i className={'material-icons ' + (large ? ' material-icons-large' : '')}>thumb_down</i>
    </RemoteButton>
    <small>
      { summary.like ? <><i className='material-icons'>thumb_up</i>:{summary.like}</> : null }
      { summary.dislike ? <><i className='material-icons'>thumb_down</i>:{summary.dislike}</> : null }
    </small>
  </div>
}

export default ReactionButton
