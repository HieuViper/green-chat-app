import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ChatState } from '../Context/ChatProvider'
import Sidebar from '../Components/Chat/Sidebar'
import ChatSection from '../Components/Chat/ChatSection'

const ChatPage = () => {
  const { user } = ChatState()
  const [fetchAgain, setFetchAgain] = useState(false)


  return (
    <div className='flex'>
      <div className="">{user && <Sidebar fetchAgain={fetchAgain} />}</div>

      <div className="flex-1">{user && <ChatSection fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}</div>
    </div>
  )
}

export default ChatPage