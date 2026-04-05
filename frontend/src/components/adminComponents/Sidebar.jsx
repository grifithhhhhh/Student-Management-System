import React from 'react'
import {Link} from 'react-router-dom'
import useStudentStore from "../../store/useStudentStore";
import axios from 'axios'
import { LayoutDashboard,BookOpenCheck, Users , Album, Info, LogOut} from 'lucide-react';

const Sidebar = () => {
const { logout } = useStudentStore();
  const user = useStudentStore((state) => state.user);
  if (!user) {
  return null;
}
  const logoutSession = async ()=>{
    try{
      await axios.post("http://localhost:8004/logout", {}, { withCredentials: true });
      logout();
    }catch(err){
      return res.status(404).json({msg: err})
    }
  }
  
  return (
  <div className="flex flex-col w-70 min-w-[240px] bg-[#0d1117] p-4 gap-3 border-r border-white/8 text-white font-medium h-screen">
    
    {/* Brand */}
    <div className="flex items-center gap-2.5 px-2 py-3 mb-2 border-b border-white/8">
      <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-900/40">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
          <path d="M12 3L1 9l4 2.18V15c0 3 3.58 5 7 5s7-2 7-5v-3.82L23 9zm0 12.35c-2.5 0-5-1.04-5-2.35v-1.18l5 2.28 5-2.28V13c0 1.31-2.5 2.35-5 2.35z"/>
        </svg>
      </div>
      <h1 className="text-[15px] font-semibold text-white tracking-tight">Student Hub</h1>
    </div>

    {/* Nav section label */}
    <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 font-semibold px-2 mt-1">Navigation</p>

    {/* Nav links */}
    <div className="h-fit flex flex-col gap-0.5 p-0">

      <Link
        to="dashboard"
        className="flex gap-3 text-white/50 hover:text-white hover:bg-white/6 rounded-xl w-full px-3 py-2.5 items-center justify-start text-[13px] font-medium transition-all duration-150 no-underline"
      >
        <LayoutDashboard size={16} />
        Dashboard
      </Link>

      <Link
        to="attendance"
        className="flex gap-3 text-white/50 hover:text-white hover:bg-white/6 rounded-xl w-full px-3 py-2.5 items-center justify-start text-[13px] font-medium transition-all duration-150 no-underline"
      >
        <BookOpenCheck size={16} />
        Attendance
      </Link>

      <Link
        to="studentinfo"
        className="flex gap-3 text-white/50 hover:text-white hover:bg-white/6 rounded-xl w-full px-3 py-2.5 items-center justify-start text-[13px] font-medium transition-all duration-150 no-underline"
      >
        <Users size={16} />
        Students
      </Link>
       
      {/*
      <Link
        to="courses"
        className="flex gap-3 text-white/50 hover:text-white hover:bg-white/6 rounded-xl w-full px-3 py-2.5 items-center justify-start text-[13px] font-medium transition-all duration-150 no-underline"
      >
        <Album size={16} />
        Courses
      </Link>*/ }
      

      <Link
        to="assignments"
        className="flex gap-3 text-white/50 hover:text-white hover:bg-white/6 rounded-xl w-full px-3 py-2.5 items-center justify-start text-[13px] font-medium transition-all duration-150 no-underline"
      >
        <Album size={16} />
        Assignments
      </Link>

      <Link
        to="about"
        className="flex gap-3 text-white/50 hover:text-white hover:bg-white/6 rounded-xl w-full px-3 py-2.5 items-center justify-start text-[13px] font-medium transition-all duration-150 no-underline"
      >
        <Info size={16} />
        About
      </Link>

    </div>

    {/* Logout — pushed to bottom */}
    <div className="mt-auto mb-3">
      <Link
        onClick={logoutSession}
        to="/"
        className="flex gap-3 text-red-400/70 hover:text-red-400 hover:bg-red-500/8 rounded-xl w-full px-3 py-2.5 items-center justify-start text-[13px] font-medium transition-all duration-150 no-underline"
      >
        <LogOut size={16} />
        Logout
      </Link>
    </div>

    {/* User card */}
    <div className="flex flex-col p-3 bg-white/4 border border-white/8 rounded-2xl items-center gap-3">
      <img
        className="w-40 rounded-xl object-cover object-top"
        src="https://miro.medium.com/0*A7MUqyCLvZDcHkfM.jpg"
        alt=""
      />
      <div className="flex flex-col items-center gap-0.5 pb-1">
        <h1 className="text-[13px] font-semibold text-white">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-[11px] text-white/35">Admin</p>
      </div>
    </div>

  </div>
);
}

export default Sidebar