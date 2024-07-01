'use client'
import React, { useEffect, useState } from 'react';
import { AutoComplete, Input, Table } from "antd";
import type { TableProps } from "antd";
import { useQuery } from '@apollo/client';
import { GET_USERS } from '@/graphql/queries/users.queries';

const { Search } = Input;

interface User {
  _id: string;
  username: string;
  phone: string;
}

interface DataType extends User {
  Sr_no: number;
}

const Users = () => {
  const { data, loading, error } = useQuery<{ getUsers: User[] }>(GET_USERS);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [suggestions, setSuggestions] = useState<{ value: string }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    setSuggestions([]);
  }, []);

  const handleSearch = (value: string) => {
    if (data && data.getUsers) {
      let filteredUsers: User[];
      if (value.trim() === '') {
        filteredUsers = data.getUsers;
      } else {
        filteredUsers = data.getUsers.filter(user =>
          user.username.toLowerCase().includes(value.toLowerCase()) ||
          user.phone.includes(value)
        );
      }
      setSearchResults(filteredUsers);
      setSuggestions(filteredUsers.map(user => ({ value: user.username })));
    }
  };

  const handleSelect = (value: string) => {
    const selectedUser = searchResults.find(user => user.username === value);
    if (selectedUser) {
      setSelectedUserId(selectedUser._id);
    }
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Sr.no',
      dataIndex: 'Sr_no',
      key: 'Sr_no',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <span style={{ fontWeight: selectedUserId === record._id ? 'bold' : 'normal' }}>{text}</span>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];

  const users = (searchResults.length ? searchResults : data?.getUsers)?.map((user, index) => ({
    Sr_no: index + 1,
    ...user,
  }));

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className='bg-white body-font shadow-gray-500 rounded-xl overflow-hidden mb-4'>
      <div className='px-3 py-2'>
        <AutoComplete
          className="bg-gray-200 rounded-sm w-full"
          options={suggestions}
          onSelect={handleSelect}
          onSearch={handleSearch}
          filterOption={(inputValue, option) =>
            option?.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
        >
          <Search
            placeholder="Search"
            loading={loading}
            enterButton
          />
        </AutoComplete>
      </div>
      <Table
        dataSource={users}
        columns={columns}
        scroll={{ y: 500 }}
        loading={loading}
        rowClassName={(record) => (record._id === selectedUserId ? 'highlight-row' : '')}
      />
    </div>
  );
}

export default Users;
