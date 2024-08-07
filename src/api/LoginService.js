import axiosInstance from '@/config/http.config';
// import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function authLoginApi(payload) {
  
    return axiosInstance.post(`${baseURL}/auth/login`, payload)
}