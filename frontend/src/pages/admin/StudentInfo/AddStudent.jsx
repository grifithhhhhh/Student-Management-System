import React, { useState } from 'react'
import axios from 'axios'

const AddStudent = () => {

  const initialStudent = {
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  imgURL: "",
  courses: [{}],
  attendance: {}
}

const initialCourse = {
  courseName: "",
  credits: "",
}

const initialAttendance = {
  totalClasses: "",
  attendedClasses: "",
  percentage: "",
}

const [student, setstudent] = useState(initialStudent)
const [courses, setcourses] = useState(initialCourse)
const [attendance, setattendance] = useState(initialAttendance)

  const handleCoursesClicked = (e)=> {
    setcourses({
      ...courses,
      [e.target.name] : e.target.value
    })
  }

  const handleAttandace = (e) => {
    setattendance({
      ...attendance,
      [e.target.name] : e.target.value
    })
  }

  const handleClick = (e)=>{
    setstudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }

  const btnClicked = (e)=>{
    e.preventDefault();
    console.log(student)
    console.log(courses)
    console.log(attendance)
    
    const finalStudent = {
      ...student,
      courses: [courses],
      attendance: attendance
    }
    console.log("finalStudent :", finalStudent)

    const response = axios.post("http://localhost:8004/students", finalStudent)
    setstudent(initialStudent)
    setcourses(initialCourse)
    setattendance(initialAttendance)
    console.log(response)
    
  }
  return (
    <div className='bg-pink-300 border-4 p-5  rounded-3xl flex flex-col justify-center items-center  '>
        <form onSubmit={()=> {console.log("form submited")}} className='flex flex-col gap-3'>
          <h1 className='text-3xl mb-2 font-bold '>Add Student</h1>

          <div>
            <input 
          name='firstName'
          onChange={handleClick}
          value={student.firstName}
          className='bg-amber-50 p-3 rounded-3xl border min-w-50 mr-1 px-2'
          type="text" 
          placeholder='First Name' />

          <input 
          name='lastName'
          onChange={handleClick}
          value={student.lastName}
          className='bg-amber-50 p-3 rounded-3xl border min-w-50 mr-1 px-2'
          type="text" 
          placeholder='Last Name' />

          <input 
          name='gender'
          onChange={handleClick}
          value={student.gender}
          className='bg-amber-50 p-3 rounded-3xl border min-w-50 mr-1 px-2'
          type="text" 
          placeholder='Gender' />

          </div>

          
          <input 
          name='email'
          onChange={handleClick}
          value={student.email}
          className='bg-amber-50 p-3 rounded-3xl border min-w-80 mr-1 px-2'
          type="text" 
          placeholder='Email' />

          <input 
          name='imgURL'
          onChange={handleClick}
          value={student.imgURL}
          className='bg-amber-50 p-3 rounded-3xl border min-w-80 mr-1 px-2'
          type="text" 
          placeholder='Image Url' />

        <div className='flex'> 
          <input type="text"
          className='bg-amber-50 p-3 rounded-3xl border min-w-50 mr-1 px-2'
          name='courseName'
          onChange={handleCoursesClicked}
          value={courses.courseName}
          placeholder='courseName' />

          <input type="text"
          className='bg-amber-50 p-3 rounded-3xl border min-w-50 mr-1 px-2'
          onChange={handleCoursesClicked}
          value={courses.credits}
          name='credits'
          placeholder='credits' />
          
        </div>

        <div>
          <input type="text" value={attendance.totalClasses} className='bg-amber-50 p-3 rounded-3xl border min-w-50 mr-1 px-2' onChange={handleAttandace} name='totalClasses' placeholder='totalClasses' />
          <input type="text" value={attendance.attendedClasses} className='bg-amber-50 p-3 rounded-3xl border min-w-50 mr-1 px-2' onChange={handleAttandace} name='attendedClasses' placeholder='attendedClasses' />
          <input type="text" value={attendance.percentage} className='bg-amber-50 p-3 rounded-3xl border min-w-50 mr-1 px-2' onChange={handleAttandace} name='percentage' placeholder='percentage'/>
        </div>


          <button onClick={btnClicked} className='bg-green-500 text-white text-xl p-2 rounded-2xl mt-auto --4'>Add student</button>
        </form>
      </div> 
  )
}

export default AddStudent