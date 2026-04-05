import React, { useState } from 'react'
import axios from 'axios'
import useStudentStore from "../../store/useStudentStore";
 
const Assignments = () => {
  const courses = useStudentStore((state) => state.courses);
  const students = useStudentStore((state) => state.students);
  const assignments = useStudentStore((state) => state.assignments);
  const { addAssignment, deleteAssignment } = useStudentStore();
 
  const initialAssignmentInfo = { title: "", description: "", dueDate: "", CourseId: "" };
  const [assignmentinfo, setassignmentinfo] = useState(initialAssignmentInfo);
 
  const handleChange = (e) => {
    setassignmentinfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
 
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8004/assignments", assignmentinfo);
    addAssignment(response.data.assignment);
    setassignmentinfo(initialAssignmentInfo);
  };
 
  const deleteAssignmentOnClick = async (idx) => {
    try {
      const deleteId = { id: assignments[idx]._id };
      const response = await axios.delete(`http://localhost:8004/assignments`, { data: deleteId });
      deleteAssignment(assignments[idx]._id);
    } catch (error) {
      console.log(error);
    }
  };
 
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };
 
  return (
    <div className='flex gap-6 p-6 w-full h-full'>
 
      {/* LEFT — assignments list */}
      <div className='flex-1 min-w-0'>
        <div className='mb-6'>
          <p className='text-[10px] uppercase tracking-[0.12em] text-slate-500 font-semibold mb-1'>Manage</p>
          <h1 className='text-2xl font-semibold text-white tracking-tight'>All Assignments</h1>
        </div>
 
        {assignments.length === 0 && (
          <div className='flex flex-col items-center justify-center py-20 text-slate-600'>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className='mb-3 opacity-40'>
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <p className='text-sm'>No assignments yet. Create one →</p>
          </div>
        )}
 
        <div className='flex flex-col gap-3'>
          {assignments.map((elem, idx) => (
            <div
              key={idx}
              className='bg-[#13161e] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors group'
            >
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 mb-2'>
                    <span className='w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0' />
                    <h2 className='text-[15px] font-semibold text-slate-200 truncate'>{elem.title}</h2>
                  </div>
                  <p className='text-[13px] text-slate-500 leading-relaxed mb-3'>{elem.description}</p>
                  <div className='flex items-center gap-2'>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#475569">
                      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
                    </svg>
                    <span className='text-[11px] text-slate-600'>Due: {formatDate(elem.dueDate)}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteAssignmentOnClick(idx)}
                  className='flex-shrink-0 px-3 py-1.5 rounded-lg text-[12px] font-medium bg-red-600/10 text-red-500 border border-red-500/10 hover:bg-red-600/20 hover:border-red-500/20 transition-all opacity-0 group-hover:opacity-100'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
 
      {/* RIGHT — add assignment form */}
      <div className='w-80 flex-shrink-0'>
        <div className='bg-[#13161e] border border-white/5 rounded-2xl p-5 sticky top-0'>
          <div className='mb-5'>
            <p className='text-[10px] uppercase tracking-[0.12em] text-slate-500 font-semibold mb-1'>Create</p>
            <h2 className='text-[16px] font-semibold text-white tracking-tight'>New Assignment</h2>
          </div>
 
          <form className='flex flex-col gap-3' onSubmit={handlesubmit}>
 
            <div className='flex flex-col gap-1.5'>
              <label className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold'>Title</label>
              <input
                className='bg-[#0d0f14] border border-white/5 text-slate-300 text-[13px] placeholder-slate-600 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500/40 transition-colors w-full'
                type="text"
                onChange={handleChange}
                placeholder='Assignment title'
                name='title'
                value={assignmentinfo.title}
              />
            </div>
 
            <div className='flex flex-col gap-1.5'>
              <label className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold'>Description</label>
              <textarea
                className='bg-[#0d0f14] border border-white/5 text-slate-300 text-[13px] placeholder-slate-600 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500/40 transition-colors w-full resize-none'
                rows={3}
                onChange={handleChange}
                placeholder='Brief description...'
                name='description'
                value={assignmentinfo.description}
              />
            </div>
 
            <div className='flex flex-col gap-1.5'>
              <label className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold'>Due date</label>
              <input
                className='bg-[#0d0f14] border border-white/5 text-slate-300 text-[13px] rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500/40 transition-colors w-full'
                type="date"
                onChange={handleChange}
                name="dueDate"
                value={assignmentinfo.dueDate}
              />
            </div>
 
            <div className='flex flex-col gap-1.5'>
              <label className='text-[10px] uppercase tracking-widest text-slate-600 font-semibold'>Course</label>
              <select
                className='bg-[#0d0f14] border border-white/5 text-slate-300 text-[13px] rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500/40 transition-colors w-full'
                name="CourseId"
                value={assignmentinfo.CourseId}
                onChange={handleChange}
              >
                <option value="">Select course</option>
                {courses.map((elem, idx) => (
                  <option key={idx} value={elem._id}>{elem.courseName}</option>
                ))}
              </select>
            </div>
 
            <button
              className='mt-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white text-[13px] font-semibold py-2.5 rounded-xl transition-colors'
              onClick={handlesubmit}
            >
              Create assignment
            </button>
 
          </form>
        </div>
      </div>
 
    </div>
  );
};
 
export default Assignments;