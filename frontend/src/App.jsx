import React, { useState } from 'react'
import axios from 'axios'
import {Route, Routes} from 'react-router-dom'
import Admin from './pages/admin'
import Student from './pages/student'
import Choice from './components/Choice'
import Attendance from './pages/admin/Attendance'
import Dashboard from './pages/admin/Dashboard'
import StudentInfo from './pages/admin/StudentInfo'
import AdminWelcome from './components/AdminWelcome'
import StudentInfoPage from './components/StudentInfoPage'
import AddStudent from './pages/admin/StudentInfo/AddStudent'
import StudentList from './pages/admin/StudentInfo/StudentList'
import StudentShowCard from './pages/admin/StudentInfo/StudentShowCard'



function App() {
  
  return (
        <div>
         
          <Routes>
            <Route path='/' element={<Choice/>} />
            <Route path='/student' element={<Student/>} />

            <Route path='/admin' element={<Admin/>}>
                    <Route index element={<AdminWelcome />} />
                    <Route path='dashboard' element={<Dashboard/>}/>
                    <Route path='attendance' element={<Attendance/>}/>
                    
                    <Route path='studentinfo' element={<StudentInfo/>}>
                    <Route index element={<StudentInfoPage/>}/>
                    <Route path='add' element={<AddStudent/>}/>
                    <Route path='showlist' element={<StudentList/>}/>
                    <Route path='showcard' element={<StudentShowCard/>}/>
                    </Route>
            </Route>
          </Routes>
        </div>
    )
    
  
}

export default App;