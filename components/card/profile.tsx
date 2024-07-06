import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { GET_JOBS_BY_ID } from "@/graphql/queries/jobs.queries";

interface ChildProp {
  imageSrc: StaticImport;
  name: String;
  email: String;
  phone: String;
}

const Profile: React.FC<ChildProp> = ({ imageSrc, name, email, phone }) => {
  const { accountId } = useParams<{ accountId: string }>();
  const [state, setState] = useState(false);


    const  { data, loading, error,refetch } = useQuery(GET_JOBS_BY_ID, {
      variables: {
        id: accountId,
      },
    });
    console.log(data);

    const handleClick = () => {
        refetch();
        setState(true);
    };
    console.log(data)

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
              {/* <p className='text-gray-600 mb-2'>{email}</p> */}
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
          <div className="border-2 rounded-full flex justify-center p-2">
            My Orders
          </div>
          <div className="border-2 rounded-full flex justify-center p-2" onClick={handleClick}>
            My Jobs
          </div>
          <div className="border-2 rounded-full flex justify-center p-2">
            Likes
          </div>
        </div>
      </div>
      <div className="bg-white body-font shadow-gray-500 shadow-xl rounded-xl overflow-hidden mb-4 ">
        <div className="py-3 pl-3 border-b-2" >
          My Posts
        </div>
        <div className="grid lg:grid-cols-5 md:grid-cols-3">
          
        {data && data.jobByUserID && data.jobByUserID.length > 0 ? (
          data.jobByUserID.map((job: any) => (
            <div key={job._id} className="bg-gray-400 p-5 justify-center border-1">
              {job.title}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No jobs found.</div>
        )}

        </div>
      </div>
    </>
  );
};

export default Profile;
