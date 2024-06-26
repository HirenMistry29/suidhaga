"use client";
import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  VpnKeyOutlined,
  PeopleOutlineOutlined,
  ChecklistOutlined,
  WorkOutlineOutlined,
  PostAddOutlined,
  NotificationsActiveOutlined,
  AddShoppingCartOutlined,
  PointOfSaleOutlined,
  AdminPanelSettingsOutlined,
  BugReportOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/users.queries";
import { useRouter } from 'next/navigation';
import { useQuery } from "@apollo/client";
import Sider from "antd/es/layout/Sider";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavigationLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {data?.authUser.userType === "Admin" && (
        <Link className="nav-link" aria-current="page" href={href}>
          {children}
        </Link>
      )}
    </>
  );
};

export const MenuList = () => {
  const router = useRouter();

  const labels = [
      "Home",
      "Authentication",
      "Bulk Add",
      "Users",
      "Roles",
      "Jobs",
      "Post",
      "Orders",
      "Notifications",
      "Payments",
      "Settings",
      "Bugs",
      "Profile",
  ];
  const paths = [
    "/",
    "/authentication",
    "/admin/bulkAdd",
    "/admin/users",
    "/roles",
    "/admin/jobs",
    "/post",
    "/orders",
    "/notifications",
    "/payments",
    "/settings",
    "/bugs",
    "/profile",
  ];

  const icons = [
    HomeOutlined,
    VpnKeyOutlined,
    PeopleOutlineOutlined,
    ChecklistOutlined,
    WorkOutlineOutlined,
    PostAddOutlined,
    NotificationsActiveOutlined,
    AddShoppingCartOutlined,
    PointOfSaleOutlined,
    AdminPanelSettingsOutlined,
    BugReportOutlined,
  ].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: labels[index],
    path: paths[index],
  }));

  const handleMenuClick = (e: any) => {
    const clickedItem = icons.find(item => item.key === e.key);
    if (clickedItem) {
      router.push(clickedItem.path);
    }
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={icons}
      onClick={handleMenuClick}
      className="flex flex-col h-screen text-[0.9rem] pt-[10%] bg-[#00154F]"
    />
  );
};
