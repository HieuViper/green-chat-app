import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { useHistory } from 'react-router-dom'
import { ChatState } from '../../Context/ChatProvider'

const MyProfile = () => {
  const { user } = ChatState()
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory()
  const handleOption = () => {
    setIsActive(!isActive);
  }

  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    history.push('/')
  }


  return (
    <div className='flex items-center'>
      <div className="avatar ">
        <img src={user.pic} alt="" className='w-[36px] h-[36px] rounded-full' />
      </div>
      <button className="username flex flex-col flex-1 ml-4" onClick={() => setShowModal(true)}>
        <div className="name text-sm" >{user.username}</div>
        <div className="tag text-sm">@{user.username}</div>
      </button>
      <div className="option relative">
        <div className="cursor-pointer" onClick={handleOption}><BsThreeDots /></div>
        <div ref={dropdownRef} id='modal-option' className={`${isActive ? '' : 'hidden'} z-30 absolute flex flex-col bg-white -top-20 -left-4 w-[120px] text-center rounded-md`}>
          <button className="w-full hover:bg-green-300  block whitespace-nowrap py-1 rounded-t-md" onClick={() => setShowModal(true)}>My Profile</button>
          <button className=" hover:bg-green-300 py-1 rounded-b-md" onClick={handleLogout}>Log Out</button>
        </div>
      </div>

      {showModal ? (
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
                    {user.username}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-white text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-col justify-center">
                  <img src={user.pic} alt={user.username} className="w-32 rounded-full mx-auto"/>
                  <div className="mt-5">Email: {user.email}</div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}


export default MyProfile