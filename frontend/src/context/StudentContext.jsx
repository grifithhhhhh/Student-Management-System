import { useEffect, createContext, useState } from "react";
import axios from "axios";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginStudent = (studentData) => {
    setStudent(studentData);
  };

  const logoutStudent = async () => {
    try {
      await axios.post(
        "http://localhost:8004/api/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed:", err);
    }

    setStudent(null);
  };

  useEffect(() => {
    const handleLoading = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8004/api/me",
          { withCredentials: true }
        );

        setStudent(response.data);
      } catch (err) {
        setStudent(null);
      } finally {
        setLoading(false);
      }
    };

    handleLoading();
  }, []);

  return (
    <StudentContext.Provider
      value={{ student, loginStudent, logoutStudent, loading }}
    >
      {children}
    </StudentContext.Provider>
  );
};