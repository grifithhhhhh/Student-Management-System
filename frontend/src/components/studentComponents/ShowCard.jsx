import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const ShowCard = () => {
    const [Data, setData] = useState([])
    const getData = async ()=> {
    const response = await axios.get("http://localhost:8004/students");
    setData(response.data[0])
    
    }

   useEffect(() => {
    getData()
  }, [])

  return (
            <div className='bg-amber-300 min-w-60 h-full rounded-2xl border-black border-4 text-black p-4  m-3 flex flex-col  '>
              <img className='bg-white border-black border-2 w-full h-fit max-h-40 max-w-50 rounded-2xl mb-3 object-cover' src={Data.imgURL} alt="" />
              <h1 className=' text-2xl font-bold '>{Data.firstName} {Data.lastName}</h1>
              <h1 className=' text-xl '>{Data.gender}</h1>
              <h1 className=' text-xl  '>{Data.email}</h1>
            </div>
  )
}

export default ShowCard