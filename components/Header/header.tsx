"use client"
import React, { useState } from "react";
import {auth} from "@/firebase/setup";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from '@/hooks/useRoute';
import { useMutation } from "@apollo/client";
import { LOGOUT } from "@/graphql/mutations/users.mutations";

interface ChildProp {
    userType : String
}


const Header:React.FC<ChildProp> = ({userType}) => {

    const route = useNavigate();
    const[logout , {loading}] = useMutation(LOGOUT);
    const logOut= async()=>{
        try {
           await logout().then(()=>{toast.success(`user logged out`)})
           
        } catch (error) {
            console.log(error);
            toast.error(`could not logout`)
            
        }
        
    }


    return(
        <>
            <div className="flex fixed top-0 flex-row w-screen bg-gradient-to-r from-[#00154F] to-[#1743B9] via-[#172651] px-[2%] py-[0.7%] justify-between text-white">
                <div className="font-bold text-xl">
                    Suidhaga
                </div>
                <div className="flex flex-row gap-4">
                    { userType==='Admin' && <span className="flex flex-row gap-4"> <span onClick={()=>route('/admin')} className="cursor-pointer hover:text-[#C7C7C7] ">Admin</span>
                    <span>|</span></span> }
                    <span onClick={()=>route('/auth/login')} className="cursor-pointer hover:text-[#C7C7C7] ">login</span>
                    <span>|</span>
                    <span onClick={logOut} className="cursor-pointer hover:text-[#c7c7c7] ">logout</span>
                </div>
            </div>
        </>
    )
}

export default Header;