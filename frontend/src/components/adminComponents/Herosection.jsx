import React from 'react'
import { Outlet } from 'react-router-dom'
import Rightsidebar from './Rightsidebar'

const Herosection = () => {
  return (
    <div className=' bg-[#634cce] rounded-4xl h-6/7 w-full justify-between gap-0  p-8 flex flex-row '>
    <Outlet />
    <Rightsidebar/>

    </div>
  )
}

export default Herosection