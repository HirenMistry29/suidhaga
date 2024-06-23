import React from 'react';
import Image from 'next/image'; 
import { LikeOutlined,CommentOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useRouter } from 'next/navigation';

interface ChildProp {
    imageSrc    :StaticImport,
    title       :String, 
    details     :String, 
    color       :String, 
    size        :String, 
    quantity    :String, 
    price       :String,
    id          :String,
}
const JobCard:React.FC<ChildProp> = ({id, imageSrc, title, details, color, size, quantity, price }) => {
    
  
  const router = useRouter();

  return(
    <div className='bg-white body-font shadow-gray-500 shadow-xl rounded-xl overflow-hidden mb-4 lg:h-[calc(100vh-48vh)] h-full z-[80px]'>
    <div className='flex flex-col md:flex-row'>
      <div className='md:w-2/5 lg:w-[80%] '>
        <Image
          alt='ecommerce'
          className='w-full object-cover object-center rounded-t-xl md:rounded-l-xl  md:rounded-t-none h-[100%]'
          src={imageSrc}
        />
      </div>
      <div className='md:w-3/5 md:rounded-r-xl p-4 md:p-6'>
        <h2 onClick={()=>router.push(`/jobs/${id}`)} className='text-sm cursor-pointer font-sans text-black font-bold tracking-widest text-xl mb-2'>
          {title}
        </h2>
        <div className='mb-4'>
          <p className='text-gray-600 mb-2'>{details}</p>
          <div className='flex border-t border-gray-600 py-2'>
            <span className='text-black'>Color: </span>
            <span className='ml-auto text-black'>{color}</span>
          </div>
          <div className='flex border-t border-gray-600 py-2'>
            <span className='text-black'>Size: </span>
            <span className='ml-auto text-black'>{size}</span>
          </div>
          <div className='flex border-t border-b mb-6 border-gray-600 py-2'>
            <span className='text-black'>Quantity: </span>
            <span className='ml-auto text-black'>{quantity}</span>
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center'>
          <span className='title-font font-medium text-2xl text-black mb-2 md:mb-0 md:mr-4'>
            ${price}
          </span>
          <div className='flex items-center md:ml-auto'>
            {/* <span onClick={() => toast.success(`Post Liked`)}>
              <LikeOutlined className='text-3xl px-2 hover:text-[#A72447] cursor-pointer' />
            </span>
            <CommentOutlined className='text-3xl px-2 hover:text-[#A72447] cursor-pointer' /> */}
            <button className='ml-2 w-full bg-[#C84869] border-2 py-2 px-6 focus:outline-none hover:bg-[#A72447] rounded text-white font-semibold'
             onClick={()=>toast.success(`Applied for the job`)}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);}

export default JobCard;