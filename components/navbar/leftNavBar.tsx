"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FileAddFilled, AppstoreFilled, ShoppingFilled, MailFilled } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import { GET_USERS } from "@/graphql/queries/users.queries";

const { Search } = Input;

interface ChildProp {
  setJobVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setPostVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  onUserClick: (userId: string) => void;
}

interface User {
  _id: string;
  username: string;
}

const LeftNavBar: React.FC<ChildProp> = ({ setJobVisibility, setPostVisibility, onUserClick }) => {
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [suggestions, setSuggestions] = useState<{ value: string }[]>([]);

  const { loading, data } = useQuery<{ users: User[] }>(GET_USERS);

  useEffect(() => {
    setSuggestions([]);
  }, []);
  const handleSearch = (value: string) => {
    if (data && data.users) {
      let filteredUsers: User[];
      if (value.trim() === '') {
        filteredUsers = [];
      } else {
        filteredUsers = data.users.filter(user => user.username.toLowerCase().includes(value.toLowerCase()));
      }
      setSearchResults(filteredUsers);
      setSuggestions(filteredUsers.map(user => ({ value: user.username })));
    }
  };
  
  

  const handleSelect = (value: string) => {
    const selectedUser = searchResults.find(user => user.username === value);
    if (selectedUser) {
      onUserClick(selectedUser._id);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-1/3">
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
      <div className="w-full border-solid border-[1px] bg-gray-500" />
      <div className="flex flex-col text-gray-700 gap-[1px] bg-white h-1/2">
        <span
          className="cursor-pointer text-lg font-semibold flex flex-row gap-3 p-2 rounded-lg hover:bg-gray-200"
          onClick={() => setJobVisibility(true)}
        >
          <FileAddFilled />
          Create Job
        </span>
        <span
          className="cursor-pointer text-lg font-semibold flex flex-row gap-3 p-2 rounded-lg hover:bg-gray-200"
          onClick={() => setPostVisibility(true)}
        >
          <AppstoreFilled />
          Create Post
        </span>
        <span className="cursor-pointer text-lg font-semibold flex flex-row gap-3 p-2 rounded-lg hover:bg-gray-200">
          <ShoppingFilled />
          My Orders
        </span>
        <span className="cursor-pointer text-lg font-semibold flex flex-row gap-3 p-2 rounded-lg hover:bg-gray-200">
          <PersonIcon />
          My Account
        </span>
        <span className="cursor-pointer text-lg font-semibold flex flex-row gap-3 p-2 rounded-lg hover:bg-gray-200">
          <MailFilled />
          Contact Us
        </span>
        <span className="cursor-pointer text-lg font-semibold flex flex-row gap-3 p-2 rounded-lg hover:bg-gray-200">
          <GroupsIcon />
          About Us
        </span>
      </div>
    </div>
  );
};

export default LeftNavBar;
