import axiosInstance from '@/config/http.config';
import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function usernameAvailabilityApi(username, token) {
  
    return axiosInstance.get(`${baseURL}/auth/usernameAvailability/${username}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export function authLoginApi(data) {
    console.log("==============================>",data)
    return axios.post(`${baseURL}/auth/login`, data)
}