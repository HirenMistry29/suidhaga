'use client'
import React from 'react'
import ProductCard from '@/components/card/postCard';
import NewImage from '@/public/image/photo-1584184924103-e310d9dc82fc.avif'
import JobCard from '@/components/card/jobCard';
import { useQuery } from '@apollo/client';
import { GET_JOBS } from '@/graphql/queries/jobs.queries';

const Job = () => {
  const{data,loading,error} = useQuery(GET_JOBS)
  console.log(data);
  
  return (
    <div>
        <JobCard imageSrc={NewImage} title={'Chaniya Choli'} details={'A Designer Chaniya Choli'} color={'Blue , Red'} size={'xl , lg'} quantity={'20'} price={'2999'}/>
        <JobCard imageSrc={NewImage} title={'Shirt'} details={'A Formal Shirt'} color={'Blue , Red'} size={'xl , lg'} quantity={'20'} price={'1800'}/>
    </div>
  )
}

export default Job;

//! 1. Add a sample data : [job image , title , description , amount and a button to apply for the job]
//! 2. Each Job should have its own white-bg and add gap between each jobs

