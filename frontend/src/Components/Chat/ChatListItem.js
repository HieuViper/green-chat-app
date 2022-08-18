import React, { useEffect, useState } from 'react'
import { getSender } from '../../config/ChatLogics';
import { ChatState } from '../../Context/ChatProvider'

const ChatListItem = ({chats, loggedUser}) => {
  const {selectedChat, setSelectedChat} = ChatState()

  const handleSelectedChat = () => {
    setSelectedChat(chats)
  }

  return (
    <div>
      {
        chats ? ( <div onClick={handleSelectedChat} className={`${selectedChat && selectedChat._id === chats._id ? 'bg-main-500' : 'bg-[#FAFAFA]'} ${selectedChat && selectedChat._id === chats._id ? 'text-white' : 'text-black'} flex items-center cursor-pointer hover:bg-main-500 hover:text-white px-3 py-2 rounded-xl overflow-y-scroll`}>
          <div className="pic mr-5">
            <img src={chats.users[1].pic} className="w-[30px] rounded-full" />
          </div>
          <div className="">
            <div className="name">
              {chats.isGroupChat === true ? chats.chatName: getSender(loggedUser, chats.users)}
            </div>
          </div>
        </div>) : (<div>Loading</div>)
      }
    </div>
  )
}

export default ChatListItem