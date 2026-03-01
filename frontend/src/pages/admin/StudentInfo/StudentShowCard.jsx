import React from 'react'
import axios from 'axios'
import useStudentStore from "../../../store/useStudentStore";
import api from "../../../api"
import {useNavigate} from 'react-router-dom'


const StudentShowCard = () => {
  const students = useStudentStore((state) => state.students);
  const removeStudentFromStore = useStudentStore((state) => state.deleteStudent);
  const navigate = useNavigate();

  if (!students) {
  return null; // or return a loader
}

/*  Safe code if api crashes
const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8004/students/${id}`
      ,{
  withCredentials: true,
});

      if (response.status === 200) {
        removeStudentFromStore(id); // ✅ update Zustand
        console.log("Deleted entry with id:", id);
      }
    } catch (error) {
      console.log(error);
    }
  };
 */

  const deleteStudent = async (id) => {
    try {
      const response = await api.delete(`/students/${id}`);

      if (response.status === 200) {
        removeStudentFromStore(id); // ✅ update Zustand
        console.log("Deleted entry with id:", id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const editStudent = async(id) =>{
    navigate("/admin/studentinfo/editStudent");
  }

  

  return (
    <div className=' w-full  bg-amber-500 h-full border-4 rounded-3xl mr-4 p-4 flex flex-col justify-center items-center '>

      <h1 className='text-3xl font-bold justify-start text-white text-stroke '>Students Info</h1>
     
      <div className=' w-200 overflow-x-scroll flex'>
            {students.map(function(elem){
          return (
            <div key={elem._id} className='bg-amber-300 min-w-60 h-80 rounded-2xl border-black border-2 text-black p-4  m-3 flex flex-col  '>
              <img className='bg-white border-black border-2 w-25 h-25 rounded-2xl mb-3 object-cover' src={elem.imgURL} alt="" />
              <h1 className=' text-2xl font-bold '>{elem.firstName} {elem.lastName}</h1>
              <h1 className=' text-xl '>{elem.gender}</h1>
              <h1 className=' text-xl line-clamp-1 '>{elem.email}</h1>
              <div className='mt-auto flex w-full gap-3 '>
                <button onClick={editStudent} className='bg-green-400 text-white text-xl p-2 rounded-2xl w-full '>Edit</button>
              <button onClick={()=> {deleteStudent(elem._id)}} className='bg-red-400 text-white text-xl w-full  p-2 rounded-2xl '>Delete</button>
              </div>
            </div>
          )
        })}
        </div>
      
    </div>
  )
}

export default StudentShowCard