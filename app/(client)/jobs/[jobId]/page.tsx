'use client'
import React, { useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_JOB } from '@/graphql/mutations/addJob.mutations';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import {GET_JOB_BY_ID} from '../../../../graphql/queries/jobs.queries'

interface AddJobCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddJobCard: React.FC<AddJobCardProps> = ({ isOpen, onClose }) => {
    const { jobId } = useParams<{ jobId: string }>();
    const { data, loading, error } = useQuery(GET_JOB_BY_ID, {
      variables: { id: jobId },
      skip: !jobId,
    });

  
  console.log(data);
  console.log(jobId);
  

  useEffect(()=>{
    console.log(data);    
  },[jobId])
  isOpen = true

  return (
    <>
      {isOpen && (
        <div className="fixed top-6 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-0">
          <div className="bg-white rounded-lg p-8">
           {data?.job?.title}
           {data?.job?.description}
          </div>
        </div>
      )}
    </>
  );
};

export default AddJobCard;