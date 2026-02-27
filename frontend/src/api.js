import axios from "axios";
import useStudentStore from "./store/useStudentStore"


const api = axios.create({
    baseURL: "http://localhost:8004",
    withCredentials : true,
});

export default api;