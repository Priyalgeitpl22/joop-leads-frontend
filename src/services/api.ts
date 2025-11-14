import axios from "axios";

// export const baseURL = import.meta.env.VITE_BASE_URL;
export const baseURL ='http://192.168.1.40:5003/api'

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// export const emailBaseURL = import.meta.env.VITE_EMAIL_BASE_URL;
export const emailBaseURL = 'http://192.168.1.40:3000/api'
export const emailApi = axios.create({
  baseURL: emailBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
