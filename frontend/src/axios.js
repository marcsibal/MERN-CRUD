// src/axios.js
import axios from 'axios';

// Function to create an authenticated axios instance
export const createAuthAxios = (token) => {
  const instance = axios.create({
    baseURL: 'http://localhost:5000', // Your API base URL
  });

  if (token) {
    instance.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return instance;
};
