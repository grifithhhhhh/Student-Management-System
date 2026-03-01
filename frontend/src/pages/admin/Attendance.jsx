import React from 'react'
import axios from 'axios'
import useStudentStore from "../../store/useStudentStore";

const Attendance = () => {
  const students = useStudentStore((state) => state.students);
  if (!students) {
  return null; // or return a loader
  
}

  return (
    <div className='bg-amber-50 rounded-3xl w-full  border-4 mr-5 '>
      <div className=' w-200 p-5 flex flex-col gap-3'>
         <h1 className='text-7xl font-extrabold  text-black '> Welcome to Attendance Section </h1>
         <div className=' bg-amber-950 w-full flex flex-row p-5 gap-3 h-80 overflow-x-scroll rounded-3xl '>
        {students.map(function(elem){
        return(
          <div className=' bg-black min-w-50 h-60 text-white rounded-3xl flex flex-col justify-center gap-3 items-center '>

              {elem.courses.map((course) => (
              <div className='flex justify-center items-center' key={course._id}>
                <h2 className='text-3xl font-bold'>{course.courseName}</h2>
              </div>
            ))}
            <div>
              <div className='bg-amber-400 text-3xl rounded-full flex justify-center items-center w-25 h-25'>
              <h1>{elem.attendance.percentage}</h1>
            </div>
            <div className='flex flex-col justify-center items-center'>
            <h1>Total Classes : {elem.attendance.totalClasses}</h1>
            <h1>Attended Classes :{elem.attendance.attendedClasses}</h1>
            </div>
            </div>


          </div>

          
        )
      })}
      </div>  
    
      </div>
    </div>
  )
}

export default Attendance