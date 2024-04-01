import axios from "axios";

const axiosInstance = axios.create({
  url: "http://localhost:5000/internship/api/v1",
});

export default axiosInstance;
