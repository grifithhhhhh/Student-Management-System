import React from 'react'
import { Mail, Bell, Search, Github } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='flex p-4 w-full mt-2 justify-between items-center bg-[#13161e] rounded-2xl border border-white/5'>

      {/* Left: greeting */}
      <div className='flex flex-col gap-0.5 p-1'>
        <p className='text-[10px] uppercase tracking-widest text-slate-500 font-semibold'>Welcome back</p>
        <h1 className='text-xl text-white font-semibold leading-tight'>Greetings, Admin 👋</h1>
      </div>

      {/* Right: actions */}
      <div className='flex gap-3 items-center mx-5'>

        {/* Search */}
        <div className='flex items-center gap-2 bg-[#0d0f14] border border-white/5 rounded-xl px-3 py-2.5 w-72'>
          <Search size={15} color="#475569" strokeWidth={2} />
          <input
            className='bg-transparent outline-none border-none text-slate-300 text-sm placeholder-slate-600 w-full'
            type="text"
            placeholder='Search here...'
          />
        </div>

        {/* Mail */}
        <button className='w-10 h-10 flex items-center justify-center bg-[#0d0f14] border border-white/5 rounded-xl hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer'>
          <Mail size={17} color="#475569" />
        </button>

        {/* Bell */}
        <button className='relative w-10 h-10 flex items-center justify-center bg-[#0d0f14] border border-white/5 rounded-xl hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer'>
          <Bell size={17} color="#475569" />
          <span className='absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-[#13161e]' />
        </button>

      </div>
    </div>
  )
}

export default Navbar