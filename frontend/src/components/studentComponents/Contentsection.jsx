import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from "react";
import { StudentContext } from "../../context/StudentContext";



const Contentsection = () => {
  const { student, loginStudent, logoutStudent } = useContext(StudentContext);

  return (
    <div className='bg-amber-50 border-4 rounded-3xl p-5 mr-5 w-full h-100'>
      <div className='mb-4'>
        <h1 className='text-5xl font-bold'>Course Details</h1>
      </div>

      <div className='flex justify-around w-fit mt-5 rounded-3xl p-6'>
        <div className='border-4 bg-red-500 p-6 px-20 rounded-3xl justify-center items-center flex'>
          <h1 className='text-5xl font-bold text-white'>{student.courses[0].courseName}</h1>
        </div>
        <div className='p-2 w-fit flex flex-col px-5 gap-2 rounded-3xl'>
          <div className='border-2 bg-green-500 w-full p-2'>
            <h1 className='text-2xl font-bold text-white'>Your Marks: {student.courses[0].credits}</h1>
          </div>
          <div className='p-2 border-2 bg-yellow-300'>
            <h1 className='text-2xl font-bold text-black'>Total Lectures: {student.attendance.totalClasses}</h1>
          </div>
          <div className='p-2 border-2 bg-yellow-500'>
            <h1 className='text-2xl font-bold text-white'>Your Attended: {student.attendance.attendedClasses}</h1>
          </div>
        </div>
        <div className='bg-amber-300 border-4 px-15 p-3 rounded-3xl flex flex-col items-center'>
          <div className='w-30 h-30 flex justify-center items-center mb-3 p-3 rounded-full border-2 bg-amber-50'>
            <h1 className='text-2xl font-bold text-green-500'>{student.attendance.percentage}%</h1>
          </div>
          <h1 className='text-2xl font-bold text-white'>Attendance</h1>
        </div>
      </div>
    </div>
  );
};

export default Contentsection;
