import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Route, Routes} from 'react-router-dom'
import Admin from './pages/admin'
import Student from './pages/student'
import Attendance from './pages/admin/Attendance'
import Dashboard from './pages/admin/Dashboard'
import StudentInfo from './pages/admin/StudentInfo'
import AdminWelcome from './components/AdminWelcome'
import StudentInfoPage from './components/StudentInfoPage'
import AddStudent from './pages/admin/StudentInfo/AddStudent'
import StudentList from './pages/admin/StudentInfo/StudentList'
import StudentShowCard from './pages/admin/StudentInfo/StudentShowCard'
import Login from './pages/Login'
import api from "./api";
import useStudentStore from "./store/useStudentStore";
import { useNavigate } from 'react-router-dom'




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
    </div>
  );

}

export default App;