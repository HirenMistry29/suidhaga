import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { GET_JOBS_BY_ID } from "@/graphql/queries/jobs.queries";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import AddJobCard from "@/app/(client)/jobs/[jobId]/page";
import Job from "@/app/(client)/jobs/page";
import { GET_POST_BY_ID } from "@/graphql/queries/post.queries";

import ProductCard from "./postCard";



interface ChildProp {
  imageSrc: StaticImport;
  name: String;
  email: String;
  phone: String;
}

const Profile: React.FC<ChildProp> = ({ imageSrc, name, email, phone }) => {
  const { accountId } = useParams<{ accountId: string }>();
  const [state, setState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [myJobOpen,setMyJobOpen] =useState(true);
  const [myPostsOpen, setMyPostsOpen] = useState(false);
  const [myOrders, setMyOrders] = useState(false);

  const handleCardClick = (jobId: string) => {
    jobId = jobId;
    setSelectedJobId(jobId); 
    setIsModalOpen(true);
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobId(null); 
  }

  const { data, loading, error, refetch } = useQuery(GET_JOBS_BY_ID, {
    variables: {
      id: accountId,
    },
  });
 const { data: postData}= useQuery(GET_POST_BY_ID, {
  variables: {
    id: accountId,
  }
 });
  const handleJobClick = () => {
    setMyJobOpen(true);
    setMyPostsOpen(false);
    setMyOrders(false);
  };
  const handlePostClick = () => {
    setMyPostsOpen(true);
    setMyJobOpen(false);
    setMyOrders(false);
  }
  const handleOrderClick = () => {
    setMyOrders(true);
    setMyJobOpen(false);
    setMyPostsOpen(false);
  }


  return (
    <>
      <div className="bg-white body-font shadow-gray-500 shadow-xl rounded-xl overflow-hidden mb-4 ">
        <div className="flex flex-col justify-start">
          <div className="w-full flex justify-center mt-3">
            <Image
              alt="profile"
              className="object-cover object-center rounded-full h-[100%] w-[25%]"
              src={imageSrc}
            />
          </div>
          <div className="w-full flex justify-center">
            <div className="mb-4 md:w-3/5 md:rounded-r-xl p-4 md:p-6">
              <div className="flex py-2">
                <span className="text-black">Name: </span>
                <span className="ml-auto text-black">{name}</span>
              </div>
              <div className="flex border-t border-gray-600 py-2">
                <span className="text-black">Email: </span>
                <span className="ml-auto text-black">{email}</span>
              </div>
              <div className="flex border-t border-gray-600 py-2">
                <span className="text-black">Phone: </span>
                <span className="ml-auto text-black">{phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white body-font shadow-gray-500 shadow-xl rounded-xl overflow-hidden mb-4 ">
        <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-4 p-4">
          <div className="border-2 rounded-full flex justify-center p-2" onClick={handleOrderClick}>
            My Orders
          </div>
          <div className="border-2 rounded-full flex justify-center p-2" onClick={handleJobClick}>
            My Jobs
          </div>
          <div className="border-2 rounded-full flex justify-center p-2" onClick={handlePostClick}>
            My Posts
          </div>
        </div>
      </div>
  
      <div className="bg-white body-font shadow-gray-500 shadow-xl rounded-xl overflow-hidden mb-4 ">
        <div className="py-3 pl-3 border-b-2" >
         {myJobOpen? "My Jobs" : myPostsOpen? "My Posts": myOrders? "My Orders" : "My Jobs"}
        </div>
        {myJobOpen &&(
        <div className="grid lg:grid-cols-5 gap-1 md:grid-cols-3 bg-gray-200"> 
        {data && data.jobByUserID && data.jobByUserID.length > 0 ? (
          data.jobByUserID.map((job: any) => (
            <Card
              key={job._id} 
              onClick={() => handleCardClick(job._id)} 
              hoverable
              className=""
              cover={<img alt="loading..." src={job.image} width={'100%'}/>}
            >
              <div className="absolute inset-x-0 bottom-2 text-center border-t-2">
              <Meta title={job.title} className=""/>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center text-gray-500">No jobs found.</div>
        )}

        </div>)}
      </div>
      
      {isModalOpen && selectedJobId && (
        <AddJobCard isOpen={isModalOpen} onClose={handleCloseModal} jobId={selectedJobId} />
      )}
       {myPostsOpen &&(
        <div className="grid lg:grid-cols-5 gap-1 md:grid-cols-3 bg-gray-200"> 
        {postData && postData.getPostById && postData.getPostById.length > 0 ? (
          postData.getPostById.map((posts: any) => (
            <Card
              key={posts._id} 
              onClick={() => handleCardClick(posts._id)} 
              hoverable
              className=""
              cover={<Image alt="loading..." src={imageSrc} width={100}/>}
            >
              <div className="absolute inset-x-0 bottom-2 text-center border-t-2">
              <Meta title={posts.title} className=""/>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center text-gray-500">No jobs found.</div>
        )}

        </div>)}


    </>
    
  );
};

export default Profile;
