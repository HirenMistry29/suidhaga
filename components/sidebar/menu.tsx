'use client'
import React from 'react'
import { Menu } from 'antd'
import { HomeOutlined } from '@mui/icons-material';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import Link from 'next/link'
import { GET_AUTHENTICATED_USER } from '@/graphql/queries/users.queries';
import { useQuery } from '@apollo/client';

interface NavLink{
    href: string,
    children: String
}



export const NavigationLink:React.FC<NavLink>  = ({ href, children }) => {
    const{data , loading , error } = useQuery(GET_AUTHENTICATED_USER);
    console.log(data?.authUser.userType);
    return (
        <>
        {data?.authUser.userType==='Admin' &&
        <Link className="nav-link" aria-current="page" href={href}>
            {children}
        </Link>
        }
        </>
        
    )
  }

export const MenuList = () => {
    
    
    return (
      <>
          <Menu theme='dark' mode='inline' className='flex flex-col  h-screen pt-[10%]  text-[0.9rem] bg-[#00154F]'>
              {/* <Menu.Item key="Home" icon={<HomeOutLined/>}>Home</Menu.Item> */}
              <Menu.Item key="home" className='' icon={<HomeOutlined/>} ><NavigationLink href={'/admin/'} >Home</NavigationLink></Menu.Item>
              <Menu.Item key="Authentication" icon={<VpnKeyOutlinedIcon/>} >Authentication</Menu.Item>
              <Menu.Item key="BulkAdd" icon={<PeopleOutlineOutlinedIcon/>} ><NavigationLink  href={'/admin/bulkAdd'} >Bulk Add</NavigationLink></Menu.Item>
              <Menu.Item key="users" icon={<PeopleOutlineOutlinedIcon/>} ><NavigationLink href={'/admin/users'} >Users</NavigationLink></Menu.Item>
              <Menu.Item key="Roles" icon={<ChecklistOutlinedIcon/>} >Roles</Menu.Item>
              <Menu.Item key="Jobs" icon={<WorkOutlineOutlinedIcon/>} >Jobs</Menu.Item>
              <Menu.Item key="Posts" icon={<PostAddOutlinedIcon/>} >Posts</Menu.Item>
              <Menu.Item key="Orders" icon={<AddShoppingCartOutlinedIcon/>} >Orders</Menu.Item>
              <Menu.Item key="Notification" icon={<NotificationsActiveOutlinedIcon/>} >Notification</Menu.Item>
              <Menu.Item key="Payments" icon={<PointOfSaleOutlinedIcon/>} >Payments</Menu.Item>
              <Menu.Item key="Settings" icon={<AdminPanelSettingsOutlinedIcon/>} >Settings</Menu.Item>
              <Menu.Item key="Bugs" icon={<BugReportOutlinedIcon/>}> <NavigationLink  href={'/admin/bugs'} >Bugs </NavigationLink></Menu.Item>
              <Menu.Item key="Profile" icon={<BugReportOutlinedIcon/>} >Profile</Menu.Item>
              
  
          </Menu>
      </>
      )
  }

