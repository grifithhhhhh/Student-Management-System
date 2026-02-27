import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import useStudentStore from "../../store/useStudentStore";
const ShowCard = () => {
    const students = useStudentStore((state) => state.students);
    if (!students) {
  return null; // or return a loader
}

  return (
            <div className='bg-blue-300 min-w-60 h-full rounded-2xl border-black border-4 text-black p-4  m-3 flex flex-col  '>
              <img className='bg-white border-black border-2 w-full h-fit max-h-40 max-w-50 rounded-2xl mb-3 object-cover' src={students.imgURL} alt="" />
              <h1 className=' text-2xl font-bold '>{students.firstName} {students.lastName}</h1>
              <h1 className=' text-xl '>{students.gender}</h1>
              <h1 className=' text-xl  '>{students.email}</h1>
            </div>
  )
}

export default ShowCard