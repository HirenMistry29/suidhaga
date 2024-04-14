"use client"
import React from "react";
import {auth} from "@/firebase/setup";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from '@/hooks/useRoute';

const Header = () => {

    const route = useNavigate();

    const logout=()=>{
        if(auth.currentUser){
            signOut(auth)
            .then(()=>{toast.success('User Loged out')})
            .catch((err)=>{
                console.log(err);
            });
        }
        if(!auth.currentUser){
            toast.error('user is not signed in');
        }
        
    }


    return(
        <>
            <div className="fixed top-0 flex flex-row w-screen bg-gradient-to-r from-[#00154F] to-[#1743B9] via-[#172651] px-[2%] py-[0.7%] justify-between text-white">
                <div className="font-bold text-xl">
                    Suidhaga
                </div>
                <div className="flex flex-row gap-4">
                    <span onClick={()=>route('/auth/register')} className="cursor-pointer hover:text-[#C7C7C7] ">login</span>
                    <span>|</span>
                    <span onClick={logout} className="cursor-pointer hover:text-[#c7c7c7] ">logout</span>
                </div>
            </div>
        </>
    )
}

export default Header;