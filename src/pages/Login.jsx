import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navi = useNavigate();
  const [login, setLogin] = useState({
    userId: '',
    password: '',
  });

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, login);
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, login);
    } catch (error) {
      alert(JSON.parse(error.request.response).message);
      console.log(error);
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <h1>Login</h1>
      <input
        type="text"
        name="userId"
        placeholder="아이디를 입력하세요"
        value={login.userId}
        onChange={(e) => changeInputHandler(e)}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요"
        value={login.password}
        onChange={(e) => changeInputHandler(e)}
        required
      />
      <button>로그인</button>
      <button onClick={() => navi('/Register')}>회원가입</button>
    </form>
  );
};

export default Login;
