import React, { useState } from 'react'
import useStudentStore from '../../store/useStudentStore'
const Courses = () => {
  
  const [selectedCourse, setselectedCourse] = useState('')

  const btnClicked = async () =>{

    setselectedCourse(e.name.value)
  } 

   const students = useStudentStore((state) => state.students);
    if(!students){
      return null;
    }

    const allCourses = [
  ...new Set(
    students.flatMap(student =>
      student.courses?.map(course => course.courseName)
    )
  )
];

  return (
    <div className='bg-white rounded-3xl border-4 w-full h-full mr-5 flex p-4 gap-3'>
        <div className='bg-black rounded-2xl p-2 w-45 flex flex-col justify-center items-center gap-3 '>
            {allCourses.map((courseName) => (
              <div className='bg-yellow-300 hover:bg-purple-500 p-1 text-xl font-bold rounded-3xl border-2 px-5 ' key={courseName}>
               <button  onClick={() => setselectedCourse(courseName)} className='flex justify-center items-center'> {courseName}</button>
              </div>
            ))}
        </div>

    <div className='bg-amber-300 p-3 w-full h-full rounded-3xl '>
      <h1 className='text-2xl font-bold mb-3'>Name lastName totalClasses Attendedcourse percentage</h1>
        {students
          .filter(student =>
            student.courses?.some(course => course.courseName === `${selectedCourse}`)
          )
      .map(student => {

        const matchedCourse = student.courses.find(
          course => course.courseName === selectedCourse
        );

        return (
          <div key={student._id}>
            
            <h1 className=' font-bold '>
              {student.firstName} {student.lastName} — {matchedCourse.totalClasses} {matchedCourse.attendedClasses} {matchedCourse.percentage}
            </h1>
          </div>
        );

})}
    </div>



   
    </div>
  )
}

export default Courses