import axios from "axios";

// axios
const axiosInstance = axios.create({
  baseURL: "/api/v1/",
});

// response/request
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
