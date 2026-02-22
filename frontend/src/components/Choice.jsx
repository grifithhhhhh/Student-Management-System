import React from 'react'
import {Link} from 'react-router-dom'

const Choice = () => {
  return (
    <div className='bg-black p-10 flex gap-6 justify-center h-screen' >
       <div className='bg-white rounded-4xl text-7xl p-10 text-black flex gap-5 h-fit' >
         <Link to='/admin' >Admin</Link>
         <img className=' w-60 h-60 object-cover' src="https://imgs.search.brave.com/5nbf7_9GdsObWOAlby2tbtUnATJs_eMKkAW35Y9XwUE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTkv/NjA4Lzc3OS9zbWFs/bC92aWJyYW50LWFy/dGlzdGljLXRlYWNo/ZXItZXhwbGFpbmlu/Zy1sZXNzb24tZW50/aHVzaWFzdGljLWdl/c3R1cmUtNGstZnJl/ZS1wbmcucG5n" alt="" />
       </div>
        <div className='bg-white rounded-4xl text-7xl p-10 text-black flex gap-5 h-fit'>
            <Link to='/student'>Student</Link>
            <img className=' w-60 h-60 object-cover' src="https://imgs.search.brave.com/Ha8APhz3WeYGfgJrucrpS0yX_S0vyWCUBlhoJwTyWms/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzgv/MjUyLzA5Ny9zbWFs/bC9haS1nZW5lcmF0/ZWQtYXNpYW4tZmVt/YWxlLXN0dWRlbnQt/c21pbGluZy1oYXBw/aWx5LW9uLXRyYW5z/cGFyZW50LWJhY2tn/cm91bmQtc3R1ZHkt/c3VjY2Vzcy1jb25j/ZXB0LXBuZy5wbmc" alt="" />
        </div>
        
    </div>
  )
}

export default Choice