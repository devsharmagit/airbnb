import axios from 'axios';

const mode = import.meta.env.VITE_ENVIROMENT

console.log({mode})

let baseUrl = "http://localhost:3500";
if(mode === "prod"){
  baseUrl = "https://bookers-backend.devsharmacode.com"
}


const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default axiosInstance;