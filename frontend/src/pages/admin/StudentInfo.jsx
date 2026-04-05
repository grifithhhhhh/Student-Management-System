import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentNavbar from '../../components/adminComponents/StudentNavbar'
 
const StudentInfo = () => {
  return (
    <div className='flex flex-col w-full h-full min-h-0 overflow-hidden'>
      <StudentNavbar />
      <div className='flex-1 min-h-0 overflow-y-auto
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-white/10
        [&::-webkit-scrollbar-thumb]:rounded-full'>
        <Outlet />
      </div>
    </div>
  )
}
 
export default StudentInfo