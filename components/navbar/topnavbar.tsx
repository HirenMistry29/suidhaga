'use client'
import React, { useEffect } from 'react'
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });


const TopNavbar = () => {

  const router = useRouter()
  const href = window.location.href;

  useEffect(() => {
    setInterval(() => {
      const href = window.location.href
    },2000)
    return () => {
      clearInterval( href)
    }
  },[2000])


  return (
    <div className={`justify-center bg-white font-semibold items-start w-full rounded-sm ${inter.className}`}>
      <ul className='flex flex-row gap-[10%] justify-center '>
        <li className={`cursor-pointer text-gray-700 hover:text-gray-500 ${(href==='http://localhost:3000/jobs') ? 'text-red-600' : 'text-gray-500' }`} onClick={()=>{router.push('/jobs')}}>Job</li>
        <li>|</li>
        <li className={`cursor-pointer text-gray-700  hover:text-gray-500  ${(href==='http://localhost:3000/posts') ? 'text-red-600' : 'text-gray-500' }`} onClick={()=>{router.push('/posts')}}>Post</li>
        <li>|</li>
        <li className={`cursor-pointer text-gray-700 hover:text-gray-500  ${(href==='http://localhost:3000/account') ? 'text-red-600' : 'text-gray-500' }`} onClick={()=>{router.push('/account')}}>Account</li>
      </ul>
    </div>  
  )
}

export default TopNavbar;

//! 1. If the user is on './posts' and he clicks on posts , the page should refresh , user router.refresh
//! 2. The Color of the navigation should be [#961638] for each respective page
//! 3. Replace the " | " with the logo of standing line
//! 4. remove the bottom white space , center the nav bar and add appropriate padding