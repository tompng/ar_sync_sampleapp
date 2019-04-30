import { sendData } from '../lib'
import * as React from 'react'
interface RemoteButtonProps {
  url: string
  method: string
  data?: object
  text?: string
  className?: string
}
const RemoteButton: React.FC<RemoteButtonProps> = props => {
  return <a style={{ textDecoration: 'underline' }} className={ props.className } onClick={ e => { e.preventDefault(); sendData(props) } }>
    {props.text || ''}{props.children}
  </a>
}

export default RemoteButton
