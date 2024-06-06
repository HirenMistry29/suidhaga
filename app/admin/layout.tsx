'use client'
import React , {useState} from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import Image from 'next/image'
import { Layout, Button } from "antd"
const { Header, Sider } = Layout;
import Link from 'next/link'
import { useMutation } from '@apollo/client'
import { LOGOUT } from '@/graphql/mutations/users.mutations'
import toast from 'react-hot-toast'
import { MenuList } from '@/components/sidebar/menu'
import HeaderH from '@/components/Header/header'
import { useQuery } from '@apollo/client'
import { GET_AUTHENTICATED_USER } from '@/graphql/queries/users.queries'

export default function AdminHome({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }){

    const [collapsed, setCollapsed] = useState(false);
    const[logout ] = useMutation(LOGOUT);
    const{data , loading , error } = useQuery(GET_AUTHENTICATED_USER);
    const userType = data?.authUser.usertype;
    console.log(userType);
    

    async function signOut(){
      try {
        await logout().then(()=>{toast.success(`user logged out`)})
        
     } catch (error) {
         console.log(error);
         toast.error(`could not logout`)
         
     }
    }

    return(
        <>
        <HeaderH userType={userType}/>
        <Layout className='mt-[3%] h-screen w-full overflow-hidden fixed'  >
          
                <Sider collapsed={collapsed} trigger={null} className="text-[#fff] ">
                    {/* <Logo /> */}
                    <MenuList />
                </Sider>
                <Layout>
                    <Header className='bg-white p-5 flex items-center justify-between'>
                        <Button type='text' className='text-black' onClick={() => setCollapsed(!collapsed)} icon={<MenuUnfoldOutlined />} />
                        <div className=' flex flex-row justify-center'>
                            <Link
                                className='p-1'
                                href='https://www.idf.org.in'
                                passHref
                            >
                                {/* <Image className='w-10 h-12 ' src={logo} alt='idf-logo.png' /> */}
                            </Link>
                            <div className=' justify-normal '>
                               IDF
                            </div>
                        </div>
                        <div className='flex flex-row gap-5 mr-[3%] text-base font-semibold'>
                            <div className='cursor-pointer' onClick={signOut}>Logout</div>
                        </div>
                    </Header>
                    <div className='bg-white m-[1%]'>{children}</div>
                </Layout>
            </Layout>
        </>
    )
  }
