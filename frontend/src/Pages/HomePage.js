import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import wallpaper from '../animation/wallpaper2.jpg'

const HomePage = () => {
  const history = useHistory()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    if (userInfo) {
      history.push('/chats')
    }
  }, [history])

  return (
    <div className='h-[100vh] relative flex items-center flex-col bg-wallpaper bg-cover bg-center justify-center' >
      {/* <img src="./wallpaper2.jpg" alt="" className=''/>  */}
      <div className="">
        <span className='uppercase text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#000000] via-[#52c234] to-[#000000] animate-text'>Green Chat</span>
        <div className="flex flex-col gap-3 mt-7 text-center">
          <Link to="/sign-up" className="shadow-[0_6px_0_rgb(0,0,0)] hover:shadow-[0_3px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all py-3 px-9 bg-white rounded-3xl font-semibold text-lg">Sign Up</Link>
          <Link to="/sign-in" className="shadow-[0_6px_0_rgb(0,0,0)] hover:shadow-[0_3px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all py-3 px-9 bg-white rounded-3xl font-semibold text-lg">Sign In</Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage