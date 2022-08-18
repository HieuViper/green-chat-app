import React from 'react'
import { TiDeleteOutline } from 'react-icons/ti'

const UserBadgeItem = ({user, handleFunction}) => {
  return (
    <div className='bg-emerald-500 text-sm mr-2 py-1 px-2 rounded-xl flex items-center gap-1 select-none text-white mb-1'>
      {user.username}
      <TiDeleteOutline className='cursor-pointer text-lg hover:text-slate-500' onClick={handleFunction}/>
    </div>
  )
}

export default UserBadgeItem