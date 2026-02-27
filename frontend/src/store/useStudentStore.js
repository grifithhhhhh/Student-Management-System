import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStudentStore = create(
  persist(
    (set) => ({
      // 🔹 state
      students: [],
      user: null,     // admin or student
      role: null,

      // 🔹 ADMIN LOGIN (matches your backend response)
      loginAdmin: (backendData) =>
        set({
          user: backendData.admin,
          role: "admin",
          students: backendData.StudentData,
        }),

      // 🔹 STUDENT LOGIN (if needed)
      loginStudent: (studentData) =>
        set({
          user: studentData,
          role: "student",
          students: studentData,
        }),

      // 🔹 set full student list manually
      setStudents: (studentsArray) =>
        set({
          students: studentsArray,
        }),

      // 🔹 add single student (after POST)
      addStudent: (newStudent) =>
        set((state) => ({
          students: [...state.students, newStudent],
        })),

      deleteStudent: (studentId) =>
        set((state) => ({
          students: state.students.filter(
            (student) => student._id !== studentId
          ),
        })),

      // 🔹 logout
      logout: () =>
        set({
          user: null,
          role: null,
          students: [],
        }),
    }),
    {
      name: "student-storage",
    }
  )
);

export default useStudentStore;