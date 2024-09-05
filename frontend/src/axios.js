import axios from 'axios';


export const createAuthAxios = (token) => {
  const instance = axios.create({
    baseURL: 'http://localhost:5000',
  });

  if (token) {
    instance.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return instance;
};
