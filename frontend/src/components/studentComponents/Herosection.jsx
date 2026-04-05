import React from 'react'
import { Outlet } from 'react-router-dom'
import RightSidebar from "./RightSidebar"

const Herosection = () => {
  return (
    <div className='flex flex-1 min-h-0 overflow-hidden'>

      {/* Main outlet */}
      <div className='flex-1 min-w-0 overflow-y-auto
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-white/10
        [&::-webkit-scrollbar-thumb]:rounded-full'>
        <Outlet />
      </div>

      {/* Right sidebar */}
      <div className='w-72 flex-shrink-0 border-l border-white/5 overflow-y-auto
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-white/10
        [&::-webkit-scrollbar-thumb]:rounded-full'>
        <RightSidebar />
      </div>
    </div>
  )
}

export default Herosection