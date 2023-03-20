import axios from 'axios';
import { cookies } from '../shared/cookie';
const token = cookies.get('mytoken');

const instance = axios.create({
  baseURL: process.env.REACT_APP_QUIZ_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  // 서버요청 시간을 정해서 이 시간이 지나면 오류를 발생하게 함
  timeout: 10000,
});

instance.interceptors.request.use(
  // 요청을 보내기 전 수행되는 함수
  function (config) {
    console.log('인터셉터 요청 성공');
    return config;
  },

  // 오류 요청을 보내기 전 수행되는 함수
  function (error) {
    console.log('인터셉터 요청 오류');
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  // 응답을 내보내기 전 수행되는 함수
  function (response) {
    console.log('인터셉터 응답 받았습니다!');
    return response;
  },

  // 오류응답을 내보내기 전 수행되는 함수
  function (error) {
    console.log('오류');
    return Promise.reject(error);
  }
);
export default instance;
