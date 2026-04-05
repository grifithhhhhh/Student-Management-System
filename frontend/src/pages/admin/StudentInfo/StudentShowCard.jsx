import React from 'react'
import useStudentStore from "../../../store/useStudentStore";
import api from "../../../api"
import { useNavigate } from 'react-router-dom'

const StudentShowCard = () => {
  const students = useStudentStore((state) => state.students);
  const removeStudentFromStore = useStudentStore((state) => state.deleteStudent);
  const navigate = useNavigate();

  if (!students) return null;

  const deleteStudent = async (id) => {
    try {
      const response = await api.delete(`/students/${id}`);
      if (response.status === 200) {
        removeStudentFromStore(id);
        console.log("Deleted entry with id:", id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editStudent = async (id) => {
    navigate("/admin/studentinfo/editStudent");
  };

  return (
    <div className="p-6 w-full h-full">

      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500 font-semibold mb-1">Overview</p>
        <h1 className="text-2xl font-semibold text-white tracking-tight">Students</h1>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {students.map((elem) => (
          <div
            key={elem._id}
            className="bg-[#13161e] border border-white/5 rounded-2xl p-4 flex flex-col hover:border-white/10 transition-all group"
          >
            {/* Avatar / image */}
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#0d0f14] border border-white/5 mb-3 flex-shrink-0">
              {elem.imgURL ? (
                <img
                  className="w-full h-full object-cover"
                  src={elem.imgURL}
                  alt={elem.firstName}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl font-semibold text-indigo-400">
                    {elem.firstName?.[0]}{elem.lastName?.[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <h2 className="text-[13px] font-semibold text-slate-200 leading-tight truncate">
              {elem.firstName} {elem.lastName}
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5 capitalize">{elem.gender}</p>
            <p className="text-[11px] text-slate-600 mt-0.5 truncate">{elem.email}</p>

            {/* Actions */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => editStudent(elem._id)}
                className="flex-1 py-1.5 rounded-lg text-[11px] font-medium bg-indigo-600/10 text-indigo-400 border border-indigo-500/10 hover:bg-indigo-600/20 hover:border-indigo-500/20 transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => deleteStudent(elem._id)}
                className="flex-1 py-1.5 rounded-lg text-[11px] font-medium bg-red-600/10 text-red-400 border border-red-500/10 hover:bg-red-600/20 hover:border-red-500/20 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentShowCard;