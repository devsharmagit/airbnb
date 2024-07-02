import axios from 'axios';

const mode = import.meta.env.MODE

console.log({mode})

let baseUrl = mode === "dev" ? "http://localhost:3500" : "https://bookers-backend.devsharmacode.com";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default axiosInstance;