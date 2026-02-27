import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentNavbar from '../../components/adminComponents/StudentNavbar'

const StudentInfo = () => {

  return (
    <div className=' flex flex-col w-full mr-5'>
      <StudentNavbar/>
      <Outlet/>
    </div>
  )
  
}

export default StudentInfo