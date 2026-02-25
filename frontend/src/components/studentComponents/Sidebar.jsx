import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'


const Sidebar = () => {
   const [Data, setData] = useState([])
    const getData = async ()=> {
    const response = await axios.get("http://localhost:8004/students");
    setData(response.data[0])
    console.log(Data.imgURL)
    }

   useEffect(() => {
    getData()
  }, [])

  return (
    <div className='flex flex-col h-full w-1/6 bg-black  p-4 gap-3  text-black font-bold rounded-3xl '>
        <div className='flex justify-center items-center'>
          <h1 className='bg-amber-50 p-3 w-full rounded-3xl '>Student Hub</h1>
        </div>

      <div className='  flex flex-col p-2 gap-3 mt-auto '>
            <h1 className=' flex bg-amber-300 border-amber-600 border-2 rounded-3xl w-full p-2 items-center justify-center'>Login</h1>
            <h1 className=' flex bg-amber-300 border-amber-600 border-2 rounded-3xl w-full p-2 items-center justify-center'>About</h1>
            <h1 className='flex bg-amber-300 border-amber-600 border-2 rounded-3xl w-full p-2 items-center justify-center'>Logout</h1>
        </div>
       
        <div className='  flex flex-col p-2 gap-3 mt-auto '>
            <h1 className=' flex bg-amber-300 border-amber-600 border-2 rounded-3xl w-full p-2 items-center justify-center'>Settings</h1>
            <h1 className=' flex bg-amber-300 border-amber-600 border-2 rounded-3xl w-full p-2 items-center justify-center'>Help</h1>
            <h1 className='flex bg-amber-300 border-amber-600 border-2 rounded-3xl w-full p-2 items-center justify-center'>Logout</h1>
        </div>
        <div className='flex flex-col p-4 min-h-60  bg-[#b0e4fe] rounded-3xl  items-center justify-center  border '>
            <img className=' w-full h-fit rounded-3xl object-cover' src={Data.imgURL} alt="" />
            <h1 className='mt-auto'>{Data.firstName} {Data.lastName}</h1>
        </div>
    </div>
  )
}

export default Sidebar