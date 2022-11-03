import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiUk9MRSI6IlJPTEVfVVNFUiIsImlhdCI6MTY2NzI2NTcyMywiZXhwIjoxNjY3ODcwNTIzfQ.WSa3oFZmJtaXSdsMM0V46FgRFY53zP5E1sydiorQwgI';

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
    console.log(err);
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
