'use Client'
import React from 'react'
import NewImage from '@/public/image/photo-1584184924103-e310d9dc82fc.avif'
import Image from 'next/image'
import { LikeOutlined , CommentOutlined} from '@ant-design/icons'
import toast from 'react-hot-toast'

const Post = () => {
  function handleLike(){
    toast.success('Post Like')
  }
  return (
    <>
    <section
      style={{ backgroundColor: 'white' }}
      className='text-red-400 bg-gray-900 body-font shadow-gray-500 shadow-xl rounded-xl overflow-hidden mb-4 h-full'
    >
      <div className='px-2 py-2 mx-auto flex flex-row'>
        <div className='lg:w-4/5 mx-auto flex flex-col'>
          <Image
            alt='ecommerce'
            className='lg:w-full h-[49%] object-cover object-center rounded-xl'
            src={NewImage}
          />
          </div>
          <div>
          <div className='lg:w-full w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 p-4'>
            <h2 className='text-sm title-font text-black font-bold tracking-widest'>
              TITLE
            </h2>
            <div className='flex mb-4'>
              <a className='flex-grow text-black border-b-2 border-blue-400 py-2 text-lg px-1'>
                Details:
              </a>
            </div>
            <p className='leading-relaxed mb-4 text-gray-600'>
              Required to build xyz items using xyz materials.
            </p>
            <div className='flex border-t border-gray-600 py-2'>
              <span className='text-black'>Color: </span>
              <span className='ml-auto text-black'>Blue</span>
            </div>
            <div className='flex border-t border-gray-600 py-2'>
              <span className='text-black'>Size: </span>
              <span className='ml-auto text-black'>Medium</span>
            </div>
            <div className='flex border-t border-b mb-6 border-gray-600 py-2'>
              <span className='text-black'>Quantity: </span>
              <span className='ml-auto text-black'>4</span>
            </div>
            <div className='flex flex-col'>
              <span className='title-font font-medium text-2xl text-black'>
                $58.00
              </span>
              </div>
              <div className='flex flex-row items-center'>
              <LikeOutlined className='text-3xl px-2 hover:text-[#A72447] cursor-pointer'></LikeOutlined>
              <CommentOutlined className='text-3xl px-2 hover:text-[#A72447] cursor-pointer'></CommentOutlined>
              <button className=' ml-2 w-full text-black bg-[#C84869] border-2 py-2 px-6 focus:outline-none hover:bg-[#A72447] rounded text-white font-semibold'>
                Buy
              </button>
              </div>
              
              {/* <button className='rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
                <svg
                  fill='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                >
                  <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'></path>
                </svg>
              </button> */}
            </div>
          </div>
        </div>
        </section>
        <section
      style={{ backgroundColor: 'white' }}
      className='text-red-400 bg-gray-900 body-font shadow-gray-500 shadow-xl rounded-xl overflow-hidden mb-4 h-full'
    >
      <div className='px-2 py-2 mx-auto flex flex-row'>
        <div className='lg:w-4/5 mx-auto flex flex-col'>
          <Image
            alt='ecommerce'
            className='lg:w-full h-[49%] object-cover object-center rounded-xl'
            src={NewImage}
          />
          </div>
          <div>
          <div className='lg:w-full w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 p-4'>
            <h2 className='text-sm title-font text-black font-bold tracking-widest'>
              TITLE
            </h2>
            <div className='flex mb-4'>
              <a className='flex-grow text-black border-b-2 border-blue-400 py-2 text-lg px-1'>
                Details:
              </a>
            </div>
            <p className='leading-relaxed mb-4 text-gray-600'>
              Required to build xyz items using xyz materials.
            </p>
            <div className='flex border-t border-gray-600 py-2'>
              <span className='text-black'>Color: </span>
              <span className='ml-auto text-black'>Blue</span>
            </div>
            <div className='flex border-t border-gray-600 py-2'>
              <span className='text-black'>Size: </span>
              <span className='ml-auto text-black'>Medium</span>
            </div>
            <div className='flex border-t border-b mb-6 border-gray-600 py-2'>
              <span className='text-black'>Quantity: </span>
              <span className='ml-auto text-black'>4</span>
            </div>
            <div className='flex flex-col'>
              <span className='title-font font-medium text-2xl text-black'>
                $58.00
              </span>
              </div>
              <div className='flex flex-row items-center'>
              <LikeOutlined className='text-3xl px-2 cursor-pointer hover:text-[#A72447] '></LikeOutlined>
              <CommentOutlined className='text-3xl px-2 cursor-pointer hover:text-[#A72447] ]'></CommentOutlined>
              <button className=' ml-2 w-full text-black bg-[#C84869] border-2 py-2 px-6 focus:outline-none hover:bg-[#A72447] rounded text-white font-semibold'>
                Buy
              </button>
              </div>
              
              {/* <button className='rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
                <svg
                  fill='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                >
                  <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'></path>
                </svg>
              </button> */}
            </div>
          </div>
        </div>
        </section>   
    </>
  )
}

export default Post;

//! 1. Add a sample data : [post image , title , description , amount and add a button to like and comment the post]
//! 2. show the comments of the post on clicking the show comments button 
//! 3. if there are too many comments add 'load more' option
//! 4. Each post should have its own white-bg and add gap between each jobs
