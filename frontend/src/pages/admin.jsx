import React from 'react'
import Navbar from '../components/adminComponents/Navbar'
import Sidebar from '../components/adminComponents/Sidebar'
import Herosection from '../components/adminComponents/Herosection'
 
const admin = () => {
  return (
    <div className='flex w-screen h-screen bg-[#0d0f14] overflow-hidden'>
      <Sidebar />
      <div className='flex flex-col flex-1 min-w-0 px-6 pt-4 pb-5 gap-4 overflow-hidden'>
        <Navbar />
        <Herosection />
      </div>
    </div>
  )
}
 
export default admin
 