

import React, { useState } from "react";
import axios from "axios";
import useStudentStore from "../../store/useStudentStore";
 
const Attendance = () => {
  const courses = useStudentStore((state) => state.courses);
  const students = useStudentStore((state) => state.students);
  const editStudent = useStudentStore((state) => state.editStudent);
 
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [attendanceState, setAttendanceState] = useState({});
  const [marksState, setMarksState] = useState({});
 
  if (!courses || !students) return null;
 
  const handleAttendanceChange = (studentId, value) => {
    setAttendanceState((prev) => ({ ...prev, [studentId]: value }));
  };
 
  const handleMarksChange = (studentId, value) => {
    setMarksState((prev) => ({ ...prev, [studentId]: value }));
  };
 
  const submitAttendance = async (studentId) => {
    if (!selectedCourse) { alert("Select a course first"); return; }
    try {
      const ifPresent = attendanceState[studentId] === "present";
      const res = await axios.patch("http://localhost:8004/courses/attendance", {
        CourseId: selectedCourse, StudentId: studentId, ifPresent,
      });
      editStudent(res.data.student);
      alert("Attendance Updated");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Error updating attendance");
    }
  };
 
  const submitMarks = async (studentId) => {
    if (!selectedCourse) { alert("Select a course first"); return; }
    try {
      const res = await axios.patch("http://localhost:8004/courses/marks", {
        StudentId: studentId, CourseId: selectedCourse, Marks: marksState[studentId],
      });
      editStudent(res.data.Student);
      alert("Marks Updated");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Error updating marks");
    }
  };
 
  const filteredStudents = students.filter((student) =>
    student.courses?.some((course) => course.course.toString() === selectedCourse)
  );
 
  return (
    <div className="p-6 w-full h-full">
 
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500 font-semibold mb-1">Manage</p>
        <h1 className="text-2xl font-semibold text-white tracking-tight">Attendance & Marks</h1>
      </div>
 
      {/* Course pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <p className="w-full text-[11px] uppercase tracking-widest text-slate-600 font-semibold mb-1">Select course</p>
        {courses.map((course) => (
          <button
            key={course._id}
            onClick={() => setSelectedCourse(course._id)}
            className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all border
              ${selectedCourse === course._id
                ? "bg-indigo-600 text-white border-indigo-500"
                : "bg-[#13161e] text-slate-400 border-white/5 hover:border-white/10 hover:text-slate-200"
              }`}
          >
            {course.courseName}
          </button>
        ))}
      </div>
 
      {/* Students table */}
      {!selectedCourse && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-600">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="mb-3 opacity-40">
            <path d="M12 3L1 9l4 2.18V15c0 3 3.58 5 7 5s7-2 7-5v-3.82L23 9zm0 12.35c-2.5 0-5-1.04-5-2.35v-1.18l5 2.28 5-2.28V13c0 1.31-2.5 2.35-5 2.35z"/>
          </svg>
          <p className="text-sm">Select a course to view students</p>
        </div>
      )}
 
      {selectedCourse && filteredStudents.length === 0 && (
        <div className="flex items-center justify-center py-20 text-slate-600 text-sm">
          No students enrolled in this course.
        </div>
      )}
 
      <div className="flex flex-col gap-3">
        {filteredStudents.map((student) => {
          const matchedCourse = student.courses.find(
            (c) => c.course.toString() === selectedCourse
          );
          const attended = matchedCourse.attendedClasses;
          const total = matchedCourse.totalClasses;
          const pct = total > 0 ? Math.round((attended / total) * 100) : 0;
          const pctColor = pct >= 75 ? "text-emerald-400" : pct >= 50 ? "text-amber-400" : "text-red-400";
 
          return (
            <div
              key={student._id}
              className="bg-[#13161e] border border-white/5 rounded-2xl p-4 flex items-center gap-4 flex-wrap hover:border-white/10 transition-colors"
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-3 w-44 flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-semibold text-indigo-400">
                    {student.firstName[0]}{student.lastName[0]}
                  </span>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-slate-200 leading-none">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="text-[10px] text-slate-600 mt-0.5">Student</p>
                </div>
              </div>
 
              {/* Attendance stats */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-center">
                  <p className="text-[10px] text-slate-600 uppercase tracking-wider mb-0.5">Total</p>
                  <p className="text-[15px] font-semibold text-slate-300 font-mono">{total}</p>
                </div>
                <div className="w-px h-8 bg-white/5" />
                <div className="text-center">
                  <p className="text-[10px] text-slate-600 uppercase tracking-wider mb-0.5">Attended</p>
                  <p className="text-[15px] font-semibold text-slate-300 font-mono">{attended}</p>
                </div>
                <div className="w-px h-8 bg-white/5" />
                <div className="text-center">
                  <p className="text-[10px] text-slate-600 uppercase tracking-wider mb-0.5">Rate</p>
                  <p className={`text-[15px] font-semibold font-mono ${pctColor}`}>{pct}%</p>
                </div>
              </div>
 
              {/* Present / Absent toggle */}
              <div className="flex gap-1.5 ml-auto flex-shrink-0">
                <button
                  onClick={() => handleAttendanceChange(student._id, "present")}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all border
                    ${attendanceState[student._id] === "present"
                      ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/30"
                      : "bg-[#0d0f14] text-slate-500 border-white/5 hover:border-white/10"
                    }`}
                >
                  Present
                </button>
                <button
                  onClick={() => handleAttendanceChange(student._id, "absent")}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all border
                    ${attendanceState[student._id] === "absent"
                      ? "bg-red-600/20 text-red-400 border-red-500/30"
                      : "bg-[#0d0f14] text-slate-500 border-white/5 hover:border-white/10"
                    }`}
                >
                  Absent
                </button>
              </div>
 
              <button
                onClick={() => submitAttendance(student._id)}
                className="px-4 py-1.5 rounded-lg text-[12px] font-medium bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600/30 transition-all flex-shrink-0"
              >
                Save attendance
              </button>
 
              {/* Marks */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <input
                  type="number"
                  placeholder="Marks"
                  value={marksState[student._id] || ""}
                  onChange={(e) => handleMarksChange(student._id, e.target.value)}
                  className="bg-[#0d0f14] border border-white/5 text-slate-300 text-[13px] placeholder-slate-600 rounded-lg px-3 py-1.5 w-20 outline-none focus:border-indigo-500/40 transition-colors"
                />
                <button
                  onClick={() => submitMarks(student._id)}
                  className="px-4 py-1.5 rounded-lg text-[12px] font-medium bg-violet-600/20 text-violet-400 border border-violet-500/20 hover:bg-violet-600/30 transition-all"
                >
                  Save marks
                </button>
              </div>
 
            </div>
          );
        })}
      </div>
    </div>
  );
};
 
export default Attendance;