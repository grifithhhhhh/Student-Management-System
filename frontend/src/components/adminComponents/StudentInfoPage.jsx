import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const StudentInfoPage = () => {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      setTime(`${h}:${m}`)
      const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      setDate(`${days[now.getDay()]} · ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const cards = [
    { label: 'Add Students', sub: 'Manage records', to: 'add' },
    { label: 'Edit Student', sub: 'View & update', to: 'editStudent' },
    { label: 'Show List', sub: 'Analytics & exports', to: 'showlist' },
    { label: 'Show Cards', sub: 'System config', to: 'showcard' },
  ]

  return (
    <div className="relative w-full h-screen bg-[#080a0f] text-white overflow-hidden font-sans">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(79,142,247,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(79,142,247,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none animate-pulse"
        style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.09) 0%, transparent 70%)' }} />

      <div className="relative z-10 flex flex-col justify-between h-full px-10 py-8">
        {/* Top bar */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg border border-blue-500/60 flex items-center justify-center shadow-[0_0_14px_rgba(79,142,247,0.3)]">
              🎓
            </div>
            <span className="text-xs tracking-[4px] uppercase text-slate-500 font-medium">StudentHub</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[11px] uppercase tracking-widest text-slate-500 bg-[#0e1117] border border-[#1e2330] rounded-full px-4 py-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#22c55e] animate-pulse inline-block" />
              System Online
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] tracking-[4px] uppercase text-blue-400 font-medium">// Admin Dashboard</p>
          <h1 className="font-black leading-none text-[clamp(64px,8vw,110px)] tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Welcome<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(79,142,247,0.5)' }}>Admin</span>
          </h1>
          <p className="mt-3 text-base text-slate-500 font-light max-w-sm">
            Everything is in order. Select a module below to get started.
          </p>
        </div>

        {/* Cards */}
        <div className="flex gap-3">
          {cards.map(({ label, sub, to }) => (
            <Link key={label} to={to}
              className="group bg-[#0e1117] border border-[#1e2330] rounded-xl px-6 py-5 flex items-center gap-4 min-w-[190px] hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(79,142,247,0.12)] transition-all duration-200 relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, rgba(79,142,247,0.07), transparent)' }} />
              <div className="flex-1 relative z-10">
                <div className="text-sm font-medium text-white">{label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{sub}</div>
              </div>
              <span className="text-slate-500 text-lg group-hover:translate-x-1 group-hover:text-blue-400 transition-all duration-200 relative z-10">›</span>
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-end">
          <div className="flex gap-8 items-center">
            {[['1,248', 'Students'], ['94.2%', 'Attendance'], ['38', 'Classes']].map(([num, label], i) => (
              <React.Fragment key={label}>
                {i > 0 && <div className="w-px h-9 bg-[#1e2330]" />}
                <div>
                  <div className="text-2xl font-black leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{num}</div>
                  <div className="text-[10px] uppercase tracking-[2px] text-slate-500 mt-1">{label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="text-right">
            <div className="text-3xl leading-none text-slate-500 tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{time}</div>
            <div className="text-[10px] uppercase tracking-[2px] text-slate-600 mt-1">{date}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentInfoPage