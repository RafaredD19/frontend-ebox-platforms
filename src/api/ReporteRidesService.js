
import axiosInstance from '@/config/http.config';
// import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function RridesListApi( token ,payload ) {

    return axiosInstance.post(`${baseURL}/rides/report`,payload,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
