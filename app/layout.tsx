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
// import { Suspense } from 'react'
import {Toaster} from "react-hot-toast";
import { useQuery } from '@apollo/client';
import { GET_AUTHENTICATED_USER } from "../graphql/queries/users.queries"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ApolloWrapper } from "@/apollo/apolloClient";

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

  const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache,
    credentials: 'include',
  })





  return (
    <>
      <html lang="en">
      <body className={`overflow-x-hidden ${inter.className}`}>
        {/* <div className=""> <Header/> </div> */}
        <div className={`${pathname==='/home' &&' pt-[3.5%]'}`}>
          {/* <ApolloWrapper>{children}</ApolloWrapper> */}
          <ApolloProvider client={client}>{children}</ApolloProvider>
         <Toaster position="bottom-right" toastOptions={{duration:2500}}/>
        </div>
      </body>
    </html>
    </>
  );
}
