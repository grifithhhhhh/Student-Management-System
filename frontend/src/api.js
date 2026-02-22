import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8004",
});

export default API;