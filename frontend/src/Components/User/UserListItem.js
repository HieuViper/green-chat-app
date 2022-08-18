import React from 'react'

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div>
      {user && <div onClick={handleFunction} className='flex items-center cursor-pointer hover:bg-main-500 hover:text-white px-3 py-2 rounded-xl overflow-y-scroll'>
        <div className="pic mr-5">
          <img src={user.pic} alt={user.username} className="w-[30px] rounded-full" />
        </div>
        <div className="">
          <div className="name">
            {user.username}
          </div>
          <div className="email">
            {user.email}
          </div>
        </div>
      </div> 

      }
    </div>
  )
}

export default UserListItem