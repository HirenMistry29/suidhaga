'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/header";
import { LoadingProvider } from "@/context/loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchParams , usePathname } from "next/navigation";
import { useEffect } from "react";
var NProgress = require("nprogress");
import { Suspense } from 'react'
import {Toaster} from "react-hot-toast";



const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  NProgress.configure({ showSpinner: false });
  useEffect(()=>{
    // NProgress.start();
    return()=>{NProgress.done(true)}
    
  },[pathname,searchParams])

  return (
    // <LoadingProvider>
    <html lang="en">
      <body className={`overflow-x-hidden ${inter.className}`}>
        {/* <div className=""> <Header/> </div> */}
        <div className={`${pathname==='/home' &&' pt-[3.5%]'}`}>
         {children}
         <Toaster position="bottom-right" toastOptions={{duration:2500}}/>
        </div>
      </body>
    </html>
    // </LoadingProvider>
  );
}
