import React from 'react'
import Sidebar from '../components/studentComponents/Sidebar'
import NotSidebar from '../components/studentComponents/NotSidebar'
const student = () => {
  return (
    <div className='flex bg-purple-400 w-screen h-screen p-5'>
      <Sidebar/>
      <NotSidebar/>
    </div>
  )
}

export default student