import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const accessToken = localStorage.getItem('accessToken');

export const authAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}` || '',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

authAxios.defaults.withCredentials = true;

export const defaultAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const getMemberAxios = async (url: string) => {
  axios
    .get(`${url}/members/crew`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res, '멤버받아오냐?');
    });
};
