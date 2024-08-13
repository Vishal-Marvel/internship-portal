import axios from "axios";

const axiosInstance = axios.create({
  // url: "https://internship-portal-backend.vercel.app/internship/api/v1",
  url: "https://internship-portal-backend.vercel.app/internship/api/v1",
});

export default axiosInstance;
