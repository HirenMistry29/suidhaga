import React from "react";
import IDF from "@/public/svgs/header.svg"
import Image from "next/image";
import Header from "@/components/Header/header";
import { LoadingProvider } from "@/context/loading";


export default function HomeLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
      <LoadingProvider>
      <section className=" bg-[#D9D9D9]">
        <div className=""> <Header/> </div>
        <div className="">
        <div id="header" className="h-20 justify-center">
            <div className="bg-white h-[90%] w-screen flex justify-center p-[0.4%] z-50">
                <Image src={IDF} alt="" />
            </div>
        </div>
        <div className="">
        <div className='flex flex-row justify-between  gap-2'>
                <div className='bg-red-600  h-full p-4 shadow-xl' style={{width:'22%', background:'white' ,height: 'calc(100vh - 50px)' , position:'sticky',top: '20px'}}>Connect Components 
                    <div className='bottom-0'>Bugs</div>
                </div>
                <div className='w-[30%] h-full bg-white shadow-lg pt-[2%] px-[2%]' style={{width:'80%' , /*marginLeft:'21%'*/}}>{children}</div>
                <div className='text-red-700 font-bold right-0  p-4 shadow-xl' style={{width:'22%' , background:'white' ,height: 'calc(100vh - 50px)' , position:'sticky',top: '20px' , }}>Latest News</div>
            </div>
        </div>
        </div>
      </section>
      </LoadingProvider>
      </>
    )
  }
