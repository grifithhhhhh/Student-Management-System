import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from "react";
import { StudentContext } from "../../context/StudentContext"

const ShowCard = () => {
    const { student, loginStudent, logoutStudent } = useContext(StudentContext);

  return (
            <div className='bg-amber-300 min-w-60 h-full rounded-2xl border-black border-4 text-black p-4  m-3 flex flex-col  '>
              <img className='bg-white border-black border-2 w-full h-fit max-h-40 max-w-50 rounded-2xl mb-3 object-cover' src={student.imgURL} alt="" />
              <h1 className=' text-2xl font-bold '>{student.firstName} {student.lastName}</h1>
              <h1 className=' text-xl '>{student.gender}</h1>
              <h1 className=' text-xl  '>{student.email}</h1>
            </div>
  )
}

export default ShowCard