import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import useStudentStore from "../../store/useStudentStore";

const Attendance = () => {
  const student = useStudentStore((state) => state.student);
  if (!student) {
  return null; // or return a loader
}

console.log("student:",student.admin);
console.log("StudentInfo",student.StudentData)


  return (
    <div className='bg-white border-4 w-full h-full mr-5 rounded-3xl flex flex-col p-5 '>

      <div className='bg-amber-300 w-full h-fit p-4 rounded-3xl'>
        <h1 className='text-7xl font-extrabold  text-black '> Welcome to Attendance Section </h1>
      </div>
      
      <div className='flex h-fit '>
        {student.StudentData.map(function(elem){
        return(
          
          
          <div className=' bg-black w-50 h-60 text-white rounded-3xl flex flex-col m-4 justify-center gap-3 items-center'>

              {elem.courses.map((course) => (
              <div className='flex justify-center items-center' key={course._id}>
                <h2 className='text-3xl font-bold'>{course.courseName}</h2>
              </div>
            ))}

            <div className='bg-amber-400 text-3xl rounded-full flex justify-center items-center w-25 h-25'>
              <h1>{elem.attendance.percentage}</h1>
            </div>
            <div className='flex flex-col justify-center items-center'>
            <h1>Total Classes : {elem.attendance.totalClasses}</h1>
            <h1>Attended Classes :{elem.attendance.attendedClasses}</h1>
            </div>
            
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default Attendance