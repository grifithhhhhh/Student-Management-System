import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const Introsection = () => {

  const [Data, setData] = useState([])
    const getData = async ()=> {
    const response = await axios.get("http://localhost:8004/students");
    setData(response.data[0])
    }

   useEffect(() => {
    getData()
  }, [])
  
  
  return (
    <div className=' w-full h-40 flex px-5 '>

      <div className='bg-purple-400 border-4 w-full h-fit p-8 rounded-3xl mt-auto'>
      <h1 className='text-3xl font-bold text '>Hii, {Data.firstName} {Data.lastName}</h1>
      <h1 className='text-xl font-bold'>This page is all about you</h1>
      </div>
    </div>
  )
}

export default Introsection