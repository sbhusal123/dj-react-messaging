import axios from "axios";

import Storage from './Storage'

// import AuthService from "./authService";


const API_URL = import.meta.env.VITE_API_URL;


const api = axios.create({
    baseURL: `${API_URL}/api`
})

// Request interceptor to add the JWT token to the request headers
api.interceptors.request.use(config => {
  const token = Storage.getAccessToken();
  if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// TODO: Response interceptor to retry with JWT refresh token

export default api;
