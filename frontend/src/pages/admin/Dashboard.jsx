import React, { useState, useMemo } from 'react'
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useStudentStore from '../../store/useStudentStore';

const calendarStyles = `
  .rdp { --rdp-accent-color: #4F46E5; --rdp-background-color: rgba(79,70,229,0.15); color: #cbd5e1; margin: 0; }
  .rdp-months { background: transparent; }
  .rdp-day { color: #94a3b8; border-radius: 8px; font-size: 12px; width: 32px; height: 32px; }
  .rdp-day:hover:not([disabled]) { background: rgba(79,70,229,0.2) !important; color: white; }
  .rdp-day_selected { background: #4F46E5 !important; color: white !important; }
  .rdp-day_today { color: #818cf8 !important; font-weight: 700; }
  .rdp-caption_label { color: #e2e8f0; font-size: 13px; font-weight: 600; }
  .rdp-head_cell { color: #334155; font-size: 10px; font-weight: 600; text-transform: uppercase; }
  .rdp-nav_button { color: #475569; border-radius: 8px; }
  .rdp-nav_button:hover { color: #e2e8f0 !important; background: rgba(255,255,255,0.06) !important; }
`

const avatarColors = ['rgba(99,102,241,0.2)','rgba(16,185,129,0.15)','rgba(245,158,11,0.15)','rgba(6,182,212,0.12)','rgba(239,68,68,0.12)']
const textColors   = ['#818CF8','#10B981','#F59E0B','#06B6D4','#EF4444']

