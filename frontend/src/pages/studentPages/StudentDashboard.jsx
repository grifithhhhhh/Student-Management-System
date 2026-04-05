import React, { useMemo } from 'react'
import useStudentStore from '../../store/useStudentStore'

const pctColor = (p) => p >= 75 ? '#10B981' : p >= 50 ? '#F59E0B' : '#EF4444'
const pctBg    = (p) => p >= 75 ? 'rgba(16,185,129,0.1)' : p >= 50 ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)'

const StatCard = ({ label, value, sub, iconPath, iconColor, iconBg }) => (
  <div className='bg-[#13161e] border border-white/5 rounded-2xl p-5 flex flex-col gap-3 hover:border-white/10 transition-colors flex-1'>
    <div className='flex items-center justify-between'>
      <p className='text-[9px] uppercase tracking-widest text-slate-600 font-semibold'>{label}</p>
      <div className='w-8 h-8 rounded-xl flex items-center justify-center' style={{ background: iconBg }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill={iconColor}><path d={iconPath} /></svg>
      </div>
    </div>
    <div>
      <p className='text-3xl font-semibold text-slate-100 tracking-tight leading-none'
        style={{ fontFamily: "'DM Mono', monospace" }}>{value}</p>
      {sub && <p className='text-[11px] text-slate-600 mt-1.5'>{sub}</p>}
    </div>
  </div>
)

const StudentDashboard = () => {
  const student     = useStudentStore((state) => state.students)
  const assignments = useStudentStore((state) => state.assignments)

  const overallPct = useMemo(() => {
    if (!student?.courses?.length) return 0
    let tot = 0, att = 0
    student.courses.forEach(c => { tot += c.totalClasses || 0; att += c.attendedClasses || 0 })
    return tot > 0 ? Math.round((att / tot) * 100) : 0
  }, [student])

  const upcomingAssignments = useMemo(() => {
    if (!assignments) return []
    const now = new Date()
    return [...assignments]
      .filter(a => a.dueDate && new Date(a.dueDate) >= now)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5)
  }, [assignments])

  const overdueAssignments = useMemo(() => {
    if (!assignments) return []
    const now = new Date()
    return assignments.filter(a => a.dueDate && new Date(a.dueDate) < now)
  }, [assignments])

  const formatDate = (d) => {
    if (!d) return ''
    const days = Math.ceil((new Date(d) - new Date()) / 86400000)
    if (days === 0) return 'Due today'
    if (days === 1) return 'Due tomorrow'
    return `${days} days left`
  }

  const urgent = (d) => d && Math.ceil((new Date(d) - new Date()) / 86400000) <= 3

  if (!student) return null

  const courseCount    = student.courses?.length || 0
  const totalClasses   = student.courses?.reduce((s, c) => s + (c.totalClasses || 0), 0) || 0
  const attendedTotal  = student.courses?.reduce((s, c) => s + (c.attendedClasses || 0), 0) || 0

  return (
    <div className='p-6 w-full h-full overflow-y-auto
      [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full'
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Header ── */}
      <div className='flex items-center justify-between mb-7'>
        <div>
          <p className='text-[10px] uppercase tracking-[0.12em] text-slate-600 font-semibold mb-1'>Student · AY 2025–26</p>
          <h1 className='text-2xl font-semibold text-slate-100 tracking-tight'>
            Good day, {student.firstName} 👋
          </h1>
        </div>
        <div className='flex items-center gap-2 bg-[#13161e] border border-white/5 rounded-xl px-3 py-2'>
          <div className='w-1.5 h-1.5 rounded-full' style={{ background: pctColor(overallPct) }} />
          <span className='text-[12px] text-slate-400 font-medium'>{overallPct}% attendance overall</span>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className='flex gap-3 mb-6 flex-wrap'>
        <StatCard label='Courses enrolled' value={courseCount} sub='this semester'
          iconPath='M12 3L1 9l4 2.18V15c0 3 3.58 5 7 5s7-2 7-5v-3.82L23 9zm0 12.35c-2.5 0-5-1.04-5-2.35v-1.18l5 2.28 5-2.28V13c0 1.31-2.5 2.35-5 2.35z'
          iconColor='#818CF8' iconBg='rgba(99,102,241,0.15)' />
        <StatCard label='Classes attended' value={attendedTotal} sub={`of ${totalClasses} total`}
          iconPath='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
          iconColor={pctColor(overallPct)} iconBg={pctBg(overallPct)} />
        <StatCard label='Assignments' value={upcomingAssignments.length} sub={overdueAssignments.length > 0 ? `${overdueAssignments.length} overdue` : 'all on track'}
          iconPath='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'
          iconColor={overdueAssignments.length > 0 ? '#EF4444' : '#10B981'}
          iconBg={overdueAssignments.length > 0 ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)'} />
      </div>

      {/* ── Attendance per course ── */}
      <div className='mb-5'>
        <p className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-3'>Attendance by course</p>
        {courseCount === 0 ? (
          <div className='bg-[#13161e] border border-white/5 rounded-2xl p-8 text-center text-slate-600 text-[13px]'>
            Not enrolled in any courses yet
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-3'>
            {student.courses.map((c, i) => {
              const pct = c.totalClasses > 0 ? Math.round((c.attendedClasses / c.totalClasses) * 100) : 0
              const col = pctColor(pct)
              const bg  = pctBg(pct)
              return (
                <div key={i} className='bg-[#13161e] border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-colors'>
                  <div className='flex items-start justify-between gap-2 mb-3'>
                    <p className='text-[13px] font-medium text-slate-300 leading-tight'>{c.courseName || `Course ${i + 1}`}</p>
                    <span className='text-[11px] font-semibold px-2 py-0.5 rounded-lg flex-shrink-0'
                      style={{ color: col, background: bg, fontFamily: "'DM Mono', monospace" }}>
                      {pct}%
                    </span>
                  </div>
                  <div className='h-1.5 bg-[#0d0f14] rounded-full overflow-hidden mb-2'>
                    <div className='h-full rounded-full transition-all' style={{ width: `${pct}%`, background: col }} />
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-[10px] text-slate-600'>{c.attendedClasses} attended</p>
                    <p className='text-[10px] text-slate-600'>{c.totalClasses} total</p>
                  </div>
                  {pct < 75 && (
                    <div className='mt-2 flex items-center gap-1.5'>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#EF4444">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      <p className='text-[10px] text-red-500'>
                        Need {Math.ceil((0.75 * c.totalClasses - c.attendedClasses))} more classes to reach 75%
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Upcoming assignments ── */}
      <div className='mb-5'>
        <p className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-3'>Upcoming assignments</p>
        {upcomingAssignments.length === 0 ? (
          <div className='bg-[#13161e] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center gap-2'>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#334155">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <p className='text-[13px] text-slate-600'>All caught up! No upcoming assignments.</p>
          </div>
        ) : (
          <div className='bg-[#13161e] border border-white/5 rounded-2xl overflow-hidden'>
            {upcomingAssignments.map((a, i) => {
              const isUrgent = urgent(a.dueDate)
              return (
                <div key={i}
                  className={`flex items-center gap-4 px-5 py-3.5 ${i < upcomingAssignments.length - 1 ? 'border-b border-white/[0.04]' : ''} hover:bg-white/[0.02] transition-colors`}>
                  <div className='w-1.5 h-1.5 rounded-full flex-shrink-0'
                    style={{ background: isUrgent ? '#EF4444' : '#4F46E5' }} />
                  <div className='flex-1 min-w-0'>
                    <p className='text-[13px] font-medium text-slate-300 truncate'>{a.title}</p>
                    {a.description && (
                      <p className='text-[11px] text-slate-600 mt-0.5 truncate'>{a.description}</p>
                    )}
                  </div>
                  <span className='text-[11px] flex-shrink-0 font-medium px-2.5 py-1 rounded-lg'
                    style={{
                      color: isUrgent ? '#EF4444' : '#818CF8',
                      background: isUrgent ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.1)',
                      fontFamily: "'DM Mono', monospace"
                    }}>
                    {formatDate(a.dueDate)}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Overdue warning ── */}
      {overdueAssignments.length > 0 && (
        <div className='bg-red-500/[0.08] border border-red-500/15 rounded-2xl p-4 flex items-start gap-3'>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#EF4444" className='flex-shrink-0 mt-0.5'>
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
          <div>
            <p className='text-[13px] font-medium text-red-400 mb-0.5'>
              {overdueAssignments.length} overdue assignment{overdueAssignments.length > 1 ? 's' : ''}
            </p>
            <p className='text-[12px] text-red-500/60'>
              {overdueAssignments.map(a => a.title).join(', ')}
            </p>
          </div>
        </div>
      )}

    </div>
  )
}

export default StudentDashboard