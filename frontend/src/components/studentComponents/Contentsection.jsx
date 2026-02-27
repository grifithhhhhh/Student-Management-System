import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useStudentStore from "../../store/useStudentStore";


const Contentsection = () => {
  const students = useStudentStore((state) => state.students);
  if (!students) {
  return null; // or return a loader
}
  

  return (
    <div className='bg-amber-50 border-4 h-full m-5 rounded-3xl p-5 mr-5 w-full gap-3 justify-center items-center flex flex-col '>
      <div className='mb-4 flex gap-3 '>
        <h1 className='text-5xl font-bold'>Current Course: </h1>
        <h1 className='text-5xl font-bold text-red-500'>{students.courses[0].courseName}</h1>
      </div>

      <div className='flex justify-center items-center w-full mt-2 rounded-3xl p-2'>
        
        <div className=' w-full flex h-40 px-5 gap-4 rounded-3xl'>
          <div className='border-2 rounded-3xl bg-green-500  p-2'>
            <h1 className='text-4xl w-50 h-40 p-2 font-bold text-white'>Your Marks: {students.courses[0].credits}</h1>
          </div>
          <div className='p-2 border-2 rounded-3xl bg-yellow-300'>
            <h1 className='text-4xl w-50 h-40 p-2 font-bold text-black'>Total Lectures: {students.attendance.totalClasses}</h1>
          </div>
          <div className='p-2 border-2 rounded-3xl bg-yellow-500'>
            <h1 className='text-4xl w-50 h-40 p-2 font-bold text-white'>Your Attended: {students.attendance.attendedClasses}</h1>
          </div>
        </div>

        
      </div>
      <div className='bg-amber-300 border-4 w-fit  p-3 rounded-3xl flex flex-col items-center'>
          <div className=' flex justify-center items-center mb-3 p-3 rounded-full border-2 bg-amber-50'>
            <h1 className='text-2xl font-bold text-green-500'>{students.attendance.percentage}%</h1>
          </div>
          <h1 className='text-2xl font-bold text-white'>Attendance</h1>
        </div>
    </div>
  );
};

export default Contentsection;
