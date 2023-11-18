import axios from "axios";

// axios
const axiosInstance = axios.create({
  baseURL: "/api/v1/",
});

// response/request
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("logging out");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
