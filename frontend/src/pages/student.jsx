import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const admin = () => {

  const [Data, setData] = useState([])
  const getData = async ()=> {
  const response = await axios.get("http://localhost:8004/students");
  console.log(response.data)
  setData(response.data)
  console.log("Data recieved")
  }
  
  return (
    <div>
        <h1>This is a admin page</h1>
        <div>   
        <div className='bg-black p-4 flex justify-between'>
        <h1 className=' text-2xl text-white '>Student Management System</h1>
        <button  className='p-3 bg-amber-50 text-2xl rounded-3xl px-4' onClick={getData} >CLICK ME</button>
        </div>
        <div>
        {Data.map(function(elem){
          return (
            <div className='bg-amber-200 p-4 flex flex-col justify-center'>
              <h1>Student Data</h1>
              <h1 className=' text-2xl '>Student Name:{elem.firstName}</h1>
              <h1 className=' text-2xl '>Student Last:{elem.lastName}</h1>
              <h1 className=' text-2xl '>Student Gender:{elem.gender}</h1>
              <h1 className=' text-2xl '>Student Email:{elem.email}</h1>
            </div>
          )
        })}
      </div>

    </div>
    </div>
  )
}

export default admin