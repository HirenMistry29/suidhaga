import React, { useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import toast from 'react-hot-toast'

interface ChildProp{
  isOpen : boolean
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
  imageSrc : StaticImport
  title : string
}

const CommentCard:React.FC<ChildProp> = ({isOpen , setIsOpen , imageSrc , title}) => {
  const[comment , setComment] = useState('');
  return (
   isOpen && ( 
   <div>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 w-[40%] flex flex-col">
            <div className='flex justify-between border-b border-gray-400 '>
              Comments
              <CloseOutlined className='hover:font-bold hover:text-lg' onClick={() =>setIsOpen(false) }/>
            </div>
            
            <div className='flex flex-row mt-[2%] border-b border-gray-400 pb-[2%]'>
              <Image
                alt='ecommerce'
                className='w-[15%] h-[25%]'
                src={imageSrc}
              />
              <span className='ml-[4%] font-semibold'>{title}</span>
            </div>
            <div className='flex flex-row mt-[2%] gap-[2%] pb-[2%]'>
              <input
              type='text'
              placeholder='My Comment'
              name='comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='border-none rounded-md outline-none w-full bg-gray-100 px-[2%]' 
              maxLength={20}
              />
              <button onClick={()=>toast.success(`${comment}`)} className='py-[2%] px-[4%] rounded-md bg-[#C84869] hover:bg-[#961638] text-white '>Upload</button>
            </div>
            <div className='text-sm px-[2%]'>
              <div className='flex flex-row'><span className='text-sm font-semibold pr-[2%]'>Nikhil  </span>Beautifull</div>
              <div className='flex flex-row'><span className='text-sm font-semibold pr-[2%]'>Aditya  </span>Amazing</div>
          </div>
          </div>
         
        </div>
    </div>)
  )
}

export default CommentCard;
