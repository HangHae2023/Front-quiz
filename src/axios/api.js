import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { cookies } from '../shared/cookie';

const instance = axios.create({
  baseURL: process.env.REACT_APP_QUIZ_URL,

  // 서버요청 시간을 정해서 이 시간이 지나면 오류를 발생하게 함
  timeout: 5000,
});

instance.interceptors.request.use(
  // 요청을 보내기 전 수행되는 함수
  function (req) {
    const token = cookies.get('mytoken');
    // 겟 했을때 토큰이 없으면 요청 그대로 리턴
    // if (!token) return req;

    // 토큰이 있으면 헤더에 넣어서 리턴
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  },

  // 오류 요청을 보내기 전 수행되는 함수
  function (error) {
    // console.log('인터셉터 요청 오류');
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  // 응답을 내보내기 전 수행되는 함수
  function (response) {
    return response;
  },

  // 오류응답을 내보내기 전 수행되는 함수
  function (error) {
    const navi = useNavigate();
    switch (error.request.status) {
      // case 500:
      //   return Promise.reject(alert('다시 시도해주세요'));
      case 412:
        return Promise.reject(alert('내용을 입력해주세요'));
      case 404:
        return Promise.reject(alert('게시글이 존재하지 않습니다'));
      case 403:
        return Promise.reject(alert('권한이 없습니다'));
      case 401:
        cookies.remove('mytoken', { path: '/' });
        return Promise.reject(
          window.confirm('다시 로그인이 필요합니다.') && navi('/login')
        );
      case 200:
        return Promise.reject(alert('로그인후 이용해주세요'));
      default:
        return Promise.reject(error);
    }
  }
);
export default instance;
