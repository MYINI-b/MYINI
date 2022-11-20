import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const getApi = async (url: string) => {
  try {
    const data = await axios.get(`${url}`);
    return data;
  } catch (err) {
    console.log(err, '에러입니다.');
    // alert('문제가 발생했습니다');
    return err;
  }
};
