
import axiosInstance from '@/config/http.config';
// import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function RvehicleListApi( token ) {

    return axiosInstance.get(`${baseURL}/buses`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
