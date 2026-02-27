import React from 'react'
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { StudentContext } from "../context/StudentContext"

const Sidebar = () => {
  const { student, loginStudent, logoutStudent } = useContext(StudentContext);

  return (
    <div className='flex flex-col w-1/6 bg-black  p-4 gap-3  text-black font-bold rounded-3xl m-5 '>
        <h1>Student Hub</h1>

        <div className=' h-1/4 flex flex-col gap-3 p-2 justify-center items-center'>
           <div className=' flex bg-amber-300 border-amber-600 border-2 rounded-3xl w-full p-2 items-center justify-center'>
            <Link to='dashboard' >Dashboard</Link>
           </div>
           <div className=' flex bg-amber-300 border-amber-600 border-2 rounded-3xl w-full p-2 items-center justify-center'><Link to='attendance' >Attendance</Link></div>
           <div className=' flex bg-amber-300 border-amber-600 border-2 rounded-3xl w-full p-2 items-center justify-center'><Link to='studentinfo' >Students</Link></div>

        </div>
        <div className=' h-1/4 flex flex-col p-2 gap-3'>
            <h1 className=' flex bg-amber-300 border-amber-600 border-2 rounded-3xl w-full p-2 items-center justify-center'>Settings</h1>
            <h1 className=' flex bg-amber-300 border-amber-600 border-2 rounded-3xl w-full p-2 items-center justify-center'>Help</h1>
            <h1 className='flex bg-amber-300 border-amber-600 border-2 rounded-3xl w-full p-2 items-center justify-center'>Logout</h1>
        </div>
        <div className='flex flex-col p-4 h-full bg-[#b0e4fe] rounded-3xl  items-center justify-center  border '>
            <img className=' w-full h-fit rounded-3xl object-cover' src="https://i.pinimg.com/1200x/29/dd/db/29dddbb74db0c68adc5358271281e03a.jpg" alt="" />
            <h1 className='mt-auto'>{student.admin.firstName} {student.admin.lastName}</h1>
        </div>
    </div>
  )
}

export default Sidebar