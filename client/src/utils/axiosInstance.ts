import axios from "axios";

const mode = import.meta.env.PROD;

let baseUrl = "http://localhost:3500";

if (mode === true) {
  baseUrl = "https://bookers-backend.devsharmacode.com";
}

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default axiosInstance;
