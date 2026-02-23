import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentNavbar from '../../components/StudentNavbar'

const StudentInfo = () => {

  return (
    <div className=''>
      <StudentNavbar/>
      <Outlet/>
    </div>
  )
  
}

export default StudentInfo