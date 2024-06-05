'use client'
import React,{useState} from 'react'
import { FileAddFilled , AppstoreFilled , ShoppingFilled , UserOutlined , MailOutlined , InboxOutlined} from '@ant-design/icons';

interface ChildProp{
    setJobVisibility: React.Dispatch<React.SetStateAction<boolean>>
    setPostVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const LeftNavBar:React.FC<ChildProp> = ({setJobVisibility , setPostVisibility}) => {

  return (
    <div>
        <div className='text-gray-700 gap-2 bg-white'>
            <span className='cursor-pointer text-lg font-semibold flex flex-row gap-3' onClick={()=>setJobVisibility(true)}><span><FileAddFilled/></span>Create Job</span>
            <span className='cursor-pointer text-lg font-semibold flex flex-row gap-3' onClick={()=>setPostVisibility(true)}><span><AppstoreFilled/></span>Create Post</span>
            <span className='cursor-pointer text-lg font-semibold flex flex-row gap-3'><span><ShoppingFilled/></span>My Orders</span>
            <span className='cursor-pointer text-lg font-semibold flex flex-row gap-3'><span><UserOutlined/></span>My Account</span>
            <span className='cursor-pointer text-lg font-semibold flex flex-row gap-3'><span><MailOutlined/></span>Contact Us</span>
            <span className='cursor-pointer text-lg font-semibold flex flex-row gap-3'><span><InboxOutlined/></span>About Us</span>
        </div>
    </div>
  )
}

export default LeftNavBar;
