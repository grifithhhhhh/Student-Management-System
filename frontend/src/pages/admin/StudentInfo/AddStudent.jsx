import React, { useState } from 'react'
import axios from 'axios'
import useStudentStore from '../../../store/useStudentStore'

const AddStudent = () => {
  const { addStudent } = useStudentStore();
  const coursesfromstore = useStudentStore((state) => state.courses);

  const initialStudent = {
    firstName: "", lastName: "", gender: "",
    email: "", imgURL: "", password: "",
  };
  const initialCourse = [];

  const [student, setstudent] = useState(initialStudent);
  const [courses, setcourses] = useState(initialCourse);

  const handleClick = (e) => {
    setstudent({ ...student, [e.target.name]: e.target.value });
  };

  const coursesClicked = (e, idx) => {
    e.preventDefault();
    const id = coursesfromstore[idx]._id;
    setcourses(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const btnClicked = async (e) => {
    e.preventDefault();
    try {
      const finalStudent = { ...student };
      const AppliedCourses = [...courses];
      const response = await axios.post("http://localhost:8004/students", finalStudent, { withCredentials: true });
      const StudentId = await response.data._id;
      const response2 = await axios.patch("http://localhost:8004/enrollmultiplecoures", { AppliedCourses, StudentId }, { withCredentials: true });
      addStudent(response2.data.Student);
      setstudent(initialStudent);
    } catch (error) {
      alert("Error: something's wrong here", error.message);
    }
  };

  const inputClass = "bg-[#0d0f14] border border-white/5 text-slate-300 text-[13px] placeholder-slate-600 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500/40 transition-colors w-full";
  const labelClass = "text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1 block";

  return (
    <div className="p-6 w-full h-full overflow-y-auto
      [&::-webkit-scrollbar]:w-1
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-white/10
      [&::-webkit-scrollbar-thumb]:rounded-full">

      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500 font-semibold mb-1">Enroll</p>
        <h1 className="text-2xl font-semibold text-white tracking-tight">Add New Student</h1>
      </div>

      <form onSubmit={btnClicked} className="max-w-2xl flex flex-col gap-5">

        {/* Name row */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={labelClass}>First name</label>
            <input name='firstName' onChange={handleClick} value={student.firstName} className={inputClass} type="text" placeholder='First name' />
          </div>
          <div>
            <label className={labelClass}>Last name</label>
            <input name='lastName' onChange={handleClick} value={student.lastName} className={inputClass} type="text" placeholder='Last name' />
          </div>
          <div>
            <label className={labelClass}>Gender</label>
            <input name='gender' onChange={handleClick} value={student.gender} className={inputClass} type="text" placeholder='Gender' />
          </div>
        </div>

        {/* Email + Password */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Email</label>
            <input name='email' onChange={handleClick} value={student.email} className={inputClass} type="text" placeholder='Email address' />
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <input name='password' onChange={handleClick} value={student.password} className={inputClass} type="password"
              autoComplete="off" spellCheck={false} autoCorrect="off" autoCapitalize="off" placeholder='Password' />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className={labelClass}>Image URL</label>
          <input name='imgURL' onChange={handleClick} value={student.imgURL} className={inputClass} type="text" placeholder='https://...' />
        </div>

        {/* Courses */}
        <div>
          <label className={labelClass}>Select courses</label>
          <div className="flex flex-wrap gap-2">
            {coursesfromstore.map((elem, idx) => {
              const selected = courses.includes(elem._id);
              return (
                <button
                  key={elem._id}
                  type="button"
                  onClick={(e) => coursesClicked(e, idx)}
                  className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all border
                    ${selected
                      ? "bg-indigo-600/20 text-indigo-400 border-indigo-500/30"
                      : "bg-[#0d0f14] text-slate-500 border-white/5 hover:border-white/10 hover:text-slate-300"
                    }`}
                >
                  {elem.courseName}
                </button>
              );
            })}
          </div>
          {courses.length > 0 && (
            <p className="text-[11px] text-slate-600 mt-2">{courses.length} course{courses.length > 1 ? 's' : ''} selected</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-[13px] font-semibold py-2.5 rounded-xl transition-colors mt-2"
        >
          Add student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;