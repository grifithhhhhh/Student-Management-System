import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const cards = [
  { label: 'Dashboard',   desc: 'Manage records',     to: 'dashboard',   icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
  { label: 'Attendance', desc: 'View & update',       to: 'attendance', icon: 'M3 4h18v18H3V4zM16 2v4M8 2v4M3 10h18' },
  { label: 'Students',    desc: 'Analytics & exports', to: 'studentinfo',    icon: 'M18 20V10M12 20V4M6 20v-6' },
  { label: 'Assignments',   desc: 'Assing Work',       to: 'assignments',   icon: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14' },
]

export default function AdminWelcome() {
  const [time, setTime] = useState('--:--')
  const [date, setDate] = useState('')

  useEffect(() => {
    const tick = () => {
      const n = new Date()
      const h = String(n.getHours()).padStart(2, '0')
      const m = String(n.getMinutes()).padStart(2, '0')
      setTime(`${h}:${m}`)
      const D = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
      const M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      setDate(`${D[n.getDay()]} · ${M[n.getMonth()]} ${n.getDate()}, ${n.getFullYear()}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#07080d] text-white flex flex-col gap-0 px-11 py-9 overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Grid */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(99,120,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(99,120,255,.035) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
      {/* Orbs */}
      <div className="fixed w-[560px] h-[560px] rounded-full pointer-events-none -top-20 -left-24"
        style={{ background: 'radial-gradient(circle,rgba(99,120,255,.11) 0%,transparent 68%)' }} />
      <div className="fixed w-96 h-96 rounded-full pointer-events-none bottom-0 right-16"
        style={{ background: 'radial-gradient(circle,rgba(168,100,255,.08) 0%,transparent 70%)' }} />

      {/* Topbar */}
      <div className="relative z-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-[34px] h-[34px] rounded-[9px] border border-[rgba(99,120,255,.35)] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(99,120,255,.9)" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <span className="text-[13px] tracking-[.2em] uppercase text-white/25"
            style={{ fontFamily: "'Syne', sans-serif" }}>StudentHub</span>
        </div>
        <div className="flex gap-2.5">
          <span className="text-[11px] tracking-widest uppercase text-white/28 border border-white/7 rounded-full px-3.5 py-1.5 flex items-center gap-1.5">
            <span className="w-[5px] h-[5px] rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse inline-block" />
            Online
          </span>
          <span className="text-[11px] tracking-widest uppercase text-white/28 border border-white/7 rounded-full px-3.5 py-1.5">v2.4</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative z-10 flex-1 flex flex-col justify-center py-12">
        <div className="text-[11px] tracking-[.35em] uppercase text-[rgba(99,120,255,.8)] mb-5 flex items-center gap-2.5">
          <span className="block w-7 h-px bg-[rgba(99,120,255,.5)]" />Admin portal
        </div>
        <h1 className="leading-[.94] tracking-tight mb-6"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(52px,7vw,96px)', fontWeight: 800 }}>
          <span className="block text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,.15)' }}>Welcome</span>
          <span className="block text-white">Admin.</span>
        </h1>
        <p className="text-[15px] font-light text-white/35 max-w-sm leading-[1.65] tracking-[.01em]">
          Your dashboard is live. Everything looks good — pick a section to continue.
        </p>
      </div>

      {/* Divider */}
      <div className="relative z-10 w-full h-px my-0 mb-6"
        style={{ background: 'linear-gradient(90deg,rgba(99,120,255,.2),transparent)' }} />

      {/* Cards */}
      <div className="relative z-10 flex gap-3">
        {cards.map(({ label, desc, to, icon }) => (
          <Link key={label} to={to}
            className="group flex-1 bg-white/[.03] border border-white/[.06] rounded-2xl p-5 flex flex-col gap-3 hover:border-[rgba(99,120,255,.28)] hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,.5)] transition-all duration-200 relative overflow-hidden cursor-pointer no-underline">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg,rgba(99,120,255,.06),transparent)' }} />
            <div className="w-9 h-9 rounded-[10px] bg-[rgba(99,120,255,.1)] border border-[rgba(99,120,255,.2)] flex items-center justify-center relative z-10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(99,120,255,.85)" strokeWidth="1.8">
                <path d={icon} />
              </svg>
            </div>
            <div className="flex-1 relative z-10">
              <div className="text-[13px] font-medium text-white/85">{label}</div>
              <div className="text-[11px] text-white/28 tracking-[.03em] mt-0.5">{desc}</div>
            </div>
            <div className="text-[16px] text-[rgba(99,120,255,.4)] group-hover:text-[rgba(99,120,255,.9)] group-hover:translate-x-0.5 transition-all duration-200 self-end relative z-10">›</div>
          </Link>
        ))}
      </div>

      <div className="h-7" />

      {/* Footer */}
      <div className="relative z-10 flex justify-between items-end">
        <div className="flex">
          {[['1,248','Students'],['94.2%','Attendance'],['38','Classes']].map(([num, lbl], i) => (
            <div key={lbl} className={`${i > 0 ? 'pl-7 border-l border-white/[.06]' : ''} pr-7`}>
              <div className="text-[26px] font-bold text-white leading-none"
                style={{ fontFamily: "'Syne', sans-serif" }}>{num}</div>
              <div className="text-[10px] uppercase tracking-[.18em] text-white/22 mt-1">{lbl}</div>
            </div>
          ))}
        </div>
        <div className="text-right">
          <div className="text-[32px] font-bold text-white/18 tracking-[.12em] leading-none"
            style={{ fontFamily: "'Syne', sans-serif" }}>{time}</div>
          <div className="text-[10px] uppercase tracking-[.18em] text-white/14 mt-0.5">{date}</div>
        </div>
      </div>
    </div>
  )
}