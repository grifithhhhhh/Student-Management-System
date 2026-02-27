import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { IdCard } from 'lucide-react'
import { useContext } from "react";
import { StudentContext } from "../../../context/StudentContext"


const StudentShowCard = () => {

  
  const deleteStudent = async (id)=> {
    const response = await axios.delete(`http://localhost:8004/students/${id}`)
    console.log("deleted entry with id : ",id)

    getData()
  }
  
    const { student, loginStudent, logoutStudent } = useContext(StudentContext);

  return (
    <div className=' w-full  bg-amber-500 border-4 rounded-3xl mr-4 p-4 flex flex-col justify-center items-center '>

      <h1 className='text-3xl font-bold justify-start text-white text-stroke '>Students Info</h1>
     
      <div className=' w-200 overflow-x-scroll flex'>
            {student.StudentData.map(function(elem){
          return (
            <div key={elem._id} className='bg-amber-300 min-w-60 h-80 rounded-2xl border-black border-2 text-black p-4  m-3 flex flex-col  '>
              <img className='bg-white border-black border-2 w-25 h-25 rounded-2xl mb-3 object-cover' src={elem.imgURL} alt="" />
              <h1 className=' text-2xl font-bold '>{elem.firstName} {elem.lastName}</h1>
              <h1 className=' text-xl '>{elem.gender}</h1>
              <h1 className=' text-xl line-clamp-1 '>{elem.email}</h1>
              <button onClick={()=> {deleteStudent(elem._id)}} className='bg-red-400 text-white text-xl p-2 rounded-2xl mt-auto --4'>Remove Student</button>
            </div>
          )
        })}
        </div>
      
    </div>
  )
}

export default StudentShowCard