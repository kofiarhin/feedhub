import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const setAuthGetter = (getTokenFn) => {
  apiClient.interceptors.request.use(async (config) => {
    const token = getTokenFn ? await getTokenFn() : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default apiClient;
