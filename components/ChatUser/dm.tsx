import React from 'react'
import ChatUserlayout from './layout';

const ChatUser = () => {
  return (
    <div >
      <div className='font-semibold text-gray-700 text-sm'>Notifications</div>
      <div className='mt-[5%] flex flex-col gap-2'>
        <ChatUserlayout userName={'Sarth'} newMessages='3'/>
        <ChatUserlayout userName={'Nilay'} newMessages='1'/>
        <ChatUserlayout userName={'Yash'} newMessages='2'/>
        <ChatUserlayout userName={'Sarth'} newMessages='3'/>
        <ChatUserlayout userName={'Nilay'} newMessages='1'/>
        <ChatUserlayout userName={'Yash'} newMessages='2'/>
      </div>
    </div>
  )
}

export default ChatUser;
