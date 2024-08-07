
import axiosInstance from '@/config/http.config';
// import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function MasterListApi( token ) {

    return axiosInstance.get(`${baseURL}/masters`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function MasterCreatetApi( payload, token ) {

      return axiosInstance.post(`${baseURL}/masters`, payload, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
  }