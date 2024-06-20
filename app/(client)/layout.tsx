"use client";
import React, { useEffect, useState } from "react";
import logo from "@/public/image/main-logo.jpg";
import Image from "next/image";
import Header from "@/components/Header/header";
import { LoadingProvider } from "@/context/loading";
import TopNavbar from "@/components/navbar/topnavbar";
import LeftNavBar from "@/components/navbar/leftNavBar";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/users.queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import ChatUser from "@/components/ChatUser/dm";
import AddJobCard from "@/components/card/jobForm";
import AddPostCard from "@/components/card/postForm";
import Sider from "antd/es/layout/Sider";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from 'antd';



export default function HomeLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {

    const[jobApplicationVisibility , SetJobApplicationVisibility] = useState<boolean>(false);
    const[postApplicationVisibility , SetPostApplicationVisibility] = useState<boolean>(false);
    const[id , setId] = useState()
    const{data , loading , error} = useQuery(GET_AUTHENTICATED_USER);
    const router = useRouter();
    console.log(data);
    
    useEffect(()=>{
      if(data?.authUser){
        setId(data?.authUser._id)
      }
    },[data?.authUser])
    

  return (
    <>
      <LoadingProvider>
        <section className={`mt-[3.2%] bg-[#D9D9D9] relative`}>
          <div className="">
            {" "}
            <Header userType={data?.authUser?.userType} />{" "}
          </div>

          <div className="">
            <div id="header" className="h-20 justify-center">
              <div className="bg-white h-[90%] w-screen flex justify-center p-[0.4%] z-50">
              <Image className="w-[20%] py-2" src={logo} alt="" />
              </div>
            </div>
            <div className="">
              <div className="flex flex-row justify-between gap-2 w-[100%]">
                <div
                  className="bg-red-600 h-full p-4 shadow-xl lg:w-[20%] md:w-0 sm:w-0 xs:w-0 lg:block xs:hidden"
                  style={{
                   
                    background: "white",
                    height: "calc(100vh - 55px)",
                    position: "sticky",
                    top: "55px",
                  }}
                >
                  <div className=" mt-auto">
                    <LeftNavBar
                      setJobVisibility={SetJobApplicationVisibility}
                      setPostVisibility={SetPostApplicationVisibility}
                    />
                  </div>
                </div>

                <div className="h-full lg:w-[60%]  xs:w-screen lg:m-0 md:m-5 xs:m-3 ">
                  <span style={{ position: "sticky", top: "55px" }}>
                    <TopNavbar />
                  </span>
                  <span>{children}</span>
                  <AddJobCard
                    isOpen={jobApplicationVisibility}
                    onClose={() => SetJobApplicationVisibility(false)}
                  />
                  <AddPostCard
                    isOpen={postApplicationVisibility}
                    onClose={() => SetPostApplicationVisibility(false)}
                  />
                
                </div>
                <div className="flex bottom-0  w-screen fixed justify-center lg:hidden bg-blue-500 rounded-md py-2 shadow-2xl shadow-blue-500  h-12" >
                  <Button className="border-solid border-blue-500 border-2 rounded-full w-[100%] bottom-8 p-4  " icon={<PlusOutlined className="text-blue-500"/>}></Button>
                </div>

                <div
                  className="text-gray-800 right-0 p-[1%] shadow-xl lg:w-[20%] md:w-0 sm:w-0 xs:w-0 lg:block  xs:hidden"
                  style={{
                    background: "white",
                    height: "calc(100vh - 55px)",
                    position: "sticky",
                    top: "55px",
                  }}
                >
                  <ChatUser />
                </div>
              </div>
            </div>
          </div>
        </section>
      </LoadingProvider>
    </>
  );
}
