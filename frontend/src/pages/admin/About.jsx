import React from 'react'

const FEATURES = [
  {
    color: 'rgba(99,102,241,0.12)', icon: '#818CF8',
    title: 'Student management',
    desc: 'Add, edit, and remove students with full profile support — photo, courses, and credentials.',
    path: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'
  },
  {
    color: 'rgba(16,185,129,0.1)', icon: '#10B981',
    title: 'Attendance tracking',
    desc: 'Mark present or absent per student per class. Auto percentage calculation in real time.',
    path: 'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z'
  },
  {
    color: 'rgba(245,158,11,0.1)', icon: '#F59E0B',
    title: 'Assignments',
    desc: 'Create, assign, and delete coursework. Set due dates tied to specific courses.',
    path: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'
  },
  {
    color: 'rgba(6,182,212,0.1)', icon: '#06B6D4',
    title: 'Marks & grades',
    desc: 'Update student marks per course inline. GPA computed automatically across all subjects.',
    path: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z'
  },
  {
    color: 'rgba(239,68,68,0.08)', icon: '#EF4444',
    title: 'Role-based access',
    desc: 'Admins control everything. Students see only their own data. Sessions secured with cookies.',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'
  },
  {
    color: 'rgba(139,92,246,0.1)', icon: '#8B5CF6',
    title: 'Live dashboard',
    desc: 'Real-time overview of enrollment stats, attendance rates, and GPA at a glance.',
    path: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z'
  },
]

const STATS = [
  { n: '482', l: 'Students enrolled' },
  { n: '91%', l: 'Avg. attendance' },
  { n: '18',  l: 'Active courses' },
  { n: '3.74',l: 'Average GPA' },
]

const TECH = [
  { label: 'React',         hi: true },
  { label: 'Zustand',       hi: true },
  { label: 'TailwindCSS',   hi: true },
  { label: 'Express.js',    hi: false },
  { label: 'MongoDB',       hi: false },
  { label: 'Axios',         hi: false },
  { label: 'React Router',  hi: false },
  { label: 'TanStack Table',hi: false },
]

const TIMELINE = [
  { dot: '#4F46E5', title: 'Admin logs in',        desc: 'Secure cookie-based session authentication on login.' },
  { dot: '#06B6D4', title: 'Students are enrolled', desc: 'Admin adds students and assigns them to multiple courses at once.' },
  { dot: '#10B981', title: 'Attendance is marked',  desc: 'Per-student, per-class attendance updated live via API.' },
  { dot: '#F59E0B', title: 'Marks are entered',     desc: 'Marks saved per course, GPA recalculated instantly in store.' },
  { dot: '#8B5CF6', title: 'Dashboard updates',     desc: 'All stats reflect in real time — no page refresh needed.' },
]

const About = () => {
  return (
    <div className='bg-[#0a0d14] text-slate-200 min-h-screen px-12 py-16 font-sans'
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Badge */}
      <div className='inline-flex items-center gap-2 bg-[#13161e] border border-indigo-500/20 rounded-full px-4 py-1.5 mb-7'>
        <div className='w-1.5 h-1.5 rounded-full bg-indigo-500' />
        <span className='text-[11px] font-medium text-indigo-400 tracking-wider uppercase'>About StudentHub</span>
      </div>

      {/* Hero */}
      <h1 className='text-5xl font-semibold leading-[1.1] tracking-tight text-slate-100 max-w-xl mb-5'>
        The smarter way to <span className='text-indigo-400'>manage students</span>
      </h1>
      <p className='text-[15px] text-slate-500 leading-relaxed max-w-lg mb-14'>
        StudentHub is a full-stack academic management system built for educators who want clarity — not complexity. Track attendance, grades, and assignments all in one place.
      </p>

      {/* Stats strip */}
      <div className='flex border border-white/[0.06] rounded-2xl overflow-hidden max-w-2xl mb-16'>
        {STATS.map((s, i) => (
          <div key={i} className={`flex-1 px-7 py-6 ${i < STATS.length - 1 ? 'border-r border-white/[0.06]' : ''}`}>
            <p className='text-3xl font-semibold text-slate-100 font-mono tracking-tight leading-none mb-1.5'>{s.n}</p>
            <p className='text-[11px] text-slate-600 tracking-wider'>{s.l}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-600 mb-5'>What it does</p>
      <div className='grid grid-cols-3 gap-3 mb-16'>
        {FEATURES.map((f, i) => (
          <div key={i}
            className='bg-[#13161e] border border-white/[0.05] rounded-2xl p-5 hover:border-indigo-500/20 transition-colors'>
            <div className='w-9 h-9 rounded-xl flex items-center justify-center mb-4 flex-shrink-0'
              style={{ background: f.color }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill={f.icon}>
                <path d={f.path} />
              </svg>
            </div>
            <p className='text-[13px] font-medium text-slate-300 mb-1.5'>{f.title}</p>
            <p className='text-[12px] text-slate-600 leading-relaxed'>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className='h-px bg-white/[0.05] mb-12' />

      {/* Built with + Timeline */}
      <div className='grid grid-cols-2 gap-16 mb-16'>

        {/* Left — tech stack */}
        <div>
          <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-600 mb-5'>Built with</p>
          <h2 className='text-2xl font-semibold text-slate-100 tracking-tight mb-3'>Modern stack, clean architecture</h2>
          <p className='text-[14px] text-slate-500 leading-relaxed mb-6'>
            StudentHub runs on a React + Zustand frontend talking to an Express + MongoDB backend. Everything is persisted, session-managed, and served over a RESTful API.
          </p>
          <div className='flex flex-wrap gap-2'>
            {TECH.map((t, i) => (
              <span key={i}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border font-mono
                  ${t.hi
                    ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/20'
                    : 'bg-[#0d0f14] text-slate-600 border-white/[0.06]'
                  }`}>
                {t.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right — timeline */}
        <div>
          <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-600 mb-5'>How it works</p>
          <div className='flex flex-col'>
            {TIMELINE.map((t, i) => (
              <div key={i} className='flex gap-4 pb-6'>
                <div className='flex flex-col items-center flex-shrink-0 w-7'>
                  <div className='w-2.5 h-2.5 rounded-full mt-0.5 flex-shrink-0' style={{ background: t.dot }} />
                  {i < TIMELINE.length - 1 && <div className='flex-1 w-px bg-white/[0.05] mt-1' />}
                </div>
                <div>
                  <p className='text-[13px] font-medium text-slate-300 mb-1'>{t.title}</p>
                  <p className='text-[12px] text-slate-600 leading-relaxed'>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA strip */}
      <div className='bg-[#13161e] border border-white/[0.06] rounded-2xl px-8 py-7 flex items-center justify-between gap-6'>
        <div>
          <h3 className='text-lg font-semibold text-slate-100 mb-1.5 tracking-tight'>Ready to get started?</h3>
          <p className='text-[13px] text-slate-500'>Log in as admin to manage your students, courses, and more.</p>
        </div>
        <button className='bg-indigo-600 hover:bg-indigo-500 text-white text-[13px] font-semibold px-6 py-2.5 rounded-xl transition-colors flex-shrink-0'>
          Go to dashboard →
        </button>
      </div>

    </div>
  )
}

export default About