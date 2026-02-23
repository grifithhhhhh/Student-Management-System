import React from 'react'
import { Link } from 'react-router-dom'

const StudentNavbar = () => {
  return (
    <div className='bg-black p-3 w-fit rounded-3xl mb-6'>
        <button className='bg-amber-300  p-3 text-2xl text-white px-8 rounded-2xl m-2' >
          <Link to='add' >Add Student</Link>
        </button>
        <button className='bg-amber-300  p-3 text-2xl text-white px-8 rounded-2xl m-2'>
           <Link to='showlist'>Show List</Link>
        </button>
        <button className='bg-amber-300  p-3 text-2xl text-white px-8 rounded-2xl m-2'>
          <Link to='showcard'>Show Card</Link>
        </button>
    </div>
  )
}

export default StudentNavbar