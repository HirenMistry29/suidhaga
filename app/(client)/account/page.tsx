import React from 'react'
import Profile from '@/components/card/profile';
import ProfileImage from '@/public/image/man.jpg'

const Account = () => {
  return (
    <div>
      <Profile imageSrc={ProfileImage} name={'Nikhil'} email={'abc@xyz.com'} phone={'1234657980'} />
    </div>
  )
}

export default Account;

//! 1. Refer the figma design