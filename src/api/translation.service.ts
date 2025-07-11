import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getLanguages = () => {
  return apiClient.get('/languages');
};

export const translateText = (text: string, targetLang: string) => {
  return apiClient.post('/translate', { text, targetLang });
};

export const getHistory = () => {
  return apiClient.get('/translations');
};
