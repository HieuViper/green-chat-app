import axios from 'axios'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../User/UserBadgeItem'
import UserListItem from '../User/UserListItem'

const GroupChatModal = ({ close }) => {
  const [groupChatName, setGroupChatName] = useState()
  const [selectedUser, setSelectedUser] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const { user, chats, setChats } = ChatState()

  const handleSearch = async (query) => {
    setSearch(query)
    if (!query) {
      return
    }

    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/user/?search=${search}`, config)
      setLoading(false)
      setSearchResult(data)
    } catch (err) {
      toast.error('Error Occured!!!')
      return
    }

  }
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUser) {
      toast.error('Please fill all the field!')
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUser.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      close()
      toast.success('Create New Group Chat Successfully !!!')
    } catch (error) {
      toast.error('Error Occured !!!')
      return
    }
  }
  const handleDelete = (delUser) => {
    setSelectedUser(selectedUser.filter(sel => sel._id !== delUser._id))
  }
  const handleGroup = (userToAdd) => {
    if (selectedUser.includes(userToAdd)) {
      toast.error('User already added')
      return
    }
    setSelectedUser([...selectedUser, userToAdd])
  }

  return (
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
                Create Group Chat
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={close}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto ">
              <form action="" className='flex flex-col'>
                <input type="text" className='bg-slate-200 text-sm outline-none rounded-xl p-3 mb-1' placeholder='Group Name' onChange={(e) => setGroupChatName(e.target.value)} />
                <input type="text" className='bg-slate-200 text-sm outline-none rounded-xl p-3 mb-1' placeholder='Add User...' onChange={(e) => handleSearch(e.target.value)} />

                <div className='flex flex-wrap max-w-[320px]'>
                  {selectedUser.map((user) => (
                    <UserBadgeItem key={user._id} user={user} handleFunction={() => handleDelete(user)} />
                  ))}
                </div>

                {loading ? (
                  <div>Loading...</div>
                ) : (
                  searchResult?.slice(0, 4).map((user) => (
                    <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                  ))
                )}
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={close}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default GroupChatModal