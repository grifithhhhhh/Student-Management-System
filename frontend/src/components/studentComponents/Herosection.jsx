import React from 'react'
import Introsection from './Introsection'
import Contentsection from './Contentsection'
import ShowCard from './ShowCard'
import { Outlet } from 'react-router-dom'
import RightSidebar from "./RightSidebar"

const Herosection = () => {
  return (
    <div className='flex justify-between w-full h-full p-4'>

        <Outlet/>
        <RightSidebar/>
       
      
    </div>
  )
}

export default Herosection