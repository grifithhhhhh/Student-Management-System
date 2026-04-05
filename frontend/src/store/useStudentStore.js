import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStudentStore = create(
  persist(
    (set) => ({
      // 🔹 state
      students: [],
      courses: [],
      assignments: [],
      user: null,     // admin or student
      role: null,

      // 🔹 ADMIN LOGIN (matches your backend response)
      loginAdmin: (backendData) =>
        set({
          user: backendData.admin,
          role: "admin",
          students: backendData.StudentData,
          assignments: backendData.assignmentData,
          courses: backendData.courseData
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

      addAssignment: (newAssignment) =>
        set((state)=> ({
          assignments: [...state.assignments, newAssignment]
        })),

      editStudent: (updatedStudent) =>
        set((state) => ({
          students: state.students.map((student) =>
            student._id === updatedStudent._id
              ? { ...student, ...updatedStudent }
              : student
          ),
        })),

      deleteStudent: (studentId) =>
        set((state) => ({
          students: state.students.filter(
            (student) => student._id !== studentId
          ),
        })),

      deleteAssignment: (assignmentId) =>
        set ((state) => ({
          assignments: state.assignments.filter(
          (assignment) => assignment._id !== assignmentId    
          ),
        })),

      // 🔹 logout
      logout: () =>
        set({
          user: null,
          role: null,
          students: [],
          assignments: [],
          courses: [],
        }),
    }),
    {
      name: "student-storage",
    }
  )
);

export default useStudentStore;