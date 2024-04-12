"use client"
import React, { useEffect } from 'react';
import {getAuth} from "firebase/auth"
import { auth } from "@/firebase/setup"
import { useFirebaseAuthPersistence } from '@/hooks/useAuth';
import { UseAuth } from '@/hooks/useAuth';

const Home = () => {

  // const auth = getAuth();
  // const user = auth.currentUser;
  // console.log(user);
  const{loading,user} = UseAuth();
  
  useFirebaseAuthPersistence();

  if(loading){
    return <div>Loading...</div>
  }

  if(!user){
    return <div>User not authenticated</div>
  }

  return(
    <>
    <div>
      Welcome , {user.phoneNumber}
    </div>
    </>
  )
}

export default Home;
