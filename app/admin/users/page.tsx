"use client";

import React from 'react'
import { useQuery } from '@apollo/client'
import { Card, List } from "antd";
import { Table } from "antd";
import type { TableProps } from "antd";

const Users = () => {
  interface DataType {
    id: String;
    name: String;
    phone: String;
    detail: String
  }
  const users:DataType[] = [
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '1', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' },
    { id: '2', name: 'Nikhil', phone: '919928081', detail: 'Hi' },
    { id: '3', name: 'Pradnesh', phone: '9199281081', detail: 'Hi' }

  ]
  

  const columns: TableProps<DataType> ['columns'] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
    },
  ];
  
  return (
    <div className='bg-white body-font shadow-gray-500 rounded-xl overflow-hidden mb-4 '>
      <div className='px-3 py-2 '>Enquiries for you</div>
      
    
      <Table dataSource={users} columns={columns} scroll={{ y: 240 }} />;
    </div>

  )
}

export default Users
