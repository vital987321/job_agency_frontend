import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // console.log("Token:" + token);
    if (token) {
      config.headers.Authorization = `token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api