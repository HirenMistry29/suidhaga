"use client";
import React, { useState } from "react";
import {
  FileAddFilled,
  AppstoreFilled,
  ShoppingFilled,
  UserOutlined,
  MailFilled,
  InboxOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { Button, Input } from "antd";
import { Divider, colors } from "@mui/material";
import { Style } from "@mui/icons-material";
import { background, border } from "@chakra-ui/react";
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';

const { Search } = Input;

interface ChildProp {
  setJobVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setPostVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftNavBar: React.FC<ChildProp> = ({
  setJobVisibility,
  setPostVisibility,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSearch = (value: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Search value:", value);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-1/3">
        <Search
          className="bg-gray-200 rounded-sm"
          placeholder="Search"
          loading={loading}
          enterButton
          onSearch={handleSearch}
        />
      </div>
      <Divider className="w-full border-solid border-[1px] bg-gray-500 " />
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
