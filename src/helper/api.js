import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "https://petric.in/api/";
// const API_URL = "http://192.168.29.198:5000/api/";

const axiosApi = axios.create({
  baseURL: API_URL,
});

// axiosApi.interceptors.request.use((config) => {

//   config.headers["x-platform"] = "website";

//   return config;
// });

axiosApi.interceptors.response.use(
  (response) => {
    if (response.data && (response.data.message === "Invalid or expired token" || response.data.message === "Token expired")) {
      localStorage.removeItem("petric_token");
      window.location.reload();
    }
    return response;
  },
  (error) => {
    if (error.response && (error.response.status === 401 || (error.response.data && (error.response.data.message === "Invalid or expired token" || error.response.data.message === "Token expired")))) {
      localStorage.removeItem("petric_token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);


export async function get(url, config = {}) {
  config.headers = config.headers || {};
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, data, { ...config })
    .then((response) => response.data)
    .catch((response) => response.response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, data, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}

export default axiosApi; 
