import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// const accessToken = localStorage.getItem('accessToken');

const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiUk9MRSI6IlJPTEVfVVNFUiIsImlhdCI6MTY2Nzg3MTY1OCwiZXhwIjoxNjY4NDc2NDU4fQ.A4x1dag6Zh_yqjbhuYDTwLkKFVuM7AwvCtn0hBzpsx8';

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
