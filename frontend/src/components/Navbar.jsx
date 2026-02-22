import React from 'react'
import {Mail, Bell,Search} from 'lucide-react'

const Navbar = () => {
  return (
    <div className=' flex gap-3 p-3 justify-between items-center  '>
        <h1 className='text-4xl text-pink-300 font-bold  '>StudentHub</h1>
        <div className='flex gap-4 p-3  mx-5'>
        <Mail size={45} color="#201e1e" />
        <Bell size={45} color="#201e1e" />
        <input className= 'p-3 border' type="text" placeholder='search here' />
        </div>
    </div>
  )
}

export default Navbar