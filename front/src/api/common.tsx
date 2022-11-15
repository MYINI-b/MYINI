import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsIlJPTEUiOiJST0xFX1VTRVIiLCJpYXQiOjE2Njg0ODQxODYsImV4cCI6MTY2OTA4ODk4Nn0.zsn9X8sEPXyLVO19N1BL0qdOy9KNbGbZusRFa7Syh6U'; // localStorage.getItem('accessToken');

// const accessToken =
//   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4IiwiUk9MRSI6IlJPTEVfVVNFUiIsImlhdCI6MTY2ODQ4NTAyMSwiZXhwIjoxNjY5MDg5ODIxfQ.rfrS89tGfsBwCiKqN9IBx451tGORmSYOw_Y2arNaDdU';

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
