import axios from "axios";

const API = axios.create({
  baseURL: "https://student-task-manager-2.onrender.com",
});

export default API;
