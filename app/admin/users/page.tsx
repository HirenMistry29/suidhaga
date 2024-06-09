import React from 'react'
import { useQuery } from '@apollo/client'

const Users = () => {
  const users = [
    {id:1,name:'Pradnesh',phone:'9199281081',detail:'Hi'},
    {id:2,name:'Nikhil',phone:'919928081',detail:'Hi'},
    {id:3,name:'Pradnesh',phone:'9199281081',detail:'Hi'}

  ]
  return (
    <div className='bg-white body-font shadow-gray-500 rounded-xl overflow-hidden mb-4 '>
      <div className='px-3 py-2 '>Enquiries for you</div>
      <div className='grid grid-cols-4 border-t-2 pt-3 pl-4'>
      <div>ID</div>
      <div>Name</div>
      <div>Phone Number</div>
      <div>Details</div>
      </div>
      {/* users.map((user,index) => ({
        <div className='grid grid-cols-4 border-t-2 pt-3 pl-4'>
        <div>{user.id}</div>
        <div>Name</div>
        <div>Phone Number</div>
        <div>Details</div>
        </div>
      })); */}
    </div>
  )
}

export default Users
