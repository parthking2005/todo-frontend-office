import { axiosInstance } from '../../helper/axiosConfiguration.js';

const REGISTER = "/user/register";
const LOGIN = "/user/login";
const DELETEUSER = "user/deleteuser";
const UPDATEUSER = "user/updateuser";
const USERDETAILS = "user/getuserdetails";

async function registerUserApiUrl(data) {
  return await axiosInstance.post(REGISTER,data);
}

async function loginUserApiUrl(data) {
  return await axiosInstance.post(LOGIN, data);
}

async function deleteUserApiUrl() {
  return await axiosInstance.delete(DELETEUSER);
}

async function readUserDataApiUrl() {
  return await axiosInstance.get(USERDETAILS);
}

async function updateUserApiUrl(data) {
  return await axiosInstance.put(UPDATEUSER, data);
}

export {
    registerUserApiUrl,
    loginUserApiUrl,
    deleteUserApiUrl,
    updateUserApiUrl,
    readUserDataApiUrl
};