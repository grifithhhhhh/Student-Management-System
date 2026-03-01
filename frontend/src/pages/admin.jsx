import React from 'react'
import Navbar from '../components/adminComponents/Navbar'
import Sidebar from '../components/adminComponents/Sidebar'
import Herosection from '../components/adminComponents/Herosection'




const student = () => {
  return (

    <div className='flex  bg-[#7a7ce4] max-w-screen max-h-screen'>
      <Sidebar/>
      <div className='flex flex-col gap-3 h-screen pr-5 py-5 w-full'>
        <Navbar/>
        <Herosection/>
      </div>
        
    </div>
  )
}

export default student