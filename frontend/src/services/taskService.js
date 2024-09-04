import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks/';

const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, taskData, config);
  return response.data;
};

const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

export { createTask, getTasks };
