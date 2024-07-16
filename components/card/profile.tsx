import React from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { GET_JOBS_BY_ID } from '@/graphql/queries/jobs.queries';

interface ChildProp {
  imageSrc: StaticImport,
  name: String,
  email: String,
  phone: String,
}

const Profile: React.FC<ChildProp> = ({ imageSrc, name, email, phone }) => {
  const { accountId } = useParams<{ accountId: string }>();
  
  const { data, loading, error } = useQuery(GET_JOBS_BY_ID, {
    variables: {
      id: accountId,
    },
  });
  console.log(data);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center w-full justify-center bg-gray-100">
        <div className='bg-white body-font shadow-gray-500 shadow-xl w-full max-w-4xl rounded-xl overflow-hidden mb-4'>
          <div className='flex flex-col justify-start'>
            <div className='w-full flex justify-center mt-3'>
              <Image
                alt='profile'
                className='object-cover object-center rounded-full h-[100px] w-[100px] md:h-[150px] md:w-[150px] sm:h-[120px] sm:w-[120px]'
                src={imageSrc}
              />
            </div>
            <div className='w-full flex justify-center'>
              <div className='mb-4 w-full p-4 md:p-6'>
                <div className='flex py-2'>
                  <span className='text-black'>Name: </span>
                  <span className='ml-auto text-black'>{name}</span>
                </div>
                <div className='flex border-t border-gray-600 py-2'>
                  <span className='text-black'>Email: </span>
                  <span className='ml-auto text-black'>{email}</span>
                </div>
                <div className='flex border-t border-gray-600 py-2'>
                  <span className='text-black'>Phone: </span>
                  <span className='ml-auto text-black'>{phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white body-font shadow-gray-500 shadow-xl w-full max-w-4xl rounded-xl overflow-hidden mb-4'>
          <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4'>
            <div className='border-2 rounded-full flex justify-center p-2'>My Orders</div>
            <div className='border-2 rounded-full flex justify-center p-2'>My Jobs</div>
            <div className='border-2 rounded-full flex justify-center p-2'>Likes</div>
          </div>
        </div>

        <div className='bg-white body-font shadow-gray-500 shadow-xl w-full max-w-4xl rounded-xl overflow-hidden mb-4'>
          <div className='py-3 pl-3 border-b-2'>My Posts</div>
          <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 p-4'>
            <div className='bg-gray-400 p-5 border'>Hi</div>
            <div className='bg-gray-400 p-5 border'>Hi</div>
            <div className='bg-gray-400 p-5 border'>Hi</div>
            <div className='bg-gray-400 p-5 border'>Hi</div>
            <div className='bg-gray-400 p-5 border'>Hi</div>
            <div className='bg-gray-400 p-5 border'>Hi</div>
            <div className='bg-gray-400 p-5 border'>Hi</div>
            <div className='bg-gray-400 p-5 border'>Hi</div>
            <div className='bg-gray-400 p-5 border'>Hi</div>
            <div className='bg-gray-400 p-5 border'>Hi</div>
            <div className='bg-gray-400 p-5 border'>Hi</div>
            <div className='bg-gray-400 p-5 border'>Hi</div>
            <div className='bg-gray-400 p-5 border'>Hi</div>
            <div className='bg-gray-400 p-5 border'>Hi</div>
            <div className='bg-gray-400 p-5 border'>Hi</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
