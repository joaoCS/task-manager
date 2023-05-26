import axios from "axios";

const api = axios.create({
   // baseURL: "http://localhost:3001",
   baseURL: "https://taskmanager456.onrender.com"
});

export default api;