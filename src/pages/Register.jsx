import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/page';
import { Nav } from '../components/page';
import { useNavigate } from 'react-router-dom';
import * as style from '../components/style/StyleRegister';
import { MainButton } from '../components/style/StyleButton';
import api from '../axios/api';
import { cookies } from '../shared/cookie';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const nameInput = useRef();

  const [newUsers, setNewUsers] = useState({
    userId: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  });

  const [wrongInput, setWrongInput] = useState('');

  // 토큰 유무 판단하여 로그인 페이지 막기,
  useEffect(() => {
    const mytoken = cookies.get('mytoken');
    if (mytoken) {
      // alert("이미 로그인 하셨습니다!");
      navigate('/');
    }
    nameInput.current.focus();
  }, [cookies]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewUsers({
      ...newUsers,
      [name]: value.replace(/[^a-zA-Z0-9]{0,12}$/gi, '').substring(0, 30),
    });
  };

  // 닉네임 중복 확인 버튼
  const isNicknameSameButtonHandler = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_QUIZ_URL}/user/signup/nkck`, {
        nickname: newUsers.nickname,
      });
      alert('사용가능한 닉네임입니다.');
    } catch (error) {
      // if (error.response.status === 409) {
      //   alert("중복된 닉네임 입니다");
      // } else if (error.response.status === 500) {
      //   alert("서버 에러가 발생했습니다.");
      // } else {
      //   alert("알 수 없는 에러가 발생했습니다.");
      // }
      console.log(error);
    }
  };

  // 아이디 중복 확인 버튼
  const isUserIdSameButtonHandler = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_QUIZ_URL}/user/signup/idck`, {
        userId: newUsers.userId,
      });
      alert('사용가능한 아이디입니다.');
    } catch (error) {
      if (error.response.status === 409) {
        alert('중복된 아이디 입니다');
      } else if (error.response.status === 500) {
        alert('서버 에러가 발생했습니다.');
      } else {
        alert('알 수 없는 에러가 발생했습니다.');
      }
    }
  };

  // 회원가입 버튼
  const onSubmitButtonHandler = async (e) => {
    e.preventDefault();
    if (newUsers.password !== newUsers.passwordCheck) {
      setWrongInput('비밀번호가 일치하지 않습니다!');
    } else if (
      newUsers.nickname === '' ||
      newUsers.userId === '' ||
      newUsers.password === '' ||
      newUsers.passwordCheck === ''
    ) {
      setWrongInput('정보를 다 입력해주세요!');
    } else {
      try {
        const data = await axios.post(
          `${process.env.REACT_APP_QUIZ_URL}/user/signup`,
          newUsers
        );
        alert(data.data.message);
        navigate('/Login');
      } catch (error) {
        if (error.response.status === 409) {
          alert(error.response.data.errorMessage);
        } else if (error.response.status === 500) {
          alert('서버 에러가 발생했습니다.');
        } else {
          alert('알 수 없는 에러가 발생했습니다.');
        }
      }
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
          회 원 가 입
        </h2>
        <style.StSignupForm onSubmit={onSubmitButtonHandler}>
          <style.HeaderLetter>
            환영합니다 ! <br />
            <br />
            같이 한번 놀아봅시다 !
          </style.HeaderLetter>
          <style.StSignUpGroup>
            <style.StSignupInput
              type="text"
              name="nickname"
              placeholder="닉네임을 입력하세요"
              value={newUsers.nickname}
              onChange={onChangeHandler}
              ref={nameInput}
            />
            <MainButton onClick={isNicknameSameButtonHandler} type="blue">
              중복확인
            </MainButton>
            <style.StSignupInput
              type="text"
              name="userId"
              placeholder="아이디를 입력하세요"
              value={newUsers.userId}
              onChange={onChangeHandler}
            />
            <MainButton onClick={isUserIdSameButtonHandler} type="blue">
              중복확인
            </MainButton>
            <style.StSignupInput
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={newUsers.password}
              onChange={onChangeHandler}
            />
            <style.StSignupInput
              type="password"
              name="passwordCheck"
              placeholder="비밀번호를 재입력하세요"
              value={newUsers.passwordCheck}
              onChange={onChangeHandler}
            />
            <span style={{ color: 'red', font: 'bold' }}>{wrongInput}</span>
            <MainButton type="login">회원가입하기!</MainButton>

            <style.StSignupButton
              onClick={() => navigate('/login')}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              계정이 이미 있으신가요? &nbsp;
              <MainButton
                style={{
                  color: 'red',
                  border: '1px solid',
                  backgroundColor: 'transparent',
                }}
              >
                로그인
              </MainButton>
            </style.StSignupButton>
          </style.StSignUpGroup>
        </style.StSignupForm>
      </Layout>
    </>
  );
};

export default Register;
