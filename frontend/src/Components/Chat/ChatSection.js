import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import SingleChat from './SingleChat'

const ChatSection = ({fetchAgain, setFetchAgain}) => {
  const { selectedChat } = ChatState()

  return (
    
      <div className="chat-section flex-1 relative h-full">
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </div>
      
  )
}

export default ChatSection