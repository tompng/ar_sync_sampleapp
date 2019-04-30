import * as React from 'react'
import { Link } from 'react-router-dom'
import { useArSyncModel } from '../typed/hooks'

const currentUserQuery = {
  name: true,
  followeds: { from: ['id', 'name'] },
  followings: { to: ['id', 'name'] }
} as const

export const FollowsPage: React.FC = () => {
  const [currentUser] = useArSyncModel({ api: 'profile', query: currentUserQuery })
  if (!currentUser) return null
  return <>
    <h1>Following: { currentUser.followings.length }</h1>
    { currentUser.followings.map(following =>
      <div key={following.to.id}>
        <Link to={'/users/' + following.to.id}>{ following.to.name }</Link>
      </div>
    ) }
    <h1>Followers: { currentUser.followeds.length }</h1>
    { currentUser.followeds.map(followed =>
      <div key={followed.from.id}>
        <Link to={'/users/' + followed.from.id}>{ followed.from.name }</Link>
      </div>
    ) }
  </>
}
