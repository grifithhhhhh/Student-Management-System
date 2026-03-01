import React, { useState } from 'react'
import axios from 'axios'
import useStudentStore from '../../../store/useStudentStore'

const PatchStudent = () => {

  const { editStudent } = useStudentStore();

  const initialStudent = {
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  imgURL: "",
  password:"",
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
const [courses, setcourses] = useState([])
const [attendance, setattendance] = useState(initialAttendance)
const [courseInput, setcourseInput] = useState(initialCourse)
const [Email, setEmail] = useState("")

  const handleCoursesClicked = (e)=> {
    setcourseInput({
      ...courseInput,
      [e.target.name] : e.target.value
    })
  }
  const handleEmail = (e) =>{
    setEmail(e.target.value)
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
  const deleteCourse = async (idx) =>{
    setcourses(prev => {
  const updated = [...prev];   // clone array
  updated.splice(idx, 1);      // modify clone
  return updated;              // return new array
});
  }

  const removeEmptyFields = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined
    )
  );
};
 const submitCourse = async (e) =>{
    e.preventDefault();

    if (!courseInput.courseName || !courseInput.credits) return;
    setcourses(
      [...courses, courseInput]
    )
    alert(`course submitted : ${courseInput.courseName} \n cerdits submitted: ${courseInput.credits}`)
    setcourseInput(initialCourse)

  }

  const btnClicked = async (e)=>{
    e.preventDefault();
    const cleanedStudents = removeEmptyFields(student)
    const cleanedCourses = removeEmptyFields(courseInput)
    const cleanedAttendance = removeEmptyFields(attendance)
    console.log(cleanedStudents)
    console.log(cleanedCourses)
    console.log(cleanedAttendance)
    console.log(Email)
    
    
try{
    const finalStudent = {
      ...cleanedStudents,
      courses: courses,
      attendance: cleanedAttendance
    }
    console.log("finalStudent :", finalStudent)

    const response = await axios.patch(`http://localhost:8004/students/${Email}`, finalStudent, {
      withCredentials: true,
    })
    console.log("before edit:",useStudentStore.getState());
    await editStudent(response.data);
    console.log("after edit",useStudentStore.getState());
    
    setstudent(initialStudent)
    setcourses([])
    setattendance(initialAttendance)
    setEmail('')
    console.log(response)
}catch(error){
  alert("Error: Either the email is taken or fill all the fields " );
}
    
    
    
  }
  return (
    <div className='bg-blue-300 border-4 p-5 h-full rounded-3xl flex  justify-center overflow-y-auto  '>
        <form onSubmit={btnClicked} className='flex flex-col gap-3 m-4'>
         <div className='flex gap-5'>
           <h1 className='text-3xl mb-2 font-bold '>Edit by Email</h1>
          <input 
          name='email'
          onChange={handleEmail}
          value={Email}
          className='bg-amber-50 p-3 rounded-3xl border min-w-80 mr-1 px-2'
          type="text" 
          placeholder='Original Email' />
         </div>
          

          <div>
            <input 
          name='firstName'
          onChange={handleClick}
          value={student.firstName}
          className='bg-amber-50 p-3 rounded-3xl border min-w-50 mr-1 px-2'
          type="text" 
          placeholder='New First Name' />

          <input 
          name='lastName'
          onChange={handleClick}
          value={student.lastName}
          className='bg-amber-50 p-3 rounded-3xl border min-w-50 mr-1 px-2'
          type="text" 
          placeholder='New Last Name' />

          <input 
          name='gender'
          onChange={handleClick}
          value={student.gender}
          className='bg-amber-50 p-3 rounded-3xl border min-w-50 mr-1 px-2'
          type="text" 
          placeholder='New Gender' />

          </div>

          
         <div className='flex'>
           <input 
          name='email'
          onChange={handleClick}
          value={student.email}
          className='bg-amber-50 p-3 rounded-3xl border min-w-80 mr-1 px-2'
          type="text" 
          placeholder='New Email' />
          
          <input 
          name='password'
          onChange={handleClick}
          value={student.password}
          className='bg-amber-50 p-3 rounded-3xl border min-w-80 mr-1 px-2'
          type="text" 
          autoComplete="off"
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          placeholder='New Password' />
         </div>

          <input 
          name='imgURL'
          onChange={handleClick}
          value={student.imgURL}
          className='bg-amber-50 p-3 rounded-3xl border min-w-80 mr-1 px-2'
          type="text" 
          placeholder='New Image Url' />

        <div className='flex '> 
          <input type="text"
          className='bg-amber-50 p-3 rounded-3xl border w-full min-w-50 mr-1 px-2'
          name='courseName'
          onChange={handleCoursesClicked}
          value={courseInput.courseName}
          placeholder='Course Name' />

          <input type="text"
          className='bg-amber-50 p-3 rounded-3xl border w-full min-w-50 mr-1 px-2'
          onChange={handleCoursesClicked}
          value={courseInput.credits}
          name='credits'
          placeholder='Credits' />

          <button onClick={submitCourse} className='bg-green-500 border-2 w-full border-black text-white text-xl p-2 rounded-2xl mt-auto --4'>Add Course</button>
          
        </div>
        <div>
          {courses.map(function(elem,idx){
            return( <div className='flex w-full gap-4 mb-2'>
            <h1 className=' bg-white rounded-2xl p-3 px-2 text-black border w-full'>{elem.courseName}</h1>
            <h1 className=' bg-white rounded-2xl p-3 px-2 text-black border w-full'>{elem.credits}</h1>
            <button onClick={()=> {deleteCourse(idx)}} className='bg-red-500 border w-full border-black text-white text-xl p-2 rounded-2xl mt-auto' >Delete</button>
            </div>)
          })}
        </div>

        <div>
          <input type="text" value={attendance.totalClasses} className='bg-amber-50 p-3 rounded-3xl border min-w-50 mr-1 px-2' onChange={handleAttandace} name='totalClasses' placeholder='New Total Classes' />
          <input type="text" value={attendance.attendedClasses} className='bg-amber-50 p-3 rounded-3xl border min-w-50 mr-1 px-2' onChange={handleAttandace} name='attendedClasses' placeholder='New Attended Classes' />
          <input type="text" value={attendance.percentage} className='bg-amber-50 p-3 rounded-3xl border min-w-50 mr-1 px-2' onChange={handleAttandace} name='percentage' placeholder='New Percentage'/>
        </div>


          <button type='submit' className='bg-green-500 border-2 border-black text-white text-xl p-2 rounded-2xl mb-4 mt-auto --4'>Add student</button>
        </form>
      </div> 
  )
}

export default PatchStudent