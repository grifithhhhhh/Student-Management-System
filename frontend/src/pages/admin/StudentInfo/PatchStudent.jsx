import React, { useState } from 'react'
import axios from 'axios'
import useStudentStore from '../../../store/useStudentStore'

const PatchStudent = () => {
  const { editStudent } = useStudentStore();

  const initialStudent = {
    firstName: "", lastName: "", gender: "",
    email: "", imgURL: "", password: "",
    courses: [{}], attendance: {}
  };
  const initialCourse = { courseName: "", credits: "" };
  const initialAttendance = { totalClasses: "", attendedClasses: "", percentage: "" };

  const [student, setstudent] = useState(initialStudent);
  const [courses, setcourses] = useState([]);
  const [attendance, setattendance] = useState(initialAttendance);
  const [courseInput, setcourseInput] = useState(initialCourse);
  const [Email, setEmail] = useState("");

  const handleCoursesClicked = (e) => setcourseInput({ ...courseInput, [e.target.name]: e.target.value });
  const handleEmail = (e) => setEmail(e.target.value);
  const handleAttandace = (e) => setattendance({ ...attendance, [e.target.name]: e.target.value });
  const handleClick = (e) => setstudent({ ...student, [e.target.name]: e.target.value });

  const deleteCourse = async (idx) => {
    setcourses(prev => { const updated = [...prev]; updated.splice(idx, 1); return updated; });
  };

  const removeEmptyFields = (obj) =>
    Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== "" && value !== null && value !== undefined));

  const submitCourse = async (e) => {
    e.preventDefault();
    if (!courseInput.courseName || !courseInput.credits) return;
    setcourses([...courses, courseInput]);
    alert(`Course submitted: ${courseInput.courseName}`);
    setcourseInput(initialCourse);
  };

  const btnClicked = async (e) => {
    e.preventDefault();
    const cleanedStudents = removeEmptyFields(student);
    const cleanedAttendance = removeEmptyFields(attendance);
    try {
      const finalStudent = { ...cleanedStudents, courses, attendance: cleanedAttendance };
      const response = await axios.patch(`http://localhost:8004/students/${Email}`, finalStudent, { withCredentials: true });
      await editStudent(response.data);
      setstudent(initialStudent);
      setcourses([]);
      setattendance(initialAttendance);
      setEmail('');
    } catch (error) {
      alert("Error: Either the email is taken or fill all the fields");
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
        <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500 font-semibold mb-1">Manage</p>
        <h1 className="text-2xl font-semibold text-white tracking-tight">Edit Student</h1>
      </div>

      <form onSubmit={btnClicked} className="max-w-2xl flex flex-col gap-5">

        {/* Lookup by email */}
        <div className="bg-[#13161e] border border-white/5 rounded-2xl p-4">
          <label className={labelClass}>Find student by email</label>
          <input
            name='email'
            onChange={handleEmail}
            value={Email}
            className={inputClass}
            type="text"
            placeholder='Original email address'
          />
        </div>

        {/* New name */}
        <div>
          <p className="text-[11px] text-slate-500 mb-3 font-medium">Update fields (leave blank to keep existing)</p>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelClass}>First name</label>
              <input name='firstName' onChange={handleClick} value={student.firstName} className={inputClass} type="text" placeholder='New first name' />
            </div>
            <div>
              <label className={labelClass}>Last name</label>
              <input name='lastName' onChange={handleClick} value={student.lastName} className={inputClass} type="text" placeholder='New last name' />
            </div>
            <div>
              <label className={labelClass}>Gender</label>
              <input name='gender' onChange={handleClick} value={student.gender} className={inputClass} type="text" placeholder='New gender' />
            </div>
          </div>
        </div>

        {/* Email + Password */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>New email</label>
            <input name='email' onChange={handleClick} value={student.email} className={inputClass} type="text" placeholder='New email' />
          </div>
          <div>
            <label className={labelClass}>New password</label>
            <input name='password' onChange={handleClick} value={student.password} className={inputClass} type="password"
              autoComplete="off" spellCheck={false} autoCorrect="off" autoCapitalize="off" placeholder='New password' />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className={labelClass}>New image URL</label>
          <input name='imgURL' onChange={handleClick} value={student.imgURL} className={inputClass} type="text" placeholder='https://...' />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-[13px] font-semibold py-2.5 rounded-xl transition-colors"
        >
          Save changes
        </button>
      </form>
    </div>
  );
};

export default PatchStudent;