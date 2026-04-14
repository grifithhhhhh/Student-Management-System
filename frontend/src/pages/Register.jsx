import api from '../api'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const initialForm = { firstName: '', lastName: '', gender: '', email: '', password: '', confirmPassword: '', imgURL: '' }
  const [form, setForm]           = useState(initialForm)
  const [errors, setErrors]       = useState('')
  const [success, setSuccess]     = useState('')
  const [loading, setLoading]     = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors('')
    setSuccess('')

    if (!form.firstName || !form.lastName || !form.gender || !form.email || !form.password) {
      setErrors('All fields are required')
      return
    }
    if (form.password !== form.confirmPassword) {
      setErrors('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const { confirmPassword, ...payload } = form
      const response = await api.post('/admins', payload)
      if (response.status === 201) {
        setSuccess('Admin account created! Redirecting to login…')
        setTimeout(() => navigate('/'), 1800)
      }
    } catch (err) {
      setErrors(err.response?.data?.msg || 'Registration failed. Email may already be taken.')
      setForm((prev) => ({ ...prev, password: '', confirmPassword: '' }))
    } finally {
      setLoading(false)
    }
  }

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

          <line x1="116" y1="140" x2="212" y2="260" stroke="#4F46E5" strokeOpacity="0.15" strokeWidth="0.5"/>
          <line x1="212" y1="260" x2="340" y2="380" stroke="#4F46E5" strokeOpacity="0.12" strokeWidth="0.5"/>
          <line x1="84"  y1="380" x2="212" y2="260" stroke="#4F46E5" strokeOpacity="0.1"  strokeWidth="0.5"/>
          <line x1="340" y1="380" x2="276" y2="500" stroke="#4F46E5" strokeOpacity="0.15" strokeWidth="0.5"/>
          <line x1="52"  y1="620" x2="180" y2="500" stroke="#4F46E5" strokeOpacity="0.1"  strokeWidth="0.5"/>
          <line x1="276" y1="500" x2="404" y2="620" stroke="#4F46E5" strokeOpacity="0.1"  strokeWidth="0.5"/>

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
              <div className='w-1.5 h-1.5 rounded-full bg-indigo-400' />
              <span className='text-[11px] text-white/60 font-medium tracking-wider uppercase'>Admin Registration</span>
            </div>

            <h1 className='text-5xl font-semibold text-white leading-[1.1] tracking-tight max-w-md mb-4'>
              Create your <span className='text-indigo-400'>admin</span> account
            </h1>

            <p className='text-white/40 text-[14px] leading-relaxed max-w-sm mb-8'>
              Register as an administrator to manage students, courses, and attendance from one dashboard.
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
      <div className='flex-1 flex flex-col items-center justify-center px-12 bg-[#0A0D14] overflow-y-auto'>
        <div className='w-full max-w-[340px] py-8'>

          <div className='mb-8'>
            <h2 className='text-2xl font-semibold text-slate-100 tracking-tight mb-1.5'>Create account</h2>
            <p className='text-[13px] text-slate-500'>Fill in your details to register as admin</p>
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

            {/* First + Last name */}
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5 block'>First name</label>
                <input
                  className='w-full bg-[#13161e] border border-white/5 text-slate-300 text-[13px] placeholder-slate-600 rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500/40 transition-colors'
                  type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder='John'
                />
              </div>
              <div>
                <label className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5 block'>Last name</label>
                <input
                  className='w-full bg-[#13161e] border border-white/5 text-slate-300 text-[13px] placeholder-slate-600 rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500/40 transition-colors'
                  type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder='Doe'
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <p className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-2'>Gender</p>
              <div className='grid grid-cols-3 gap-2'>
                {['Male', 'Female', 'Other'].map((g) => (
                  <label key={g} className='cursor-pointer'>
                    <input type="radio" name="gender" value={g} onChange={handleChange} className='peer hidden' />
                    <div className={`flex items-center justify-center px-3 py-2 rounded-xl border text-[12px] font-medium transition-all
                      ${form.gender === g
                        ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30'
                        : 'bg-[#13161e] text-slate-500 border-white/5 hover:border-white/10 hover:text-slate-300'
                      }`}>
                      {g}
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
                type="email" name="email" value={form.email} onChange={handleChange} placeholder='admin@school.com'
              />
            </div>

            {/* Profile image URL (optional) */}
            <div>
              <label className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5 block'>
                Profile image URL <span className='normal-case text-slate-700'>(optional)</span>
              </label>
              <input
                className='w-full bg-[#13161e] border border-white/5 text-slate-300 text-[13px] placeholder-slate-600 rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500/40 transition-colors'
                type="text" name="imgURL" value={form.imgURL} onChange={handleChange} placeholder='https://...'
              />
            </div>

            {/* Password */}
            <div>
              <label className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5 block'>Password</label>
              <input
                className='w-full bg-[#13161e] border border-white/5 text-slate-300 text-[13px] placeholder-slate-600 rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500/40 transition-colors'
                type="password" name="password" value={form.password}
                autoComplete="new-password" onChange={handleChange} placeholder='••••••••'
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5 block'>Confirm password</label>
              <input
                className='w-full bg-[#13161e] border border-white/5 text-slate-300 text-[13px] placeholder-slate-600 rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500/40 transition-colors'
                type="password" name="confirmPassword" value={form.confirmPassword}
                autoComplete="new-password" onChange={handleChange} placeholder='••••••••'
              />
            </div>

            {/* Error */}
            {errors && (
              <div className='flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3.5 py-2.5'>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#EF4444" className='flex-shrink-0'>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <p className='text-[12px] text-red-400'>{errors}</p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className='flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3.5 py-2.5'>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#34D399" className='flex-shrink-0'>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <p className='text-[12px] text-emerald-400'>{success}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className='w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[13px] font-semibold py-2.5 rounded-xl transition-colors mt-1'
            >
              {loading ? 'Creating account…' : 'Create account →'}
            </button>

          </form>

          {/* Back to login */}
          <p className='text-center text-[12px] text-slate-600 mt-5'>
            Already have an account?{' '}
            <button onClick={() => navigate('/')} className='text-indigo-400 hover:text-indigo-300 transition-colors font-medium'>
              Sign in
            </button>
          </p>

          <p className='text-center text-[11px] text-slate-700 mt-3'>
            StudentHub · Academic Management System
          </p>
        </div>
      </div>

    </div>
  )
}

export default Register