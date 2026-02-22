import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Herosection from '../components/Herosection'



const student = () => {
  return (

    <div className='flex  bg-[#7a7ce4] w-screen h-screen'>
      <Sidebar/>
      <div className='flex flex-col justify-between h-screen pr-5 pb-5 w-full'>
        <Navbar/>
        <Herosection/>
        
      </div>
        
    </div>
  )
}

export default student