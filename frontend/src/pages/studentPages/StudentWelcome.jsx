import React from 'react'

const StudentWelcome = () => {
  return (
    <div className="bg-blue-500 text-white border-4 border-black relative w-full mr-5 rounded-3xl">
      <img className='w-full h-full absolute object-cover rounded-3xl' src="https://i.pinimg.com/1200x/f1/a8/dd/f1a8dd69a469a0acb281d761aca2a70c.jpg" alt="" />
      <h1 className="text-6xl absolute top-10 left-10  font-bold">Welcome Student</h1>
      <p className="text-5xl font-bold absolute top-30 left-10">Select Dashboard or Students to continue.</p>
    </div>
  )
}

export default StudentWelcome