import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const StudentInfo = () => {
  const [Data, setData] = useState([])
    const getData = async ()=> {
    const response = await axios.get("http://localhost:8004/students");
    console.log(response.data)
    setData(response.data)
    console.log("Data recieved")
    }
   useEffect(() => {
    getData()
  }, [])

  return (
    <div className=' w-full h-full bg-amber-300 rounded-3xl mr-4 p-3 flex justify-center items-center '>
 
      
      <div className=' w-200 overflow-x-auto flex'>
            {Data.map(function(elem){
          return (
            <div className='bg-[#ffc5e0] w-60 h-80 rounded-2xl text-white p-4 m-3 flex flex-col  '>
              <img className='bg-purple-400 w-25 h-25 rounded-2xl mb-1' src="" alt="" />
              <h1 className=' text-2xl font-bold '>{elem.firstName} {elem.lastName}</h1>
              <h1 className=' text-xl '>{elem.gender}</h1>
              <h1 className=' text-xl line-clamp-1'>{elem.email}</h1>
              <button className='bg-red-400 text-white text-xl p-2 rounded-2xl mt-auto px-4'>Remove Student</button>
            </div>
          )
        })}
        </div>
      
    </div>
  )
}

export default StudentInfo