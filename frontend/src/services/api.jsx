import axios from "axios";

import Storage from './Storage'

import AuthService from "./authService";

const api = axios.create({
    baseURL: 'http://localhost:8000/api'
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

api.interceptors.response.use(response => {
  return response;
}, async error => {
  const originalRequest = error.config;

  // Check if the error is due to an expired token (401 status)
  if (error.response.status === 401 && !originalRequest._retry) {

      try {
          console.log("Fetching new token")
          const refreshToken = Storage.getRefreshToken();
          const response = await AuthService.refreshToken(refreshToken);

          const newAccessToken = response.data.access;

          // Store the new token
          Storage.updateAccessToken(newAccessToken)

          // Update the Authorization header and retry the original request
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest);  // Retry the original request
      } catch (refreshError) {
          console.log('Refresh token failed:', refreshError);
          originalRequest._retry = false
          originalRequest._isRefreshing = false; // Reset the flag
          Storage.removeTokenData()
          window.location.href = '/';
          return Promise.reject(refreshError);
      }
  }

  return Promise.reject(error);
});

export default api;
