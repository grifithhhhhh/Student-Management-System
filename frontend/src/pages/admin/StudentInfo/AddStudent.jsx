import React, { useState } from 'react'
import axios from 'axios'

const AddStudent = () => {

  

  const [student, setstudent] = useState({
    firstName : "",
    lastName : "",
    gender: "",
    email : "",
  })

  const handleClick = (e)=>{
    setstudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }

  const btnClicked = (e)=>{
    e.preventDefault();
    console.log(student)
    const response = axios.post("http://localhost:8004/students", student)
    console.log(response)
    
  }
  return (
    <div className='bg-pink-300 border-4 p-5 w-fit rounded-3xl flex flex-col justify-center items-center  '>
        <form onSubmit={()=> {console.log("form submited")}} className='flex flex-col gap-3'>
          <h1 className='text-3xl mb-2 font-bold '>Add Student</h1>

          <input 
          name='firstName'
          onChange={handleClick}
          className='bg-amber-50 p-3 rounded-3xl border min-w-80 mr-1 px-2'
          type="text" 
          placeholder='First Name' />

          <input 
          name='lastName'
          onChange={handleClick}
          className='bg-amber-50 p-3 rounded-3xl border min-w-80 mr-1 px-2'
          type="text" 
          placeholder='Last Name' />

          <input 
          name='gender'
          onChange={handleClick}
          className='bg-amber-50 p-3 rounded-3xl border min-w-80 mr-1 px-2'
          type="text" 
          placeholder='Gender' />

          <input 
          name='email'
          onChange={handleClick}
          className='bg-amber-50 p-3 rounded-3xl border min-w-80 mr-1 px-2'
          type="text" 
          placeholder='Email' />

          <button onClick={btnClicked} className='bg-green-500 text-white text-xl p-2 rounded-2xl mt-auto --4'>Add student</button>
        </form>
      </div> 
  )
}

export default AddStudent