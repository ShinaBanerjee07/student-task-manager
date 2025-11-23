import axios from "axios";

const API = axios.create({
  baseURL: "https://student-task-manager-1.onrender.com/api",
});

export default API;
