import React from 'react'
import { Outlet } from 'react-router-dom'
import Rightsidebar from './Rightsidebar'
 
const Herosection = () => {
  return (
    <div className='flex flex-row w-full flex-1 min-h-0 gap-4 overflow-hidden'>
 
      {/* Main outlet — scrollable */}
      <div className='flex-1 overflow-y-auto min-w-0 pr-1
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-white/10
        [&::-webkit-scrollbar-thumb]:rounded-full'>
        <Outlet />
      </div>
 
    </div>
  )
}
 
export default Herosection
 