"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Table, Skeleton, Avatar } from "antd";
import { GET_JOBS } from "@/graphql/queries/jobs.queries";
import NewImage from '@/public/image/photo-1584184924103-e310d9dc82fc.avif';

interface Job {
  id: string;
  title: string;
  description: string;
  username: string;
  quantity: number;
  amount: number;
}

const Job: React.FC = () => {
  const { loading, error, data } = useQuery(GET_JOBS);
  const [list, setList] = useState<Job[]>([]);

  useEffect(() => {
    if (data && data.jobs) {
      setList(data.jobs);
    }
  }, [data]);

  if (loading) return <Skeleton active />;
  if (error) return <p>Error: {error.message}</p>;

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: () => <Avatar src={NewImage.src} />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Job) => (
        <>
          <a>Edit</a>
          <br />
          <a>More</a>
        </>
      ),
    },
  ];

  return (
    <div className="overflow-auto">
      <Table
        bordered
        dataSource={list}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default Job;
