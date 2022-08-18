import React, { useEffect, useState } from 'react'
import { FaUser, FaLock } from 'react-icons/fa';
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Link, useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios'

const SignIn = () => {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const history = useHistory()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    if (userInfo) {
      history.push('/chats')
    }
  }, [history])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!email || !password) {
      toast.error('Please Fill All The Fields!')
      return
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/user/sign-in",
        {email, password},
        config
      )
      toast.success('Login Successfully !!!')
      
      localStorage.setItem('userInfo', JSON.stringify(data))

      history.push('/chats')
      window.location.reload(); 
    } catch (err) {
      toast.error('Error Occured !')
      return
    }
  }

  return (
    <div className='font-Poppins'>
      <div className="wrapper min-h-[100vh] bg-[#f0f4ef] flex justify-center items-center">
        <form className="from-sign-in h-[600px] w-[400px] bg-white rounded-2xl ">
          <div className="header relative">
            <img src="/13.jpg" alt="" className='rounded-t-2xl h-[200px] w-full' style={{ borderRadius: "4% 4% 79% 21% / 8% 7% 69% 40%  " }} />
            <div className="text-2xl mt-10 text-center">Welcome back</div>
            <img src="/2.png" alt="" className='h-[70px] absolute z-10 -rotate-45 -bottom-2 right-6' />
            <div className='text-center text-xs text-[#8B8B8B]'>Login to your account</div>
          </div>
          <div className="body mt-5 px-5">
            <div className="relative">
              <i className='absolute z-10 top-1/2 left-4 -translate-y-1/2 text-[#17482E]'><FaUser /></i>
              <input type="email" className='relative py-4 pl-12 w-full bg-[#EBF2F0] rounded-xl text-sm outline-none placeholder-[#1d5537]' onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            </div>
            <div className="relative mt-3">
              <i className='absolute z-10 top-1/2 left-4 -translate-y-1/2 text-[#17482E]'><FaLock /></i>
              <input type="password" className='relative py-4 pl-12 w-full bg-[#EBF2F0] rounded-xl text-sm outline-none placeholder-[#1d5537]' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            </div>
            <div className="flex justify-between mt-4">
              <div className='text-xs text-[#17482E] flex items-center gap-1 cursor-pointer hover:text-[#216541]'>
                <BsFillCheckCircleFill />
                Remember me
              </div>
              <div className='text-xs text-[#17482E] cursor-pointer hover:text-[#216541]'>Forget password?</div>
            </div>
          </div>
          <div className="submit px-5 mt-12">
            <button type='submit' className='w-full bg-[#426E52] rounded-[100px] p-3 text-white text-sm hover:bg-[#3c634c] transition-all ease-linear duration-300' onClick={handleSubmit}>Login</button>
            <div className="mt-3 flex items-center text-center justify-center">
              <div className="text-sm text-[#8B8B8B]">Don't have your account?</div>
              {/* <a href='/register' className='text-sm text-[#17482E] font-semibold underline cursor-pointer hover:opacity-70'>Sign up</a> */}
              <Link to='/sign-up' className='text-sm text-[#17482E] font-semibold underline cursor-pointer hover:opacity-70'>Sign up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn