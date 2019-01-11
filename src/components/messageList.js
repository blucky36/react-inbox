import React from "react"
import Message from "./message.js"

const MessageList = ({toggleRead,toggleStar,toggleSelect,messages}) => {
  return (
    <div>
      {messages.map((e,i)=><Message key = {i} ele = {i} toggleRead={toggleRead} toggleStar={toggleStar} toggleSelect={toggleSelect} message = {e}/>)}
    </div>
  )
}

export default MessageList
