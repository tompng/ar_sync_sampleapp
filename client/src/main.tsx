import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { TopPage } from './components/TopPage'
import { PostPage } from './components/PostPage'
import { UserPage } from './components/UserPage'
import { CommentPage } from './components/CommentPage'
import { FollowsPage } from './components/FollowsPage'
import ArSyncModel from './typed/ArSyncModel'
import ActionCableAdapter from 'ar_sync/core/ActionCableAdapter'
ArSyncModel.setConnectionAdapter(new ActionCableAdapter)

const App: React.FC = () => (
  <BrowserRouter>
    <>
      <Route exact path='/' component={TopPage} />
      <Route path='/posts/:id' component={PostPage} />
      <Route path='/users/:id' component={UserPage} />
      <Route path='/comments/:id' component={CommentPage} />
      <Route path='/follows' component={FollowsPage} />
    </>
  </BrowserRouter>
)

window.onload = () => {
  ReactDOM.render(<App />, document.querySelector('#root'))
}
