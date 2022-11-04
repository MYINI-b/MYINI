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

const dummyToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiUk9MRSI6IlJPTEVfVVNFUiIsImlhdCI6MTY2NzI2NTcyMywiZXhwIjoxNjY3ODcwNTIzfQ.WSa3oFZmJtaXSdsMM0V46FgRFY53zP5E1sydiorQwgI';

export const getMemberAxios = async (url: string) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${dummyToken}`,
      },
    })
    .then((res) => {
      return res;
    });
};
