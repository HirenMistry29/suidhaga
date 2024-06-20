import React from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface ChildProp {
    imageSrc: StaticImport,
    name: String,
    email: String,
    phone: String,
}
const Profile: React.FC<ChildProp> = ({ imageSrc, name, email, phone }) => (
    <div className='bg-white body-font shadow-gray-500 shadow-xl rounded-xl overflow-hidden mb-4 h-screen'>
        <div className='flex flex-col justify-start mt-5'>
            <div className='w-full flex justify-center mt-3'>
                <Image
                    alt='profile'
                    className='object-cover object-center rounded-full h-[100%] w-[25%]'
                    src={imageSrc}
                />
            </div>
            <div className='w-full flex justify-center mt-3'>
                <div className='mb-4 md:w-3/5 md:rounded-r-xl p-4 md:p-6'>
                    {/* <p className='text-gray-600 mb-2'>{email}</p> */}
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
);

export default Profile;