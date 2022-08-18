import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { BsImage } from 'react-icons/bs'
import { BiSend } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { getSender, getSenderEmail, getSenderPic } from '../../config/ChatLogics'
import UpdateGroupModal from './UpdateGroupModal'
import toast from 'react-hot-toast'
import axios from 'axios'
import ScrollableChat from './ScrollableChat'
import io from 'socket.io-client'
import Lottie from 'react-lottie';
import animationData from '../../animation/typing/typing.json'
import ScrollableFeed from 'react-scrollable-feed'

const END_POINT = 'https://green-chating-application.herokuapp.com'
let socket, selectedChatCompare
const SingleChat = ({ fetchAgain, setFetchAgain }) => {

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUpdateGroupModal, setShowUpdateGroupModal] = useState(false);
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [socketConnected, setSocketConnected] = useState(false)
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState()


  useEffect(() => {
    socket = io(END_POINT)
    socket.emit('setup', user)
    socket.on('connected', () => setSocketConnected(true))
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [])

  const sendMessage = async (event) => {
    if (event.type === 'click' || event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error('Error Occured !!!')
        return
      }
    }
  }

  const typingHandler = (e) => {
    setNewMessage(e.target.value)

    // Typing indicator logic
    if (!socketConnected) return

    if (!typing) {
      setTyping(true)
      socket.emit('typing', selectedChat._id)
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  }

  const fetchMessage = async () => {
    if (!selectedChat) return

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit('join chat', selectedChat._id)
    } catch (err) {
      toast.error('Error Occured !!!')
      console.log(err.message);
      return
    }
  }

  useEffect(() => {
    fetchMessage()
    selectedChatCompare = selectedChat
  }, [selectedChat])

  
  console.log(notification);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if(!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification])
          setFetchAgain(!fetchAgain)
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });


  return (
    <>
      {selectedChat ? (
        <>
          <div className='flex flex-col px-7 py-3 h-full'>
            <div className="header flex items-center mb-1" >
              <div className="avatar cursor-pointer">
                <img onClick={() => setShowProfileModal(true)} src={selectedChat && !selectedChat.isGroupChat ? getSenderPic(user, selectedChat.users) : 'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'} alt="" className='w-[30px] h-[30px] rounded-full' />
              </div>
              <div className="username flex flex-col flex-1 ml-4">
                <div className="name text-sm">
                  {
                    !selectedChat.isGroupChat ? (
                      <div className='font-semibold cursor-pointer' onClick={() => setShowProfileModal(true)}>{getSender(user, selectedChat.users)}</div>
                    ) : (
                      <div className='flex items-center justify-between'>
                        <div className='font-semibold cursor-pointer' onClick={() => setShowProfileModal(true)}>
                          {selectedChat.chatName.toUpperCase()}
                        </div>
                        <BsThreeDotsVertical className='cursor-pointer' onClick={() => setShowUpdateGroupModal(true)} />
                      </div>
                    )
                  }
                </div>
                <div className="email text-sm">
                  {selectedChat && !selectedChat.isGroupChat ? getSenderEmail(user, selectedChat.users) : ''}
                </div>
              </div>
            </div>
            <hr className='mb-3' />
            <div className="chat-content h-full flex-1 overflow-y-scroll">
              {loading ? (
                <div role="status" className=' h-full flex items-center justify-center'>
                  <svg className="inline mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div className='h-[500px]'>
                  <ScrollableChat messages={messages} istyping={istyping} />
                </div>
              )}
            </div>
            
            <div className="chat-box py-5 flex items-center" onKeyDown={sendMessage}>
              <div className="mr-10 text-main-500 text-lg"><BsImage /></div>
              <input type="text" value={newMessage} onChange={typingHandler} className='flex-1 h-10 px-3 text-sm bg-[#E8E8E8] rounded-[24px] border border-[#E8E8E8] outline-none' placeholder='Type Message ...' />
              <div className="ml-10 text-main-500 text-lg" onClick={sendMessage}><BiSend /></div>
            </div>
          </div>
        </>
      ) : (
        <div className=" justify-center flex items-center h-full">
          <span className="text-2xl text-slate-700">
            Click on a user to start chatting
          </span>
        </div>
      )}


      {
        showUpdateGroupModal ?
          <UpdateGroupModal close={() => setShowUpdateGroupModal(false)} fetchMessage={fetchMessage} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          : null
      }

      {
        showProfileModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      {selectedChat && !selectedChat.isGroupChat ? getSender(user, selectedChat.users) : selectedChat.chatName}
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowProfileModal(false)}
                    >
                      <span className="bg-white text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        x
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-col justify-center">
                    <img src={selectedChat && !selectedChat.isGroupChat ? getSenderPic(user, selectedChat.users) : 'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'} className="w-32 rounded-full mx-auto" />
                    <div className="mt-5">Email: {selectedChat && !selectedChat.isGroupChat ? getSenderEmail(user, selectedChat.users) : ''}</div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowProfileModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowProfileModal(false)}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null
      }


    </>
  )
}

export default SingleChat