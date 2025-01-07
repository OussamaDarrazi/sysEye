// lib/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://your-backend-url/api', // Replace with your backend API URL
  withCredentials: true, // Required for Sanctum to send cookies
});

export default axiosInstance;
