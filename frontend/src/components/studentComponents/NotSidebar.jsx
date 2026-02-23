import React from 'react'
import Navbar from './Navbar'
import Herosection from './Herosection'

const NotSidebar = () => {
  return (
    <div className=' rounded-3xl w-full h-full flex flex-col ml-5'>
      <Navbar/>
      <Herosection/>


    </div>
  )
}

export default NotSidebar