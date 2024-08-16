import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { Avatar, Card, List } from "antd";

import Meta from "antd/es/card/Meta";
import { GET_JOBS_BY_ID } from "@/graphql/queries/jobs.queries";
import { GET_POSTS_BY_ID } from "@/graphql/queries/post.queries";
import AddJobCard from "@/app/(client)/jobs/[jobId]/page";
import AddPostCard from "./postForm";
import AddPostModalCard from "@/app/(client)/posts/[postId]/page";
import NewImage from "@/public/image/photo-1584184924103-e310d9dc82fc.avif";
import {
  GET_AUTHENTICATED_USER,
  GET_USERS,
} from "@/graphql/queries/users.queries";

interface ChildProp {
  imageSrc: string; // Assuming imageSrc is a string URL
  name: string;
  email: string;
  phone: string;
}

const Profile: React.FC<ChildProp> = ({ imageSrc, name, email, phone }) => {
  const { accountId } = useParams<{ accountId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [myJobOpen, setMyJobOpen] = useState(true);
  const [myPostsOpen, setMyPostsOpen] = useState(false);
  const [myOrders, setMyOrders] = useState(false);
  const [applications, setApplications] = useState([]);

  const {
    data: jobsData,
    loading: jobsLoading,
    error: jobsError,
  } = useQuery(GET_JOBS_BY_ID, {
    variables: {
      id: accountId,
    },
  });

  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = useQuery(GET_POSTS_BY_ID, {
    variables: {
      id: accountId,
    },
  });
  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);

  const handleCardClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsModalOpen(true);
  };

  const handlePostCardClick = (postId: string) => {
    setSelectedPostId(postId);
    setIsPostModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobId(null);
  };

  const handlePostCloseModal = () => {
    setIsPostModalOpen(false);
    setSelectedPostId(null);
  };

  const handleJobClick = () => {
    setMyJobOpen(true);
    setMyPostsOpen(false);
    setMyOrders(false);
    console.log(jobsData);
  };

  const handlePostClick = () => {
    setMyPostsOpen(true);
    setMyJobOpen(false);
    setMyOrders(false);
  };

  const handleOrderClick = () => {
    setMyOrders(true);
    setMyJobOpen(false);
    setMyPostsOpen(false);
  };
  const defaultData = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
  ];

  return (
    <>
      <div className="bg-white body-font rounded-xl overflow-hidden mb-2">
        <div className="flex flex-col justify-start">
          <div className="w-full flex justify-center mt-3">
            <Image
              alt="profile"
              className="object-cover object-center rounded-full h-[100%] w-[25%]"
              src={imageSrc}
              width={100}
              height={100}
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

      <div className="bg-white body-font rounded-xl overflow-hidden mb-2">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-2 ">
          <div
            className={`cursor-pointer border-2 rounded-full flex justify-center p-2 ${
              myOrders ? "bg-blue-500 text-white" : ""
            }`}
            onClick={handleOrderClick}
          >
            MY ORDERS
          </div>
          <div
            className={`cursor-pointer border-2 rounded-full flex justify-center p-2 ${
              myJobOpen ? "bg-blue-500 text-white" : ""
            }`}
            onClick={handleJobClick}
          >
            MY JOBS
          </div>
          <div
            className={`cursor-pointer border-2 rounded-full flex justify-center p-2 ${
              myPostsOpen ? "bg-blue-500 text-white" : ""
            }`}
            onClick={handlePostClick}
          >
            MY POSTS
          </div>
        </div>
      </div>

      <div className="bg-white body-font shadow-xl rounded-xl overflow-hidden ">
        <div className="py-3 pl-3 border-b-2 ">
          {myJobOpen
            ? "MY JOBS"
            : myPostsOpen
            ? "MY POSTS"
            : myOrders
            ? "MY ORDERS"
            : "MY JOBS"}
        </div>
        {myJobOpen && (
          <div className="grid lg:grid-cols-4 gap-1 md:grid-cols-3 grid-cols-3 bg-gray-200">
            {jobsData &&
            jobsData.jobByUserID &&
            jobsData.jobByUserID.length > 0 ? (
              jobsData.jobByUserID.map((job: any) => (
                <Card
                  key={job._id}
                  onClick={() => handleCardClick(job._id)}
                  hoverable
                  className="relative overflow-hidden rounded-lg shadow-md"
                  cover={
                    <img
                      alt="loading..."
                      src={job.image}
                      className="w-full h-auto transition-transform transform hover:scale-105 ease-in"
                      style={{ width: "100%" }}
                    />
                  }
                >
                  <Meta title={job.title} />
                </Card>
              ))
            ) : (
              <div className="text-center text-gray-500">No jobs found.</div>
            )}
          </div>
        )}

        {myPostsOpen && (
          <div className="grid lg:grid-cols-5 gap-1 md:grid-cols-3 bg-gray-200">
            {postData &&
            postData.getPostsById &&
            postData.getPostsById.length > 0 ? (
              postData.getPostsById.map((post: any) => (
                <Card
                  key={post._id}
                  onClick={() => handlePostCardClick(post._id)}
                  hoverable
                  cover={
                    <Image
                      alt="loading..."
                      src={post.image}
                      width={100}
                      height={100}
                    />
                  }
                >
                  <Meta title={post.title} />
                </Card>
              ))
            ) : (
              <div className="text-center text-gray-500">No posts found.</div>
            )}
          </div>
        )}
        {myOrders && (
          <div className="p-4">
            <List
              itemLayout="horizontal"
              dataSource={defaultData}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                      />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description=""
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </div>

      {isModalOpen && selectedJobId && (
        <AddJobCard
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          jobId={selectedJobId}
        />
      )}

      {isPostModalOpen && selectedPostId && (
        <AddPostModalCard
          isOpen={isPostModalOpen}
          onClose={handlePostCloseModal}
          postId={selectedPostId}
        />
      )}
    </>
  );
};

export default Profile;
