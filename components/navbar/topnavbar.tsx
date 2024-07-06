'use client'
import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/users.queries";
import { useQuery } from "@apollo/client";

const inter = Inter({ subsets: ["latin"] });

const TopNavbar = () => {
  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);
  const router = useRouter();
  const [accountId, setAccountId] = useState<string | undefined>();

  useEffect(() => {
    if (!loading && data?.authUser?._id) {
      const userAccountId = data.authUser._id;
      console.log(userAccountId);
      setAccountId(userAccountId);
    }
  }, [data, loading]);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={`bg-white w-[100%] rounded-md ${inter.className} font-semibold pt-1 px-1 `}>
      <ul className='flex flex-row xl:gap-[15%] gap-[10%] justify-center'>
        <li
          className={`cursor-pointer hover:text-gray-700 text-gray-500 ${currentUrl === 'http://localhost:3000/jobs' ? 'text-red-600' : 'text-gray-500'}`}
          onClick={() => { router.push('/jobs') }}
        >
          Job
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer hover:text-gray-700 text-gray-500 ${currentUrl === 'http://localhost:3000/posts' ? 'text-red-600' : 'text-gray-500'}`}
          onClick={() => { router.push('/posts') }}
        >
          Post
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer hover:text-gray-700 text-gray-500 ${currentUrl === `http://localhost:3000/account/${accountId}` ? 'text-red-600' : 'text-gray-500'}`}
          onClick={() => { accountId && router.push(`/account/${accountId}`) }}
        >
          Account
        </li>
      </ul>
    </div>
  );
}

export default TopNavbar;
