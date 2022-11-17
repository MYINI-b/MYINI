import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const accessToken = localStorage.getItem('accessToken');

// const accessToken =
//   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4IiwiUk9MRSI6IlJPTEVfVVNFUiIsImlhdCI6MTY2ODYwODc1OSwiZXhwIjoxNjY5MjEzNTU5fQ.0kN-ua5PcLQVGKlvxo0C68TDoLPwiwPPkkVtE2zGB_I';

export const authAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    Authorization: `Bearer ${accessToken}` || '',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

authAxios.defaults.withCredentials = true;

export const defaultAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});
