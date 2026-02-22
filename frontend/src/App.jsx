import React from 'react'
import axios from 'axios'
import API from './api'


function App() {

  const getData = async ()=> {
  const response = axios.get("http://localhost:8004/students");
  console.log(response)

  }
  return (

    <div className='bg-black p-4 flex justify-between '>   
      <h1 className=' text-2xl text-white '>Student Management System</h1>
      <button  className='p-3 bg-amber-50 text-2xl rounded-3xl px-4' onClick={getData} >CLICK ME</button>
    </div>)
    
  
}

export default App;