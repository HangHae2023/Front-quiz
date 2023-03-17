import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
  const [login, setLogin] = useState({
    userId: '',
    password: '',
  });

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const submitHandler = async () => {
    try {
      // await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, login);
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, login);
    } catch (error) {
      alert(JSON.parse(error.request.response).message);
      console.log(error);
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
        name="userId"
        value={login.userId}
        onChange={(e) => changeInputHandler(e)}
      />
      <input
        type="password"
        name="password"
        value={login.password}
        onChange={(e) => changeInputHandler(e)}
      />
      <button>로그인</button>
    </form>
  );
};

export default Login;
