"use client"
import React, { useEffect } from 'react';
import { useFirebaseAuthPersistence } from '@/hooks/useAuth';
import { UseAuth } from '@/hooks/useAuth';
import { Suspense } from 'react';
var NProgress = require('nprogress');

const Home = () => {

  // const auth = getAuth();
  // const user = auth.currentUser;
  // console.log(user);
  const{loading,user} = UseAuth();
  
  useFirebaseAuthPersistence();

  if(loading){
    return <div className='flex justify-center '>Loading...</div>
  }

  if(!user){
    return <div className='flex justify-center'>User not authenticated</div>
  }

  return(
    <>
    <Suspense fallback={<p>Loading</p>}>
    <div>
      Welcome , {user?.phoneNumber}
    </div>
    </Suspense>
    
    </>
  )
}

export default Home;
