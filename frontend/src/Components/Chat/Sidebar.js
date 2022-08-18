import React, { useEffect, useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdAdd } from 'react-icons/md'
import { CgSearch } from 'react-icons/cg'
import MyChat from './MyChat'
import MyProfile from './MyProfile'
import toast from 'react-hot-toast'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import GroupChatModal from './GroupChatModal'
import { getSender, getSenderPic } from '../../config/ChatLogics'
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';

const Sidebar = ({ fetchAgain }) => {
  const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchResult, setSearchResult] = useState([])
  const [loadingChat, setLoadingChat] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showNoti, setShowNoti] = useState(false)

  useEffect(() => {
    if (!search) {
      toast('Search A Friend to Chat', {
        icon: '✌️',
      });
      return
    }

    const fetchSearch = async () => {
      try {
        setLoading(true)
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }

        const { data } = await axios.get(`/api/user?search=${search}`, config)

        setLoading(false)
        setSearchResult(data)
      } catch (err) {
        toast.error('Error Occured!!!')
        return
      }
    }

    fetchSearch()

  }, [search])

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      toast.error('Error Occured!!!')
      return
    }
  };

  // console.log(notification);

  return (
    <div className='flex flex-col bg-[#FAFAFA] h-[100vh] px-6'>
      <div className="header text-main-500 mb-16 text-3xl mt-6 font-bold select-none">
        Green Chat
      </div> {/* End of logo */}

      <div className="action flex mb-6 items-center gap-2">
        <div className=" flex-1 text-xl font-semibold">
          Messages
        </div>

        <div className="relative flex flex-col items-center group">
          <div className="notification relative text-2xl cursor-pointer" onClick={() => setShowNoti(!showNoti)}>
            <NotificationBadge
              style={{ top: -10, right: -6 }}
              count={notification.length}
              effect={Effect.SCALE}
            />
            <IoMdNotificationsOutline />
            {showNoti ? (
              <div className="absolute top-[30px] min-w-[300px] z-10 bg-white rounded-xl text-sm">
                {!notification.length && "No New Messages"}
                <div className="flex flex-col">
                  {notification.map((notif) => (
                    <div className='font-semibold hover:bg-slate-50 p-3 rounded-xl flex items-center'
                      key={notif._id}
                      onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotification(notification.filter((n) => n !== notif));
                      }}
                    >
                      {
                        notif.chat.isGroupChat
                          ? <img className='w-6 rounded-full mr-3' src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg" alt="" />
                          : <img className='w-6 rounded-full mr-3' src={getSenderPic(user, notif.chat.users)} />
                      }
                      {notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${getSender(user, notif.chat.users)}`
                      }
                    </div>
                  ))}
                </div>
              </div>
            ) : (<></>)}
          </div>
          <div className="absolute bottom-0 flex flex-col items-center hidden mb-9 group-hover:flex">
            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-nowrap bg-black shadow-lg">You have {notification.length} new messages</span>
            <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
          </div>
        </div> {/* End of notification */}

        <div className="relative flex flex-col items-center group">
          <div className="text-2xl p-1 rounded-full bg-green-400 cursor-pointer hover:opacity-50" onClick={() => setShowModal(true)}><MdAdd /></div>
          <div className="absolute bottom-0 flex flex-col items-center hidden mb-9 group-hover:flex">
            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-nowrap bg-black shadow-lg">Create new Group Chat !</span>
            <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
          </div>
        </div> {/* End of create a chat */}
      </div> {/* End of action */}

      <div className="search mb-7 relative">
        <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#C7C3C3]"><CgSearch /></div>
        <input type="text" placeholder='Search...' onChange={e => setSearch(e.target.value)} className='px-9 text-sm py-2 w-[250px] bg-[#E8E8E8] rounded-3xl border-[#E8E8E8] border outline-none placeholder:text-[#C7C3C3]' />
      </div> {/* End of search */}

      <div className="flex-1">
        <MyChat fetchAgain={fetchAgain} loading={loading} search={search} searchResult={searchResult} handleFunction={accessChat} loadingChat={loadingChat} />
      </div> {/* End of MyChat */}

      <div className="pb-5">
        <MyProfile />
      </div> {/* End of MyProfile */}

      {showModal ? <GroupChatModal close={() => setShowModal(false)} /> : null}
    </div>
  )
}

export default Sidebar