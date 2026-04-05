import React, { useMemo } from 'react'
import useStudentStore from '../../store/useStudentStore'

const RightSidebar = () => {
  const student = useStudentStore((state) => state.students)
  const assignments = useStudentStore((state) => state.assignments)

  const upcomingAssignments = useMemo(() => {
    if (!assignments) return []
    const now = new Date()
    return [...assignments]
      .filter(a => a.dueDate && new Date(a.dueDate) >= now)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 3)
  }, [assignments])

  const formatDate = (d) => {
    if (!d) return ''
    const days = Math.ceil((new Date(d) - new Date()) / 86400000)
    if (days === 0) return 'Due today'
    if (days === 1) return 'Due tomorrow'
    return `Due in ${days}d`
  }

  const urgent = (d) => d && Math.ceil((new Date(d) - new Date()) / 86400000) <= 3

  // attendance per course
  const courseStats = useMemo(() => {
    if (!student?.courses) return []
    return student.courses.slice(0, 4).map(c => {
      const pct = c.totalClasses > 0
        ? Math.round((c.attendedClasses / c.totalClasses) * 100)
        : 0
      return { name: c.courseName || 'Course', pct, attended: c.attendedClasses, total: c.totalClasses }
    })
  }, [student])

  const overallPct = useMemo(() => {
    if (!student?.courses?.length) return 0
    let tot = 0, att = 0
    student.courses.forEach(c => { tot += c.totalClasses || 0; att += c.attendedClasses || 0 })
    return tot > 0 ? Math.round((att / tot) * 100) : 0
  }, [student])

  const pctColor = (p) => p >= 75 ? '#10B981' : p >= 50 ? '#F59E0B' : '#EF4444'

  if (!student) return null

  return (
    <div className='flex flex-col gap-4 p-4 h-full' style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Student profile card ── */}
      <div className='bg-[#13161e] border border-white/5 rounded-2xl overflow-hidden'>
        <div className='h-16 relative' style={{ background: '#1e1b4b' }}>
          <div className='absolute bottom-0 left-0 right-0 h-8' style={{ background: 'linear-gradient(to top, #13161e, transparent)' }} />
          <div className='absolute top-0 left-0 right-0 bottom-0 opacity-30'>
            {[30,60,90,120,150,180,210,240].map(x => (
              <line key={x} x1={x} y1="0" x2={x} y2="64" stroke="#818CF8" strokeWidth="0.5"
                style={{ position: 'absolute' }} />
            ))}
          </div>
        </div>
        <div className='px-4 pb-4 -mt-5 relative'>
          <div className='flex items-end gap-3 mb-3'>
            {student.imgURL ? (
              <img src={student.imgURL} alt=""
                className='w-12 h-12 rounded-full object-cover flex-shrink-0'
                style={{ border: '2px solid rgba(79,70,229,0.4)' }} />
            ) : (
              <div className='w-12 h-12 rounded-full bg-indigo-600/20 border-2 border-[#13161e] flex items-center justify-center flex-shrink-0'
                style={{ borderColor: 'rgba(79,70,229,0.4)' }}>
                <span className='text-[14px] font-semibold text-indigo-400'>
                  {student.firstName?.[0]}{student.lastName?.[0]}
                </span>
              </div>
            )}
            <div className='mb-1'>
              <p className='text-[14px] font-semibold text-slate-200 leading-tight'>
                {student.firstName} {student.lastName}
              </p>
              <p className='text-[11px] text-slate-500 capitalize'>{student.gender || 'Student'}</p>
            </div>
          </div>

          <div className='text-[11px] text-slate-600 truncate mb-3'>{student.email}</div>

          {/* Overall attendance ring */}
          <div className='flex items-center gap-3 bg-[#0d0f14] rounded-xl p-3'>
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="15" fill="none" stroke="#1E293B" strokeWidth="4"/>
              <circle cx="20" cy="20" r="15" fill="none"
                stroke={pctColor(overallPct)} strokeWidth="4"
                strokeDasharray={`${(overallPct / 100) * 94.2} 94.2`}
                strokeDashoffset="23.5"
                strokeLinecap="round"/>
              <text x="20" y="24" textAnchor="middle" fontSize="9" fontWeight="600"
                fill={pctColor(overallPct)} fontFamily="DM Mono, monospace">
                {overallPct}%
              </text>
            </svg>
            <div>
              <p className='text-[12px] font-medium text-slate-300'>Overall attendance</p>
              <p className='text-[10px] text-slate-600 mt-0.5'>
                {student.courses?.length || 0} courses enrolled
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Course attendance breakdown ── */}
      <div className='bg-[#13161e] border border-white/5 rounded-2xl p-4'>
        <p className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-3'>Courses</p>
        {courseStats.length === 0 && (
          <p className='text-[12px] text-slate-600 text-center py-3'>No courses enrolled</p>
        )}
        <div className='flex flex-col gap-3'>
          {courseStats.map((c, i) => (
            <div key={i}>
              <div className='flex items-center justify-between mb-1'>
                <p className='text-[12px] font-medium text-slate-400 truncate max-w-[150px]'>{c.name}</p>
                <span className='text-[11px] font-mono flex-shrink-0' style={{ color: pctColor(c.pct), fontFamily: "'DM Mono', monospace" }}>
                  {c.pct}%
                </span>
              </div>
              <div className='h-1.5 bg-[#0d0f14] rounded-full overflow-hidden'>
                <div className='h-full rounded-full transition-all'
                  style={{ width: `${c.pct}%`, background: pctColor(c.pct) }} />
              </div>
              <p className='text-[10px] text-slate-700 mt-0.5'>{c.attended}/{c.total} classes</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Upcoming assignments ── */}
      <div className='bg-[#13161e] border border-white/5 rounded-2xl p-4'>
        <p className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-3'>Upcoming</p>
        {upcomingAssignments.length === 0 && (
          <p className='text-[12px] text-slate-600 text-center py-3'>No upcoming assignments</p>
        )}
        <div className='flex flex-col gap-2'>
          {upcomingAssignments.map((a, i) => (
            <div key={i} className='flex items-start gap-2.5 bg-[#0d0f14] rounded-xl p-3 border border-white/[0.04]'>
              <div className='w-1 self-stretch rounded-full flex-shrink-0 mt-0.5'
                style={{ background: urgent(a.dueDate) ? '#EF4444' : '#4F46E5' }} />
              <div className='flex-1 min-w-0'>
                <p className='text-[12px] font-medium text-slate-300 truncate'>{a.title}</p>
                <p className='text-[10px] mt-0.5' style={{ color: urgent(a.dueDate) ? '#EF4444' : '#475569' }}>
                  {formatDate(a.dueDate)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick tip ── */}
      <div className='bg-indigo-600/10 border border-indigo-500/15 rounded-2xl p-4 mt-auto'>
        <div className='flex items-center gap-2 mb-2'>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#818CF8">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          <p className='text-[10px] font-semibold uppercase tracking-wider text-indigo-400'>Reminder</p>
        </div>
        <p className='text-[12px] text-indigo-300/70 leading-relaxed'>
          Maintain above 75% attendance to remain eligible for exams.
        </p>
      </div>

    </div>
  )
}

export default RightSidebar