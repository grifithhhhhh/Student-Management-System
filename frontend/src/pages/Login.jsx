import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";

const Login = () => {

const { loginStudent } = useContext(StudentContext);
const navigate = useNavigate()

  const [student, setstudent] = useState({
    email: "",
    password: "",
    role: ""
  })

  
  const handleClick = (e)=>{
    setstudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }

    
  const buttonClicked = async (e) => {
  e.preventDefault();

  try {
    

    const response = await axios.post(
      "http://localhost:8004/logininfo",
      student,{ withCredentials: true }
    );

    if(response.status === 200){
     if(student.role === "admin"){
      navigate('/admin')
      loginStudent(response.data.Data)
     }
     if(student.role === "student"){
      navigate('/student')
      loginStudent(response.data.student)
     }
    }

  } catch (error) {
    console.log("Error:", error.response?.data || error.message);
  }
};
     
  return (
    <div className='bg-[#fdf5ea] w-screen h-screen p-10'>
        <div className=' w-full h-full flex  '>
           <div className=' w-7/10 mr-10 relative border-4 rounded-4xl'  >
            <img className='w-full h-full object-cover rounded-4xl absolute' src="https://i.pinimg.com/736x/b5/80/d3/b580d326b6d3f25bf0b5370ced32a2e3.jpg" alt="" />
             <h1 className='  w-1/2 text-8xl font-bold text-white relative top-30 left-10'>Welcome to Student Managment System</h1>
           </div>
           <div className=' w-3/10 flex flex-col p-5  rounded-4xl '>
            <div className='flex flex-col  h-full w-full items-center gap-1 '>
                <h1 className='text-5xl font-bold mb-4 mt-20'>Welcome Back,
                </h1>
                <h1 className='text-2xl text-gray-400 mb-10 '>Enter your details below</h1>
              
                <form  className=' flex flex-col p-4 w-80 h-80' action="">
                <div className='flex w-full gap-6 mb-4 '>
                  
                       <div className="flex gap-4">

  <label className="cursor-pointer">
    <input
      type="radio"
      name="role"
      value="student"
      onChange={handleClick}
      className="peer hidden"
    />
    <div className="px-6 py-3 rounded-2xl text-xl font-semibold 
                    bg-gray-800 text-white
                    peer-checked:bg-amber-500 
                    peer-checked:text-black 
                    transition-all duration-300">
      Student
    </div>
  </label>

  <label className="cursor-pointer">
    <input
      type="radio"
      name="role"
      value="admin"
      onChange={handleClick}
      className="peer hidden"
    />
    <div className="px-6 py-3 rounded-2xl text-xl font-semibold 
                    bg-gray-800 text-white
                    peer-checked:bg-amber-500 
                    peer-checked:text-black 
                    transition-all duration-300">
      Admin
    </div>
  </label>

</div>
              
                </div>
                <input className='w-full text-xl border-2 rounded-2xl mb-4 p-2' type="text" onChange={handleClick} name='email' placeholder='Email' />
                <input className='w-full text-xl border-2 rounded-2xl mb-4 p-2' type="text" onChange={handleClick} name='password' placeholder='Password' />
                <button className='w-full bg-black text-white text-xl  rounded-2xl mb-4 p-2' onClick={buttonClicked}>Log in</button>
                </form>

            </div>
           </div>
        </div>
    </div>
  )
}

export default Login