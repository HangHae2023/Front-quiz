import axios from 'axios';
import React, { useState } from 'react';
import { cookies } from '../components/cookie';

const Login = () => {
  const [login, setLogin] = useState({
    id: '',
    password: '',
  });

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const submitHandler = async () => {
    try {
      const data = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, login);
      cookies.set('mytoken', data.data.token, { path: '/' });
    } catch (error) {
      alert(JSON.parse(error.request.response).message);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler();
      }}
    >
      <h1>Login</h1>
      <input
        type="text"
        name="id"
        value={login.id}
        onChange={(e) => changeInputHandler(e)}
      />
      <input
        type="password"
        name="pw"
        value={login.pw}
        onChange={(e) => changeInputHandler(e)}
      />
      <button>로그인</button>
    </form>
  );
};

export default Login;
