import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from "react";
import { StudentContext } from "../../../context/StudentContext"

const StudentList = () => {

  const { student, loginStudent, logoutStudent } = useContext(StudentContext);

  return (
   <div className='bg-amber-800 border-4 min-w-full p-5 rounded-3xl h-110'>
      <div className='flex mb-2 rounded-2xl bg-amber-100 p-3 justify-between '>
        <h1 className='text-shadow-black text-2xl font-bold '>Roll no</h1>
        <h1 className='text-shadow-black text-2xl font-bold '>Name</h1>
        <h1 className='text-shadow-black text-2xl font-bold '>Gender</h1>
      </div>
      <div className='flex flex-col bg-amber-400 p-3 max-h-85 overflow-y-scroll rounded-3xl  '>
      {student.StudentData.map(function(elem,idx){return (
        <div className='flex mb-2 rounded-2xl bg-amber-100 p-3 justify-between '>
          <h1 className='text-shadow-black text-2xl font-bold '>{idx +1}</h1>
          <div className='flex gap-1'>
            <h1 className='text-shadow-black text-2xl font-bold '>{elem.firstName}</h1>
          <h1 className='text-shadow-black text-2xl font-bold '>{elem.lastName}</h1>
          </div>
          <h1 className='text-shadow-black text-2xl font-bold '>{elem.gender}</h1>
          
        </div>
      ) })}
    </div>
    </div>
  )
}

export default StudentList