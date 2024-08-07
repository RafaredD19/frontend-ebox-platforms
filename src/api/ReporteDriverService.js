
import axiosInstance from '@/config/http.config';
// import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function RdriverListApi( token ) {

    return axiosInstance.get(`${baseURL}/drivers`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
