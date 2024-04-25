'use client'
import React, { useState } from "react";
import IDF from "@/public/svgs/header.svg"
import Image from "next/image";
import Header from "@/components/Header/header";
import { LoadingProvider } from "@/context/loading";
import TopNavbar from "@/components/navbar/topnavbar";
import LeftNavBar from "@/components/navbar/leftNavBar";
import Createjob from "@/components/forms/createjob";
import CreatePost from "@/components/forms/createpost";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/users.queries";
import { useQuery } from "@apollo/client";

export default function HomeLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {

    const[jobApplicationVisibility , SetJobApplicationVisibility] = useState<boolean>(false);
    const[postApplicationVisibility , SetPostApplicationVisibility] = useState<boolean>(false);
    console.log(jobApplicationVisibility);
    const{data , loading , error} = useQuery(GET_AUTHENTICATED_USER);
    console.log(`authenticated user : `, data );
    console.log(error);
    console.log(`loading : `,loading);
    
    
    

    return (
      <>
      <LoadingProvider>
      <section className={`mt-[3.2%] bg-[#D9D9D9] relative`} >
        <div className=""> <Header/> </div>

        <div id='jobApplication' className={`${jobApplicationVisibility ? '' : 'hidden' } absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[40%] h-[70%] fle justify-center`}>
          <Createjob visibility={true}/>
        </div>

        <div id='postApplication' className={`${postApplicationVisibility ? '' : 'hidden'} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[40%] h-[70%] `}>
          <div className="w-full h-full  flex justify-center">
            <CreatePost visibility={true} />
          </div>
        </div>
        
        <div className="">
          <div id="header" className="h-20 justify-center">
              <div className="bg-white h-[90%] w-screen flex justify-center p-[0.4%] z-50">
                  <Image src={IDF} alt="" />
              </div>
          </div>
          <div className="">
            <div className='flex flex-row justify-between  gap-2 w-[100%]'>
                    <div className='bg-red-600  h-full p-4 shadow-xl' style={{width:'20%', background:'white' ,height: 'calc(100vh - 55px)' , position:'sticky',top: '55px'}}>
                      Connect Components 
                        <div className='bottom-0'>Bugs</div>
                        <div className="mt-auto"><LeftNavBar setJobVisibility={SetJobApplicationVisibility} setPostVisibility={SetPostApplicationVisibility}/></div>
                    </div>

                    <div className="h-full" style={{width:'60%'}} > 
                      <span className=""  style={{position:'sticky' , top:'55px'}}><TopNavbar/></span>
                      <span >{children}</span>
                    </div>
                    
                    <div className='text-red-700 font-bold right-0  p-4 shadow-xl' style={{width:'20%' , background:'white' ,height: 'calc(100vh - 55px)' , position:'sticky',top: '55px' , }}>Latest News</div>
            </div>
          </div>
        </div>
      </section>
      </LoadingProvider>
      </>
    )
  }
