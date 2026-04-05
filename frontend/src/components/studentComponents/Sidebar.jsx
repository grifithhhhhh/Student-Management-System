import React from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import useStudentStore from "../../store/useStudentStore";

const NAV = [
  {
    label: 'Dashboard', to: 'studentDashboard',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
  },
  {
    label: 'Attendance', to: 'studentattendance',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>
  },
  {
    label: 'Assignment', to: 'assignment',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
  },
  {
    label: 'Settings', to: 'settings',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
  },
  
]

const Sidebar = () => {
  const students = useStudentStore((state) => state.students);
  const { logout } = useStudentStore();
  const location = useLocation();

  if (!students) return null;

  const logoutSession = async () => {
    try {
      await axios.post("http://localhost:8004/logout", {}, { withCredentials: true });
      logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className='flex flex-col h-full bg-[#0d0f14] border-r border-white/5 flex-shrink-0'
      style={{ width: '220px', minWidth: '220px', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Brand */}
      <div className='flex items-center gap-2.5 px-5 py-5 border-b border-white/5'>
        <div className='w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0'>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 3L1 9l4 2.18V15c0 3 3.58 5 7 5s7-2 7-5v-3.82L23 9zm0 12.35c-2.5 0-5-1.04-5-2.35v-1.18l5 2.28 5-2.28V13c0 1.31-2.5 2.35-5 2.35z"/>
          </svg>
        </div>
        <div>
          <p className='text-[13px] font-semibold text-slate-200 leading-none'>StudentHub</p>
          <p className='text-[9px] text-slate-600 uppercase tracking-widest mt-0.5'>Student Portal</p>
        </div>
      </div>

      {/* Nav */}
      <nav className='flex flex-col gap-0.5 px-3 py-4 flex-1'>
        <p className='text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-600 px-2 mb-2'>Menu</p>
        {NAV.map(({ label, to, icon }) => {
          const active = location.pathname.includes(to);
          return (
            <Link key={to} to={to} className='no-underline'>
              <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all
                ${active
                  ? 'bg-indigo-600/15 text-indigo-400'
                  : 'text-slate-500 hover:bg-white/[0.04] hover:text-slate-300'
                }`}>
                {icon}
                {label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className='px-3 pb-3'>
        <Link to='/' onClick={logoutSession} className='no-underline'>
          <div className='flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-red-500/70 hover:bg-red-500/[0.08] hover:text-red-400 transition-all'>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            Logout
          </div>
        </Link>
      </div>

      {/* Student card */}
      <div className='mx-3 mb-4 bg-[#13161e] border border-white/5 rounded-2xl p-3 flex items-center gap-3'>
        {students.imgURL ? (
          <img src={students.imgURL} alt=""
            className='w-9 h-9 rounded-full object-cover border-2 flex-shrink-0'
            style={{ borderColor: 'rgba(79,70,229,0.3)' }} />
        ) : (
          <div className='w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0'>
            <span className='text-[11px] font-semibold text-indigo-400'>
              {students.firstName?.[0]}{students.lastName?.[0]}
            </span>
          </div>
        )}
        <div className='min-w-0'>
          <p className='text-[12px] font-medium text-slate-300 truncate leading-none'>
            {students.firstName} {students.lastName}
          </p>
          <p className='text-[10px] text-slate-600 mt-0.5'>Student</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;