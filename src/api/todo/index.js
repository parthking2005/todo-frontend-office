import { axiosInstance } from '../../helper/axiosConfiguration.js';

const UPDATE = `/todo/update`;
const DELETE = `/todo/delete`;
const CREATE = `/todo/add`;
const READ = `/todo`;

async function updateTodoApiUrl(todoid, data) {
  return await axiosInstance.put(`${UPDATE}/${todoid}`, data);
}

async function deleteTodoApiUrl(todoid) {
  return await axiosInstance.delete(`${DELETE}/${todoid}`);
}

async function addTodoApiUrl(data) {
  return await axiosInstance.post(CREATE, data);
}

async function readTodoApiUrl(data) {
  return await axiosInstance.get(READ, data);
}

export {
  updateTodoApiUrl,
  deleteTodoApiUrl,
  addTodoApiUrl,
  readTodoApiUrl
};