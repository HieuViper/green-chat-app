import React, { useState } from 'react'
import { FaUser, FaLock } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { RiImageAddFill } from 'react-icons/ri';
import { Link, useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios'

const CLOUDINARY_URL = "cloudinary://659183248147824:tbn80qDIeVwIoH3-lJk7mojcYtQ@hieuviper"

const SignUp = () => {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [pic, setPic] = useState()
  const history = useHistory()

  const handlePostImage = (pics) => {
    if (pics === undefined) {
      toast.error('Please upload your picture')
      return
    }
    if (pics.type === 'image/jpeg' || pics.type === 'image/png' || pics.type === 'image/jpg') {
      const data = new FormData()
      data.append("file", pics)
      data.append("upload_preset", "mern-chat-app")
      data.append("cloud_name", "hieuviper")
      const upload_image = fetch('https://api.cloudinary.com/v1_1/hieuviper/image/upload', {
        method: 'POST',
        body: data
      }).then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString())
        })
        .catch(err => {
          console.log(err.message);
        })
      toast.promise(upload_image, {
        loading: 'Loading...',
        success: 'Upload Picture Successfully !!!',
        error: 'Error when fetching',
      });
    } else {
      toast.error('Please upload your picture')
      return
    }
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!username || !email || !password || !confirmPassword) {
      toast.error('Please Fill All The Fields!')
      return
    }
    if(!validateEmail(email)){
      toast.error('Email is Invalid')
      return
    }
    if(password !== confirmPassword) {
      toast.error('Password Does Not Match')
      return
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/user/sign-up",
        {username, email, password, pic},
        config
      )
      toast.success('Register Successfully !!!')
      
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
            <div className="text-2xl mt-10 text-center font-semibold">Register</div>
            <img src="/2.png" alt="" className='h-[70px] absolute z-10 -rotate-45 -bottom-2 right-6' />
            <div className='text-center text-xs text-[#8B8B8B]'>Create your new account</div>
          </div>
          <div className="body mt-5 px-5">
            <div className="relative">
              <i className='absolute z-10 top-1/2 left-4 -translate-y-1/2 text-[#17482E]'><FaUser /></i>
              <input type="text" className='relative py-4 pl-12 w-full bg-[#EBF2F0] rounded-xl text-sm outline-none placeholder-[#1d5537]' onChange={(e) => setUsername(e.target.value)} placeholder='UserName' />
            </div>
            <div className="relative mt-3">
              <i className='absolute z-10 top-1/2 left-4 -translate-y-1/2 text-[#17482E]'><HiMail /></i>
              <input type="email" className='relative py-4 pl-12 w-full bg-[#EBF2F0] rounded-xl text-sm outline-none placeholder-[#1d5537]' onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            </div>
            <div className="relative mt-3">
              <i className='absolute z-10 top-1/2 left-4 -translate-y-1/2 text-[#17482E]'><FaLock /></i>
              <input type="password" className='relative py-4 pl-12 w-full bg-[#EBF2F0] rounded-xl text-sm outline-none placeholder-[#1d5537]' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            </div>
            <div className="relative mt-3">
              <i className='absolute z-10 top-1/2 left-4 -translate-y-1/2 text-[#17482E]'><FaLock /></i>
              <input type="password" className='relative py-4 pl-12 w-full bg-[#EBF2F0] rounded-xl text-sm outline-none placeholder-[#1d5537]' onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
            </div>
            <div className="relative mt-3">
              <i className='absolute z-10 top-1/2 left-4 -translate-y-1/2 text-[#17482E]'><RiImageAddFill /></i>
              <input type="file" className='relative py-4 pl-12 w-full bg-[#EBF2F0] rounded-xl text-sm outline-none placeholder-[#1d5537]' placeholder='Confirm Password' accept='image/*' onChange={(e) => handlePostImage(e.target.files[0])} />
            </div>
            <div className="flex justify-between mt-6">
              <div className='text-xs text-[#17482E] hover:text-[#216541] text-center'>
                <span className='text-[#8B8B8B]'>By signing up you've agree to </span>
                <span className='text-[#17482E] font-semibold cursor-pointer'>Our Terms of Use And Privacy Notice</span>
              </div>
            </div>
          </div>
          <div className="submit px-5 mt-8">
            <button type='submit' className='w-full bg-[#426E52] rounded-[100px] p-3 text-white text-sm hover:bg-[#3c634c] transition-all ease-linear duration-300' onClick={handleSubmit}>Sign up</button>
            <div className="mt-3 flex items-center text-center justify-center">
              <div className="text-sm text-[#8B8B8B]">Already have an account?</div>
              {/* <a href='/register' className='text-sm text-[#17482E] font-semibold underline cursor-pointer hover:opacity-70'>Sign up</a> */}
              <Link to='/sign-in' className='text-sm text-[#17482E] font-semibold underline cursor-pointer hover:opacity-70'>Login</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp