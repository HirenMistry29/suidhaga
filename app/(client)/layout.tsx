"use client";
import React, { useEffect, useState } from "react";
import IDF from "@/public/svgs/header.svg";
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

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [jobApplicationVisibility, SetJobApplicationVisibility] =
    useState<boolean>(false);
  const [postApplicationVisibility, SetPostApplicationVisibility] =
    useState<boolean>(false);
  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);
  const router = useRouter();
  // console.log(`authenticated user : `, data?.authUser.userType );
  console.log(data);

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
                <Image src={IDF} alt="" />
              </div>
            </div>
            <div className="">
              <div className="flex flex-row justify-between gap-2 w-[100%]">
                <div
                  className="sm:hidden bg-red-600 h-full p-4 shadow-xl"
                  style={{
                    width: "20%",
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

                <div className="h-full" style={{ width: "60%" }}>
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

                <div
                  className="text-gray-800 right-0 p-[1%] shadow-xl"
                  style={{
                    width: "20%",
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
