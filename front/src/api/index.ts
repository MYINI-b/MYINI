import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsIlJPTEUiOiJST0xFX1VTRVIiLCJpYXQiOjE2Njg0ODQxODYsImV4cCI6MTY2OTA4ODk4Nn0.zsn9X8sEPXyLVO19N1BL0qdOy9KNbGbZusRFa7Syh6U'; // localStorage.getItem('accessToken');

// const accessToken = localStorage.getItem('accessToken');

const headers = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

export const getApi = async (url: string) => {
  try {
    const data = await axios.get(`${url}`, headers);
    return data;
  } catch (err) {
    console.log(err, '에러입니다.');
    // alert('문제가 발생했습니다');
    return err;
  }
};

export const postApi = async (url: string, body?: any) => {
  try {
    const data = await axios.post(`${url}`, body, headers);
    return data;
  } catch (err) {
    console.log(err);
    // alert('문제가 발생했습니다');
    return err;
  }
};

export const putApi = async (url: string, body?: any) => {
  try {
    const data = await axios.put(`${url}`, body, headers);
    return data;
  } catch (err) {
    console.log(err);
    // alert('문제가 발생했습니다');
    return err;
  }
};

export const deleteApi = async (url: string) => {
  try {
    const data = await axios.delete(`${url}`, headers);
    return data;
  } catch (err) {
    console.log(err);
    // alert('문제가 발생했습니다');
    return err;
  }
};

export const patchApi = async (url: string, body?: any) => {
  try {
    const data = await axios.patch(`${url}`, body, headers);
    return data;
  } catch (err) {
    console.log(err);
    // alert('문제가 발생했습니다');
    return err;
  }
};
