import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Add Student',  to: 'add',         icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg> },
  { label: 'Edit Student', to: 'editStudent',  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg> },
  { label: 'Show List',    to: 'showlist',     icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg> },
  { label: 'Show Cards',   to: 'showcard',     icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg> },
]

const StudentNavbar = () => {
  const location = useLocation()

  return (
    <div className='flex items-center gap-1 mb-6 bg-[#13161e] border border-white/5 rounded-2xl p-1.5 w-fit'>
      {NAV_ITEMS.map(({ label, to, icon }) => {
        const active = location.pathname.includes(to)
        return (
          <Link key={to} to={to} className='no-underline'>
            <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all border
              ${active
                ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/20'
                : 'bg-transparent text-slate-500 border-transparent hover:bg-white/5 hover:text-slate-300'
              }`}
            >
              {icon}
              {label}
            </button>
          </Link>
        )
      })}
    </div>
  )
}

export default StudentNavbar