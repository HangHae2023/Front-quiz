import React, { useState } from "react";
import Layout from "../components/page";
import { Nav } from "../components/page";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __isSameNickname } from "../redux/modules/signUpSlice";
import * as style from "../components/style/StyleRegister";
import { MainButton } from "../components/style/StyleButton";
import api from "../axios/api";
import { async } from "q";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newUsers, setNewUsers] = useState({
    userId: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });

  const [wrongPw, setWrongPw] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewUsers({
      ...newUsers,
      [name]: value.replace(/[^a-zA-Z0-9]/gi, "").substring(0, 30),
    });
  };

  const onSubmitButtonHandler = async (e) => {
    e.preventDefault();

    if (newUsers.password !== newUsers.passwordCheck) {
      setWrongPw("비밀번호가 일치하지 않습니다!");
    } else {
      try {
        const { data } = await api.post(`/user/signup`, { ...newUsers });
        alert(data.message);
        navigate("/Login");
      } catch (error) {
        if (error.response.status === 409) {
          alert(error.response.data.errorMessage.errorMessage);
        } else if (error.response.status === 500) {
          alert(error.response.data.errorMessage.errorMessage);
        } else {
          alert(error.response.data.errorMessage.errorMessage);
        }
      }
    }
  };

  const isNicknameSameButtonHandler = async () => {
    try {
      await api.post(`/user/signup/nkck`, {
        ...newUsers,
        nickname: newUsers.nickname,
      });
    } catch (error) {
      // if (error.response.status === 409) {
      //   alert(error.response.data.errorMessage);
      // } else if (error.response.status === 500) {
      //   alert(error.response.data.errorMessage);
      // } else {
      //   alert(error.response.data.errorMessage);
      // }
      console.log(error);
    }
  };

  return (
    <>
      <Nav />
      <Layout>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
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
            />
            <style.StSignupSameButton
              type="button"
              onClick={isNicknameSameButtonHandler}
            >
              중복확인
            </style.StSignupSameButton>
            <style.StSignupInput
              type="text"
              name="userId"
              placeholder="아이디를 입력하세요"
              value={newUsers.userId}
              onChange={onChangeHandler}
            />
            <style.StSignupSameButton type="button">
              중복확인
            </style.StSignupSameButton>
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
            {wrongPw}
            <MainButton type="login">회원가입하기!</MainButton>

            <style.StSignupButton onClick={() => navigate("/login")}>
              계정이 이미 있으신가요? &nbsp;
              <span
                style={{
                  color: "red",
                  border: "1px solid red",
                  borderRadius: "10px",
                  // fontSize:"15px"
                }}
              >
                &nbsp;로그인&nbsp;
              </span>
            </style.StSignupButton>
          </style.StSignUpGroup>
        </style.StSignupForm>
      </Layout>
    </>
  );
};

export default Register;
