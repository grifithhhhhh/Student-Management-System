import React from 'react'
import Sidebar from '../components/studentComponents/Sidebar'
import NotSidebar from '../components/studentComponents/NotSidebar'
 
const Student = () => {
  return (
    <div className='flex bg-[#0d0f14] w-screen h-screen overflow-hidden'>
      <Sidebar />
      <NotSidebar />
    </div>
  )
}
 
export default Student