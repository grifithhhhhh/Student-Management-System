import React from 'react'
import { Outlet } from 'react-router-dom'
import Rightsidebar from './Rightsidebar'

const Herosection = () => {
  return (
    <div className='bg-[#f5f9f9] rounded-4xl w-full h-full p-8 flex justify-between  '>
    
    <Outlet />
    <Rightsidebar/>

    </div>
  )
}

export default Herosection