import axios from 'axios'
import api from '../api'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStudentStore from '../store/useStudentStore';

const Login = () => {
  const loginStudent = useStudentStore((state) => state.loginStudent);
  const loginAdmin   = useStudentStore((state) => state.loginAdmin);
  const navigate     = useNavigate()

  const initialUser = { email: "", password: "", role: "" }
  const [LoginErrors, setLoginErrors] = useState("")
  const [student, setstudent]         = useState(initialUser)
  const [loading, setLoading]         = useState(false)

  const handleClick = (e) => setstudent({ ...student, [e.target.name]: e.target.value })

  const buttonClicked = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await api.post("/logininfo", student, { withCredentials: true });
      if (response.status === 200) {
        if (student.role === "admin")   { loginAdmin(response.data.Data);                navigate('/admin') }
        if (student.role === "student") { loginStudent(response.data.student, "student"); navigate('/student') }
      }
    } catch (error) {
      setLoginErrors(error.response?.data.msg || "Invalid credentials")
      setstudent(initialUser)
    } finally {
      setLoading(false)
    }
  };

  const ROWS = 22
  const COLS = 18
  const ACCENT_POSITIONS = new Set([
    '3-4','3-12','6-7','6-15','9-2','9-10','12-5','12-13','15-1','15-8','15-16','18-3','18-11','21-6','21-14'
  ])

  return (
    <div className='w-screen h-screen bg-[#0A0D14] flex overflow-hidden' style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Left panel — dot matrix ── */}
      <div className='relative w-[58%] h-full overflow-hidden bg-[#0A0D14]'>

        <svg className='absolute inset-0 w-full h-full' viewBox="0 0 540 820" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="fadeBot" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0A0D14" stopOpacity="0"/>
              <stop offset="65%"  stopColor="#0A0D14" stopOpacity="0.75"/>
              <stop offset="100%" stopColor="#0A0D14" stopOpacity="1"/>
            </linearGradient>
            <linearGradient id="fadeTop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#0A0D14" stopOpacity="1"/>
              <stop offset="25%" stopColor="#0A0D14" stopOpacity="0"/>
            </linearGradient>
          </defs>

          {/* dot grid */}
          {Array.from({ length: ROWS }, (_, row) =>
            Array.from({ length: COLS }, (_, col) => {
              const key = `${row}-${col}`
              const isAccent = ACCENT_POSITIONS.has(key)
              return (
                <circle
                  key={key}
                  cx={col * 32 + 20}
                  cy={row * 40 + 20}
                  r={isAccent ? 2 : 1.2}
                  fill={isAccent ? '#4F46E5' : '#818CF8'}
                  fillOpacity={isAccent ? 0.6 : 0.13}
                />
              )
            })
          )}

          {/* connector lines between accent dots */}
          <line x1="116" y1="140" x2="212" y2="260" stroke="#4F46E5" strokeOpacity="0.15" strokeWidth="0.5"/>
          <line x1="212" y1="260" x2="340" y2="380" stroke="#4F46E5" strokeOpacity="0.12" strokeWidth="0.5"/>
          <line x1="84"  y1="380" x2="212" y2="260" stroke="#4F46E5" strokeOpacity="0.1"  strokeWidth="0.5"/>
          <line x1="340" y1="380" x2="276" y2="500" stroke="#4F46E5" strokeOpacity="0.15" strokeWidth="0.5"/>
          <line x1="52"  y1="620" x2="180" y2="500" stroke="#4F46E5" strokeOpacity="0.1"  strokeWidth="0.5"/>
          <line x1="276" y1="500" x2="404" y2="620" stroke="#4F46E5" strokeOpacity="0.1"  strokeWidth="0.5"/>

          {/* fade overlays */}
          <rect x="0" y="0" width="540" height="820" fill="url(#fadeBot)"/>
          <rect x="0" y="0" width="540" height="100" fill="url(#fadeTop)"/>
        </svg>

        {/* Branding content */}
        <div className='absolute inset-0 flex flex-col justify-between p-12'>

          {/* Logo */}
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0'>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 3L1 9l4 2.18V15c0 3 3.58 5 7 5s7-2 7-5v-3.82L23 9zm0 12.35c-2.5 0-5-1.04-5-2.35v-1.18l5 2.28 5-2.28V13c0 1.31-2.5 2.35-5 2.35z"/>
              </svg>
            </div>
            <span className='text-white font-semibold text-[15px] tracking-tight'>StudentHub</span>
          </div>

          {/* Bottom headline */}
          <div>
            <div className='inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-full px-3 py-1.5 mb-5'>
              <div className='w-1.5 h-1.5 rounded-full bg-emerald-400' />
              <span className='text-[11px] text-white/60 font-medium tracking-wider uppercase'>AY 2025–26 · Active</span>
            </div>

            <h1 className='text-5xl font-semibold text-white leading-[1.1] tracking-tight max-w-md mb-4'>
              Manage your <span className='text-indigo-400'>students</span> smarter
            </h1>

            <p className='text-white/40 text-[14px] leading-relaxed max-w-sm mb-8'>
              Track attendance, grades, and assignments — all from one clean dashboard.
            </p>

            {/* Stats */}
            <div className='flex gap-8'>
              {[['482', 'Students'], ['18', 'Courses'], ['91%', 'Avg. attendance']].map(([n, l]) => (
                <div key={l}>
                  <p className='text-2xl font-semibold text-white tracking-tight leading-none'
                    style={{ fontFamily: "'DM Mono', monospace" }}>{n}</p>
                  <p className='text-[10px] text-white/30 mt-1 uppercase tracking-widest'>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className='flex-1 flex flex-col items-center justify-center px-12 bg-[#0A0D14]'>
        <div className='w-full max-w-[340px]'>

          <div className='mb-8'>
            <h2 className='text-2xl font-semibold text-slate-100 tracking-tight mb-1.5'>Welcome back</h2>
            <p className='text-[13px] text-slate-500'>Sign in to your account to continue</p>
          </div>

          <form onSubmit={buttonClicked} className='flex flex-col gap-4'>

            {/* Role selector */}
            <div>
              <p className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-2'>Sign in as</p>
              <div className='grid grid-cols-2 gap-2'>
                {['student', 'admin'].map((role) => (
                  <label key={role} className='cursor-pointer'>
                    <input type="radio" name="role" value={role} onChange={handleClick} className='peer hidden' />
                    <div className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-[13px] font-medium transition-all
                      ${student.role === role
                        ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30'
                        : 'bg-[#13161e] text-slate-500 border-white/5 hover:border-white/10 hover:text-slate-300'
                      }`}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        {role === 'student'
                          ? <path d="M12 3L1 9l4 2.18V15c0 3 3.58 5 7 5s7-2 7-5v-3.82L23 9z"/>
                          : <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        }
                      </svg>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5 block'>Email</label>
              <input
                className='w-full bg-[#13161e] border border-white/5 text-slate-300 text-[13px] placeholder-slate-600 rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500/40 transition-colors'
                type="text" value={student.email} onChange={handleClick} name='email' placeholder='your@email.com'
              />
            </div>

            {/* Password */}
            <div>
              <label className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5 block'>Password</label>
              <input
                className='w-full bg-[#13161e] border border-white/5 text-slate-300 text-[13px] placeholder-slate-600 rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500/40 transition-colors'
                type="password" value={student.password}
                autoComplete="off" spellCheck={false} autoCorrect="off" autoCapitalize="off"
                onChange={handleClick} name='password' placeholder='••••••••'
              />
            </div>

            {/* Error */}
            {LoginErrors && (
              <div className='flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3.5 py-2.5'>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#EF4444" className='flex-shrink-0'>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <p className='text-[12px] text-red-400'>{LoginErrors}</p>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={buttonClicked}
              disabled={loading}
              className='w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[13px] font-semibold py-2.5 rounded-xl transition-colors mt-1'
            >
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>

          </form>

          <p className='text-center text-[11px] text-slate-700 mt-6'>
            StudentHub · Academic Management System
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login