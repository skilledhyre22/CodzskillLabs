
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../api/apiEndPoints';

const TOKEN_STORAGE_KEY = 'codzskill_jwt_token';

export const tokenStorage = {
  get: (): string | null => localStorage.getItem(TOKEN_STORAGE_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_STORAGE_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_STORAGE_KEY),
};

export interface ApiError {
  status?: number;
  message: string;
  details?: Record<string, string[]>;
}

const apiClient = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.get();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ title?: string; message?: string; errors?: Record<string, string[]> }>) => {
    if (error.response?.status === 401) {
      tokenStorage.clear();
    }

    const normalizedError: ApiError = {
      status: error.response?.status,
      message:
        error.response?.data?.message ||
        error.response?.data?.title ||
        error.message ||
        'An unexpected network error occurred.',
      details: error.response?.data?.errors,
    };

    return Promise.reject(normalizedError);
  }
);

export default apiClient;
