import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from "react";
import { StudentContext } from "../../context/StudentContext";

const Introsection = () => {

  const { student, loginStudent, logoutStudent } = useContext(StudentContext);
  
  return (
    <div className=' w-full h-40 flex px-5 '>

      <div className='bg-purple-400 border-4 w-full h-fit p-8 rounded-3xl mt-auto'>
      <h1 className='text-3xl font-bold text '>Hii, {student.firstName} {student.lastName}</h1>
      <h1 className='text-xl font-bold'>This page is all about you</h1>
      </div>
    </div>
  )
}

export default Introsection