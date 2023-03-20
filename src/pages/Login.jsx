import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Nav } from '../components/page';
import { MainButton } from '../components/style/StyleButton';
import * as style from '../components/style/StyleRegister';

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
      await axios.post(`${process.env.REACT_APP_QUIZ_URL}/api/auth/login`, login);
    } catch (error) {
      alert(JSON.parse(error.request.response).message);
      console.log(error);
    }
  };
  return (
    <>
      <Nav />
      <Layout>
        <h2
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          로 그 인
        </h2>
        <style.StSignupForm onSubmit={submitHandler}>
          <style.HeaderLetter>어서오세요 ! 오늘도 한번 놀아봅시다 !</style.HeaderLetter>

          <style.StSignUpGroup>
            <style.StSignupInput
              type="text"
              name="userId"
              placeholder="아이디를 입력하세요"
              value={login.userId}
              onChange={changeInputHandler}
              required
            />
            &nbsp;
            <style.StSignupInput
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={login.password}
              onChange={changeInputHandler}
              required
            />
            <MainButton type="login">로그인</MainButton>
            <style.StSignupButton onClick={() => navi('/Register')}>
              아직 회원이 아니신가요?
              <span style={{ color: 'red' }}>회원가입</span>
            </style.StSignupButton>
          </style.StSignUpGroup>
        </style.StSignupForm>
      </Layout>
    </>
  );
};

export default Login;
