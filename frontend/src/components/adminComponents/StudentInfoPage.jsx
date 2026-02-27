import React from 'react'
import {Link} from 'react-router-dom'

const StudentInfoPage = () => {
  return (
    <div className="bg-blue-500 text-white border-4 border-black relative w-full h-full mr-5 rounded-3xl">
      <img className='w-full h-full absolute object-cover rounded-3xl' src="https://i.pinimg.com/1200x/91/e7/04/91e704530034316defd83fe896b8b522.jpg" alt="" />
      <h1 className="text-6xl absolute text-gray-700 bottom-30 right-10  font-bold">Welcome Admin</h1>
      <p className="text-5xl font-bold text-gray-800 absolute bottom-10 right-10">Select Something.</p>
    </div>
  )
}

export default StudentInfoPage