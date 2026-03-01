import React from 'react'
import { Link } from 'react-router-dom'

const StudentNavbar = () => {
  return (
    <div className=' w-fit rounded-3xl mb-6'>
        <button className='bg-amber-300 hover:bg-purple-400 hover:border-white p-3 text-2xl text- px-8 rounded-3xl border-2 m-2' >
          <Link to='add' >Add Student</Link>
        </button>
        <button className='bg-amber-300 hover:bg-purple-400 hover:border-white p-3 text-2xl text- px-8 rounded-3xl border-2 m-2' >
          <Link to='editStudent' >Edit Student</Link>
        </button>
        <button className='bg-amber-300 hover:bg-purple-400 hover:border-white p-3 text-2xl text- px-8 rounded-3xl border-2 m-2'>
           <Link to='showlist'>Show List</Link>
        </button>
        <button className='bg-amber-300 hover:bg-purple-400 hover:border-white p-3 text-2xl text- px-8 rounded-3xl border-2 m-2'>
          <Link to='showcard'>Show Card</Link>
        </button>
    </div>
  )
}

export default StudentNavbar