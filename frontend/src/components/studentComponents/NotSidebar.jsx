import React from 'react'
import Navbar from './Navbar'
import Herosection from './Herosection'
 
const NotSidebar = () => {
  return (
    <div className='flex flex-col flex-1 min-w-0 overflow-hidden bg-[#0d0f14]'>
      <Navbar />
      <Herosection />
    </div>
  )
}
 
export default NotSidebar