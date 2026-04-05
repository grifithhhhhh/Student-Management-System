import React from 'react'
import { Mail, Bell, Search } from 'lucide-react'
import useStudentStore from '../../store/useStudentStore'

const Navbar = () => {
  const students = useStudentStore((state) => state.students);

  return (
    <header className='flex items-center justify-between px-6 py-3.5 bg-[#13161e] border-b border-white/5 flex-shrink-0'
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Left: page context */}
      <div>
        <h1 className='text-[16px] font-semibold text-slate-200 tracking-tight leading-none'>
          Welcome back{students ? `, ${students.firstName}` : ''} 👋
        </h1>
        <p className='text-[11px] text-slate-500 mt-0.5'>AY 2025–26 · Semester 2</p>
      </div>

      {/* Right: actions */}
      <div className='flex items-center gap-2.5'>

        {/* Search */}
        <div className='flex items-center gap-2 bg-[#0d0f14] border border-white/[0.06] hover:border-white/10 rounded-xl px-3 py-2 w-52 transition-colors'>
          <Search size={14} color="#475569" strokeWidth={2} />
          <input
            className='bg-transparent outline-none border-none text-slate-300 text-[13px] placeholder-slate-600 w-full'
            type="text"
            placeholder='Search...'
          />
        </div>

        <div className='w-px h-5 bg-white/5 mx-0.5' />

        {/* Mail */}
        <button className='w-9 h-9 flex items-center justify-center bg-[#0d0f14] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:border-white/10 transition-all group'>
          <Mail size={15} className='text-slate-500 group-hover:text-slate-300 transition-colors' />
        </button>

        {/* Bell */}
        <button className='relative w-9 h-9 flex items-center justify-center bg-[#0d0f14] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:border-white/10 transition-all group'>
          <Bell size={15} className='text-slate-500 group-hover:text-slate-300 transition-colors' />
          <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#13161e]' />
        </button>

        <div className='w-px h-5 bg-white/5 mx-0.5' />

        {/* Student avatar */}
        {students && (
          <div className='flex items-center gap-2 pl-1'>
            {students.imgURL ? (
              <img src={students.imgURL} alt=""
                className='w-8 h-8 rounded-full object-cover flex-shrink-0'
                style={{ border: '2px solid rgba(79,70,229,0.3)' }} />
            ) : (
              <div className='w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0'>
                <span className='text-[10px] font-semibold text-indigo-400'>
                  {students.firstName?.[0]}{students.lastName?.[0]}
                </span>
              </div>
            )}
            <div className='hidden sm:block'>
              <p className='text-[12px] font-medium text-slate-300 leading-none'>{students.firstName} {students.lastName}</p>
              <p className='text-[10px] text-slate-600 mt-0.5'>Student</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;