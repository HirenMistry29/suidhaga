"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Table, Skeleton, Avatar, Dropdown, message, Select } from "antd";
import { GET_JOBS } from "@/graphql/queries/jobs.queries";
import NewImage from '@/public/image/photo-1584184924103-e310d9dc82fc.avif';
import { DownOutlined } from "@ant-design/icons";
import { UPDATE_JOB_STATUS } from "@/graphql/mutations/updateJobStatus.mutations";

interface Job {
  _id: string;
  title: string;
  description: string;
  username: string;
  quantity: number;
  amount: number;
  status: String;
}

const Job: React.FC = () => {
  const { loading, error, data } = useQuery(GET_JOBS);
  const [updateJobStatus] = useMutation(UPDATE_JOB_STATUS);
  const [list, setList] = useState<Job[]>([]);
  console.log(data);
  
  useEffect(() => {
    if (data && data.jobs) {
      setList(data.jobs);
    }
  }, [data]);

  if (loading) return <Skeleton active />;
  if (error) return <p>Error: {error.message}</p>;

  const handleStatusChange = async (jobId: any, newStatus: String) => {
    try {
      const { data } = await updateJobStatus({ variables: { jobId, status: newStatus } });
      if (data && data.updateJobStatus) {
        message.success('Job status updated successfully');
      } else {
          message.error('Job not found');
      }
    } catch (error) {
      message.error('Failed to update job status');
    }
  };

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
      dataIndex: 'name',
      key: 'name',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Job) => (
        <Select
          value={status}
          onChange={(newStatus) => handleStatusChange(record._id, newStatus)}
          options={[
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' },
          ]}
        />
      ),
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
