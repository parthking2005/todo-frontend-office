// axios.defaults.baseURL = 'https://localhost:6001/api/v1';
// axios.defaults.headers.common['Authorization'] = `Bearer ${document.cookie.replace("refreshToken=", "")}`;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



// const instance = axios.create({
//     baseURL: 'https://localhost:6001/api/v1'
// });


// instance.defaults.headers.common['Authorization'] = document.cookie.replace("refreshToken=", "");

import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';



export const getRequestHeader = () => {
  const token = Cookies.get('refreshToken');

  return {
    authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json,multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json, text/plain, */*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH',
  };
};


export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_PATH
});


axiosInstance.interceptors.request.use(
  async (config) => {
    const headers = getRequestHeader();

    config.headers = { ...headers, ...config.headers };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);




axiosInstance.interceptors.response.use(
  async (response) => {
    if (response?.data?.statusCode === 401) {
      console.log(window?.location?.pathname)
      if (window?.location?.pathname === '/') {
        toast(response?.data?.message, 'error');
        localStorage.clear();
        Cookies.remove("refreshToken");
        window.location.replace('/login');
      } else {
        toast(response?.data?.message, 'error');
      }
    }
    // else if (response.statusCode !== 201 && response.statusCode !== 200) {
    //   toast(response?.data?.message, 'error');
    // }
    return response;
  },
  async (error) => {
    console.error('Api error: ', error);
    return Promise.reject(error);
  },
);