const StatCard = ({ label, value, sub, iconPath, iconColor, iconBg }) => (
  <div className='bg-[#13161e] border border-white/5 rounded-2xl p-5 flex flex-col gap-3 hover:border-white/10 transition-colors flex-1 min-w-[150px]'>
    <div className='flex items-center justify-between'>
      <p className='text-[9px] uppercase tracking-widest text-slate-600 font-semibold'>{label}</p>
      <div className='w-8 h-8 rounded-xl flex items-center justify-center' style={{ background: iconBg }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill={iconColor}><path d={iconPath} /></svg>
      </div>
    </div>
    <div>
      <p className='text-3xl font-semibold text-slate-100 tracking-tight leading-none' style={{ fontFamily: "'DM Mono', monospace" }}>{value}</p>
      {sub && <p className='text-[11px] text-slate-600 mt-1.5'>{sub}</p>}
    </div>
  </div>
)

const Dashboard = () => {
  const courses    = useStudentStore((state) => state.courses);
  const students   = useStudentStore((state) => state.students);
  const assignments = useStudentStore((state) => state.assignments);
  const [selected, setSelected] = useState();

  const totalStudents    = students.length
  const totalCourses     = courses.length
  const totalAssignments = assignments.length

  const attendanceRate = useMemo(() => {
    let total = 0, attended = 0
    students.forEach(s => s.courses?.forEach(c => {
      total    += c.totalClasses    || 0
      attended += c.attendedClasses || 0
    }))
    return total > 0 ? Math.round((attended / total) * 100) : 0
  }, [students])

  const recentStudents = useMemo(() => [...students].slice(-5).reverse(), [students])

  const upcomingAssignments = useMemo(() => {
    const now = new Date()
    return [...assignments]
      .filter(a => a.dueDate && new Date(a.dueDate) >= now)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 4)
  }, [assignments])

  const topStudents = useMemo(() => [...students]
    .map(s => {
      let total = 0, attended = 0
      s.courses?.forEach(c => { total += c.totalClasses || 0; attended += c.attendedClasses || 0 })
      return { ...s, rate: total > 0 ? Math.round((attended / total) * 100) : 0 }
    })
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 5), [students])

  const courseBreakdown = useMemo(() => {
    const counts = courses.map(course => ({
      ...course,
      enrolled: students.filter(s =>
        s.courses?.some(c => c.course?.toString() === course._id?.toString())
      ).length
    }))
    const max = Math.max(...counts.map(c => c.enrolled), 1)
    return counts.map(c => ({ ...c, pct: Math.round((c.enrolled / max) * 100) }))
  }, [courses, students])

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''
  const daysUntil  = (d) => d ? Math.ceil((new Date(d) - new Date()) / 86400000) : null
  const initials   = (s) => `${s.firstName?.[0] || ''}${s.lastName?.[0] || ''}`

  return (
    <div className='p-6 w-full h-full overflow-y-auto
      [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full'
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <style>{calendarStyles}</style>

      {/* ── Header ── */}
      <div className='flex items-center justify-between mb-7'>
        <div>
          <p className='text-[10px] uppercase tracking-[0.12em] text-slate-600 font-semibold mb-1'>Admin · AY 2025–26</p>
          <h1 className='text-2xl font-semibold text-slate-100 tracking-tight'>Dashboard</h1>
        </div>
        <div className='flex items-center gap-2 bg-[#13161e] border border-white/5 rounded-xl px-3 py-2'>
          <div className='w-1.5 h-1.5 rounded-full bg-emerald-500' />
          <span className='text-[12px] text-slate-400 font-medium'>Semester 2 · Active</span>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className='flex gap-3 mb-5 flex-wrap'>
        <StatCard label='Total students'   value={totalStudents}    sub='enrolled this semester'
          iconPath='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'
          iconColor='#818CF8' iconBg='rgba(99,102,241,0.15)' />
        <StatCard label='Active courses'   value={totalCourses}     sub='running this semester'
          iconPath='M12 3L1 9l4 2.18V15c0 3 3.58 5 7 5s7-2 7-5v-3.82L23 9zm0 12.35c-2.5 0-5-1.04-5-2.35v-1.18l5 2.28 5-2.28V13c0 1.31-2.5 2.35-5 2.35z'
          iconColor='#06B6D4' iconBg='rgba(6,182,212,0.12)' />
        <StatCard label='Assignments'      value={totalAssignments} sub={`${upcomingAssignments.length} upcoming`}
          iconPath='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'
          iconColor='#F59E0B' iconBg='rgba(245,158,11,0.12)' />
        <StatCard label='Avg. attendance'  value={`${attendanceRate}%`} sub='across all courses'
          iconPath='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
          iconColor={attendanceRate >= 75 ? '#10B981' : '#EF4444'}
          iconBg={attendanceRate >= 75 ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)'} />
      </div>

      {/* ── Row 2: Recent students table + Calendar ── */}
      <div className='grid gap-4 mb-4' style={{ gridTemplateColumns: '1fr auto' }}>

        <div className='bg-[#13161e] border border-white/5 rounded-2xl overflow-hidden'>
          <div className='flex items-center justify-between px-5 py-4 border-b border-white/5'>
            <p className='text-[13px] font-medium text-slate-300'>Recent students</p>
            <span className='text-[11px] text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors'>View all →</span>
          </div>
          <table className='w-full'>
            <thead>
              <tr className='bg-[#0d0f14]'>
                {['Name','Courses','Attendance'].map(h => (
                  <th key={h} className='text-left px-5 py-2.5 text-[9px] uppercase tracking-widest text-slate-600 font-semibold'>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentStudents.length === 0 && (
                <tr><td colSpan={3} className='px-5 py-8 text-center text-[13px] text-slate-600'>No students yet</td></tr>
              )}
              {recentStudents.map((s, i) => {
                let tot = 0, att = 0
                s.courses?.forEach(c => { tot += c.totalClasses || 0; att += c.attendedClasses || 0 })
                const pct = tot > 0 ? Math.round((att / tot) * 100) : 0
                const col = pct >= 75 ? '#10B981' : pct >= 50 ? '#F59E0B' : '#EF4444'
                return (
                  <tr key={s._id} className='border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors'>
                    <td className='px-5 py-3'>
                      <div className='flex items-center gap-2.5'>
                        <div className='w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0'
                          style={{ background: avatarColors[i % 5], color: textColors[i % 5] }}>
                          {initials(s)}
                        </div>
                        <span className='text-[13px] font-medium text-slate-300'>{s.firstName} {s.lastName}</span>
                      </div>
                    </td>
                    <td className='px-5 py-3'>
                      <div className='flex flex-wrap gap-1'>
                        {s.courses?.slice(0, 2).map((c, ci) => (
                          <span key={ci} className='text-[10px] bg-indigo-600/10 text-indigo-400 border border-indigo-500/10 px-2 py-0.5 rounded-md'>
                            {c.courseName || 'Course'}
                          </span>
                        ))}
                        {(s.courses?.length || 0) > 2 && (
                          <span className='text-[10px] text-slate-600'>+{s.courses.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className='px-5 py-3'>
                      <div className='flex items-center gap-2'>
                        <div className='w-20 h-1.5 bg-[#0d0f14] rounded-full overflow-hidden'>
                          <div className='h-full rounded-full' style={{ width: `${pct}%`, background: col }} />
                        </div>
                        <span className='text-[11px] font-mono' style={{ color: col, fontFamily: "'DM Mono', monospace" }}>{pct}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className='bg-[#13161e] border border-white/5 rounded-2xl p-5'>
          <p className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-3'>Calendar</p>
          <DayPicker mode="single" selected={selected} onSelect={setSelected} />
        </div>
      </div>

      {/* ── Row 3: Upcoming assignments + Top attendance + Course breakdown ── */}
      <div className='grid grid-cols-3 gap-4'>

        {/* Upcoming assignments */}
        <div className='bg-[#13161e] border border-white/5 rounded-2xl overflow-hidden'>
          <div className='px-5 py-4 border-b border-white/5'>
            <p className='text-[13px] font-medium text-slate-300'>Upcoming assignments</p>
          </div>
          <div className='flex flex-col p-3 gap-2'>
            {upcomingAssignments.length === 0 && (
              <p className='text-[12px] text-slate-600 text-center py-6'>No upcoming assignments</p>
            )}
            {upcomingAssignments.map((a, i) => {
              const days   = daysUntil(a.dueDate)
              const urgent = days !== null && days <= 3
              return (
                <div key={a._id || i} className='flex items-start gap-3 bg-[#0d0f14] rounded-xl p-3 border border-white/[0.04]'>
                  <div className='w-1 self-stretch rounded-full flex-shrink-0' style={{ background: urgent ? '#EF4444' : '#4F46E5' }} />
                  <div className='flex-1 min-w-0'>
                    <p className='text-[12px] font-medium text-slate-300 truncate'>{a.title}</p>
                    <p className='text-[10px] text-slate-600 mt-0.5 truncate'>{a.description}</p>
                  </div>
                  <div className='flex-shrink-0 text-right'>
                    <p className='text-[10px]' style={{ color: urgent ? '#EF4444' : '#475569', fontFamily: "'DM Mono', monospace" }}>
                      {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : formatDate(a.dueDate)}
                    </p>
                    {urgent && days > 0 && <p className='text-[9px] text-red-500'>{days}d left</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top attendance */}
        <div className='bg-[#13161e] border border-white/5 rounded-2xl overflow-hidden'>
          <div className='px-5 py-4 border-b border-white/5'>
            <p className='text-[13px] font-medium text-slate-300'>Top attendance</p>
          </div>
          <div className='flex flex-col p-4 gap-3'>
            {topStudents.length === 0 && (
              <p className='text-[12px] text-slate-600 text-center py-6'>No data yet</p>
            )}
            {topStudents.map((s, i) => (
              <div key={s._id} className='flex items-center gap-3'>
                <span className='text-[11px] text-slate-600 w-4 flex-shrink-0' style={{ fontFamily: "'DM Mono', monospace" }}>{i + 1}</span>
                <div className='w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0'
                  style={{ background: avatarColors[i % 5], color: textColors[i % 5] }}>
                  {initials(s)}
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-[12px] font-medium text-slate-300 truncate'>{s.firstName} {s.lastName}</p>
                  <div className='flex items-center gap-1.5 mt-1'>
                    <div className='flex-1 h-1 bg-[#0d0f14] rounded-full overflow-hidden'>
                      <div className='h-full rounded-full bg-emerald-500' style={{ width: `${s.rate}%` }} />
                    </div>
                    <span className='text-[10px] text-emerald-500' style={{ fontFamily: "'DM Mono', monospace" }}>{s.rate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course breakdown */}
        <div className='bg-[#13161e] border border-white/5 rounded-2xl overflow-hidden'>
          <div className='px-5 py-4 border-b border-white/5'>
            <p className='text-[13px] font-medium text-slate-300'>Course breakdown</p>
          </div>
          <div className='flex flex-col p-4 gap-4'>
            {courseBreakdown.length === 0 && (
              <p className='text-[12px] text-slate-600 text-center py-6'>No courses yet</p>
            )}
            {courseBreakdown.map((c, i) => (
              <div key={c._id} className='flex flex-col gap-1.5'>
                <div className='flex items-center justify-between'>
                  <p className='text-[12px] font-medium text-slate-400 truncate max-w-[160px]'>{c.courseName}</p>
                  <span className='text-[11px] text-slate-600' style={{ fontFamily: "'DM Mono', monospace" }}>{c.enrolled}</span>
                </div>
                <div className='h-1.5 bg-[#0d0f14] rounded-full overflow-hidden'>
                  <div className='h-full rounded-full transition-all' style={{ width: `${c.pct}%`, background: textColors[i % 5] }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard