import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { config } from '../config';
import { store } from '../store';
import { forceLogout } from '../store/slices/authSlice';

// Create axios instance for main API
export const api = axios.create({
  baseURL: config.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Create axios instance for email API
export const emailApi = axios.create({
  baseURL: config.api.emailBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor - Add auth token to requests
const addAuthToken = (axiosConfig: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = Cookies.get(config.auth.tokenKey);
  if (token && axiosConfig.headers) {
    axiosConfig.headers.Authorization = `Bearer ${token}`;
  }
  return axiosConfig;
};

// Helper function to handle unauthorized access - clears local state only
// Does not call logout API to avoid infinite loops on 401/403
const handleUnauthorized = () => {
  // Dispatch forceLogout to clear Redux state and cookies
  store.dispatch(forceLogout());
  // Redirect to login page
  window.location.href = '/login';
};

// Response interceptor - Handle errors globally
const handleResponseError = (error: AxiosError) => {
  if (error.response) {
    const { status } = error.response;
    // const data = error.response.data as { message: string };

    if (status === 400) {
      console.error('Bad Request: ', error.response.data);
      // toast.error(error.response.data.message);
    }
    
    // Handle 401 Unauthorized - logout and redirect to login
    if (status === 401) {
      handleUnauthorized();
    }
    
    // Handle 403 Forbidden - logout and redirect to login
    if (status === 403) {
      console.error('Access forbidden - logging out user');
      handleUnauthorized();
    }
    
    // Handle 500 Server Error
    if (status >= 500) {
      console.error('Server error occurred');
    }
  }
  
  return Promise.reject(error);
};

// Apply interceptors to both API instances
[api, emailApi].forEach((instance) => {
  instance.interceptors.request.use(addAuthToken, (error) => Promise.reject(error));
  instance.interceptors.response.use((response) => response, handleResponseError);
});

export default api;
