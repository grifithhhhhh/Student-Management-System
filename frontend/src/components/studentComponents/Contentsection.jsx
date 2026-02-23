import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contentsection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8004/students");
        setData(response.data[2]);  // Assuming index 2 is the target student object [web:11][web:13]
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='bg-amber-50 border-4 rounded-3xl p-5 mr-5 w-full h-full flex items-center justify-center'>
        <h1 className='text-2xl font-bold'>Loading...</h1>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className='bg-amber-50 border-4 rounded-3xl p-5 mr-5 w-full h-full flex items-center justify-center'>
        <h1 className='text-2xl font-bold text-red-500'>{error || "Couldn't load data"}</h1>
      </div>
    );
  }

  return (
    <div className='bg-amber-50 border-4 rounded-3xl p-5 mr-5 w-full h-100'>
      <div className='mb-4'>
        <h1 className='text-5xl font-bold'>Course Details</h1>
      </div>

      <div className='flex justify-around w-fit mt-5 rounded-3xl p-6'>
        <div className='border-4 bg-red-500 p-6 px-20 rounded-3xl justify-center items-center flex'>
          <h1 className='text-5xl font-bold text-white'>{data.courses[0].courseName}</h1>
        </div>
        <div className='p-2 w-fit flex flex-col px-5 gap-2 rounded-3xl'>
          <div className='border-2 bg-green-500 w-full p-2'>
            <h1 className='text-2xl font-bold text-white'>Your Marks: {data.courses[0].credits}</h1>
          </div>
          <div className='p-2 border-2 bg-yellow-300'>
            <h1 className='text-2xl font-bold text-black'>Total Lectures: {data.attendance.totalClasses}</h1>
          </div>
          <div className='p-2 border-2 bg-yellow-500'>
            <h1 className='text-2xl font-bold text-white'>Your Attended: {data.attendance.attendedClasses}</h1>
          </div>
        </div>
        <div className='bg-amber-300 border-4 px-15 p-3 rounded-3xl flex flex-col items-center'>
          <div className='w-30 h-30 flex justify-center items-center mb-3 p-3 rounded-full border-2 bg-amber-50'>
            <h1 className='text-2xl font-bold text-green-500'>{data.attendance.percentage}%</h1>
          </div>
          <h1 className='text-2xl font-bold text-white'>Attendance</h1>
        </div>
      </div>
    </div>
  );
};

export default Contentsection;
