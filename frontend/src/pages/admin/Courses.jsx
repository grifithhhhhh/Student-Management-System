import React, { useState } from 'react'
import axios  from 'axios'
import useStudentStore from "../../store/useStudentStore";

const Courses = () => {

const courses = useStudentStore((state) => state.courses);
const students = useStudentStore((state) => state.students);
const assignments = useStudentStore((state) => state.assignments)
 const { addAssignment , deleteAssignment } = useStudentStore();
 
 const initialcourseinfo = {CourseId : "", selectedStudents: []}

 const [Courseinfo, setCourseinfo] = useState(initialcourseinfo)


const handleChange = (e) =>{
  setCourseinfo((prev)=> ({
    ...prev,
    [e.target.name]: e.target.value

  }))
}


  return ( 
      <div>
        <div>
          
          <form action="">
            <h1>Add New Course</h1>
          <input 
          type="text" 
          placeholder='Course Name'
          name='CourseId'
          value={Courseinfo.CourseId}  
          />
          <div className=''>
            {students.map((student) => (
            <label className='flex flex-column gap-1'   key={student._id}>
            <input
            type="checkbox"
            value={student._id}
            />
          {student.firstName} {student.lastName}
        </label>
        
      ))}
          </div>
         <button>submit</button>
          </form>
        </div>
      </div>
  
  )
}

export default Courses