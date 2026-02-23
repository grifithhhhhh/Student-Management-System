import React from 'react'
import { Outlet } from 'react-router-dom'
import Rightsidebar from './Rightsidebar'

const Herosection = () => {
  return (
    <div className=' bg-[#634cce] rounded-4xl w-full h-6/7 p-8 flex justify-between '>
    <Outlet />
    <Rightsidebar/>

    </div>
  )
}

export default Herosection