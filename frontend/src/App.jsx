import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Route, Routes} from 'react-router-dom'
import Admin from './pages/Admin'
import Student from './pages/Student'
import Attendance from './pages/admin/Attendance'
import Dashboard from './pages/admin/Dashboard'
import StudentInfo from './pages/admin/StudentInfo'
import AdminWelcome from './components/adminComponents/AdminWelcome'
import StudentInfoPage from './components/adminComponents/StudentInfoPage'
import AddStudent from './pages/admin/StudentInfo/AddStudent'
import StudentList from './pages/admin/StudentInfo/StudentList'
import StudentShowCard from './pages/admin/StudentInfo/StudentShowCard'
import Login from './pages/Login'
import api from "./api";
import useStudentStore from "./store/useStudentStore";
import { useNavigate } from 'react-router-dom'
import Assignments from "./pages/studentPages/Assignments"
import StudentAttendance from './pages/studentPages/StudentAttendance'
import StudentDashboard from './pages/studentPages/StudentDashboard'
import StudentWelcome from './pages/studentPages/StudentWelcome'
import PatchStudent from './pages/admin/StudentInfo/PatchStudent'
import About from './pages/admin/About'
import Courses from './pages/admin/Courses'
import AdminAssignments from './pages/admin/Assignments'
import Settings from './pages/studentPages/Settings'
import Register from './pages/Register'



function App() {
  const logout = useStudentStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await api.get("/check-auth");
      } catch (error) {
        if (error.response?.status === 401) {
          logout();
          navigate("/");
        }
      }
    };

    verifyUser();
  }, []);

  return (
    <div>
       <div>
         
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/student' element={<Student/>} >
            <Route index element={<StudentWelcome/>}/>
            <Route path='studentDashboard' element={<StudentDashboard/>}/>
            <Route path='assignment' element={<Assignments/>}/>
            <Route path='studentattendance' element= {<StudentAttendance/>}/>
            <Route path ='settings' element = {<Settings/>}/>
            </Route>

            <Route path='/admin' element={<Admin/>}>
                    <Route index element={<AdminWelcome />} />
                    <Route path='dashboard' element={<Dashboard/>}/>
                    <Route path='attendance' element={<Attendance/>}/>
                    <Route path='courses' element={<Courses/>}/>
                    <Route path='assignments' element={<AdminAssignments/>}/>
                    <Route path='about' element={<About/>}/>
                    
                    <Route path='studentinfo' element={<StudentInfo/>}>
                    <Route index element={<StudentInfoPage/>}/>
                    <Route path='add' element={<AddStudent/>}/>
                    <Route path='editStudent' element={<PatchStudent/>}/>
                    <Route path='showlist' element={<StudentList/>}/>
                    <Route path='showcard' element={<StudentShowCard/>}/>
                    </Route>
            </Route>
          </Routes>
        </div>
    </div>
  );

}

export default App;