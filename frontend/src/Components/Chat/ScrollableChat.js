import React from 'react'
import Lottie from 'react-lottie'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMarginLeft, isSameUser } from '../../config/ChatLogics'
import animationData from '../../animation/typing/typing.json'
import { ChatState } from '../../Context/ChatProvider'

const ScrollableChat = ({ messages, istyping }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { user } = ChatState()

  return (
    <ScrollableFeed>
      {messages && messages.map((m, i) => (
        <div className='flex items-center' key={m._id}>
          {
            // <div className="">{m.content}</div>
            (isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <div className="">
                <img src={m.sender.pic} className="w-[30px] h-[30px] rounded-full mr-2" />
              </div>
            )
          }
          <span className={`${m.sender._id === user._id ? "bg-main-500 text-white" : "bg-[#F5F5F5]"} px-5 py-2 rounded-xl`}
            style={{
              marginLeft: `${isSameSenderMarginLeft(messages, m, i, user._id)}`,
              marginTop: `${isSameUser(messages, m, i, user._id) ? '3px' : '10px'}`
            }}
          >{m.content}</span>
        </div>
      ))}
      {istyping ? (<div>
        <Lottie options={defaultOptions}
          height={90}
          width={60}
          style={{ marginLeft: 0 }} />
      </div>) : (<></>)}
    </ScrollableFeed>
  )
}

export default ScrollableChat