// src/api/authService.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/auth` : 'http://localhost:3000/api/auth';

export const registerUser = (userData: any) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = (userData: any) => {
  return axios.post(`${API_URL}/login`, userData);
};
