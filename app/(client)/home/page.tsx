"use client"
import React, { useEffect } from 'react';
import { useFirebaseAuthPersistence } from '@/hooks/useAuth';
import { UseAuth } from '@/hooks/useAuth';
import { Suspense } from 'react';
var NProgress = require('nprogress');
import { useQuery } from '@apollo/client';
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/users.queries"

const Home = () => {
  const{ loading , data , error } = useQuery(GET_AUTHENTICATED_USER);
  console.log(loading);
  console.log("Authenticated User: ", data);
  console.log(error);
  

  // const{load,user} = UseAuth();
  useFirebaseAuthPersistence();

  // if(loading){
  //   return <div className='flex justify-center '>Loading...</div>
  // }

  // if(!user){
  //   return <div className='flex justify-center'>User not authenticated</div>
  // }

  return(
    <>
    <Suspense fallback={<p>Loading</p>}>
    {/* <div>
      Welcome , {user?.phoneNumber}
    </div> */}
    </Suspense>
    
    </>
  )
}

export default Home;
