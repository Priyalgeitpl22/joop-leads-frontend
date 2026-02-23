import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { config } from '../config';
import { store } from '../store';
import { forceLogout } from '../store/slices/authSlice';

export const api = axios.create({
  baseURL: config.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const emailApi = axios.create({
  baseURL: config.api.emailBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

const addAuthToken = (axiosConfig: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = Cookies.get(config.auth.tokenKey);
  if (token && axiosConfig.headers) {
    axiosConfig.headers.Authorization = `Bearer ${token}`;
  }
  return axiosConfig;
};

const handleUnauthorized = () => {
  store.dispatch(forceLogout());
  window.location.href = '/login';
};

/** Notify the app to show the limit-reached dialog (e.g. App listens for this event). */
const handlePaymentRequired = () => {
  window.dispatchEvent(new CustomEvent('api:payment-required'));
};

const handleResponseError = (error: AxiosError) => {
  if (error.response) {
    const { status } = error.response;
    if (status === 400) {
      console.error('Bad Request: ', error.response.data);
    }

    if (status === 401) {
      handleUnauthorized();
    }

    if (status === 403) {
      console.error('Access forbidden');
    }

    if (status === 402) {
      console.error('Payment required');
      handlePaymentRequired();
    }

    if (status >= 500) {
      console.error('Server error occurred');
    }
  }
  
  return Promise.reject(error);
};

[api, emailApi].forEach((instance) => {
  instance.interceptors.request.use(addAuthToken, (error) => Promise.reject(error));
  instance.interceptors.response.use((response) => response, handleResponseError);
});

export default api;
