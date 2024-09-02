import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8000/api'
})

axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        return Promise.resolve({ data: null, status: 401 });
      }
      return Promise.resolve({data: null})
    }
);
