
import axiosInstance from '@/config/http.config';
// import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function CompanieListApi( token ) {

    return axiosInstance.get(`${baseURL}/companies`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export function RecourseListApi( token, payload ) {

  return axiosInstance.post(`${baseURL}/companies/recourses`,payload,{
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
}

export function CompanieCreatetApi(formData, token) {
  console.log("=======================>",formData)
    return axiosInstance.post(`${baseURL}/companies`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  }