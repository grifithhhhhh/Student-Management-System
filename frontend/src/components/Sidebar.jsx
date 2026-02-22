import React from 'react'
import {Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex flex-col w-1/6 bg-black  p-4 gap-3  text-white rounded-3xl m-5 '>
        <h1>Student Hub</h1>

        <div className=' h-1/4 flex flex-col gap-3 p-2 justify-center items-center'>
           <div className=' flex bg-amber-300 rounded-3xl w-full p-2 items-center justify-center'>
            <Link to='dashboard' >Dashboard</Link>
           </div>
           <div className=' flex bg-amber-300 rounded-3xl w-full p-2 items-center justify-center'><Link to='attendance' >Attendance</Link></div>
           <div className=' flex bg-amber-300 rounded-3xl w-full p-2 items-center justify-center'><Link to='studentinfo' >Students</Link></div>

        </div>
        <div className=' h-1/4 flex flex-col p-2 gap-3'>
            <h1 className=' flex bg-amber-300 rounded-3xl w-full p-2 items-center justify-center'>Settings</h1>
            <h1 className=' flex bg-amber-300 rounded-3xl w-full p-2 items-center justify-center'>Help</h1>
            <h1 className='flex bg-amber-300 rounded-3xl w-full p-2 items-center justify-center'>Logout</h1>
        </div>
        <div className='flex flex-col p-4 h-full bg-[#b0e4fe] rounded-3xl  items-center justify-center  border '>
            <img className=' w-30 h-30 rounded-full object-cover' src="https://imgs.search.brave.com/qaGzbuPF38DRS2NxetjT7Gn5z-V2fXZI8i5TOOsdHRA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTAx/OTg5NTM3MC9waG90/by9wcm9maWxlLXNo/b3Qtb2YtYmVhdXRp/ZnVsLXlvdW5nLW1h/bi1zaG90LW9uLXN0/dWRpby5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9bjVqd3Jp/VHE4dTFiaFI5T3Zn/YkRtQUxrQ2hQdkJR/ek1lb2xlNGtUVDdC/ND0" alt="" />
            <h1>Admin name</h1>
        </div>
    </div>
  )
}

export default Sidebar