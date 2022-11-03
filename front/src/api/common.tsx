import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { SET_TOKEN } from 'reducers/Auth';

const SERVER_ADDRESS = 'https://k7b203.p.ssafy.io/api';

const accessToken = localStorage.getItem('accessToken');
console.log(accessToken, 'token?');

export const authAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}` || '',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

authAxios.defaults.withCredentials = true;

export const defaultAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
});
