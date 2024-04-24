'use client'
import React from 'react'
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

const TopNavbar = () => {

  const router = useRouter()
  const href = window.location.href;
  console.log(window.location.href);

  return (
    <div className={`bg-white w-[100%] ${inter.className} font-semibold`}>
      <ul className='flex flex-row gap-[3%] justify-center'>
        <li className={`cursor-pointer hover:text-gray-700 text-gray-500 ${(href==='http://localhost:3000/jobs') ? 'text-red-600' : 'text-gray-500' }`} onClick={()=>{router.push('/jobs')}}>Job</li>
        <li>|</li>
        <li className='cursor-pointer hover:text-gray-700 text-gray-500 ' onClick={()=>{router.push('/posts')}}>Post</li>
        <li>|</li>
        <li className='cursor-pointer hover:text-gray-700 text-gray-500' onClick={()=>{router.push('/account')}}>Account</li>
      </ul>
    </div>  
  )
}

export default TopNavbar;

//! 1. If the user is on './posts' and he clicks on posts , the page should refresh , user router.refresh
//! 2. The Color of the navigation should be [#961638] for each respective page
//! 3. Replace the " | " with the logo of standing line
//! 4. remove the bottom white space , center the nav bar and add appropriate padding