import React, { useState } from "react";
import Layout from "../components/Layout";
import { Nav } from "../components/page";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __isSameNickname, __signUpId } from "../redux/modules/signUpSlice";
import * as style from "../components/style/Register";

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
    setNewUsers({ ...newUsers, [name]: value });
  };

  const onSubmitButtonHandler = (e) => {
    e.preventDefault();

    if (newUsers.password !== newUsers.passwordCheck) {
      setWrongPw("비밀번호가 일치하지 않습니다!");
    } else {
      dispatch(__signUpId({ ...newUsers }));
    }
  };

  const isNicknameSameButtonHandler = (nickname) => {
    dispatch(__isSameNickname(newUsers.nickname));
  };

  return (
    <>
      <Nav />
      <Layout>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          회 원 가 입
        </h2>
        <style.StSignupForm onSubmit={onSubmitButtonHandler}>
          <style.StSignUpGroup>
            <style.StSignUpId>
              <style.StSignupInput
                type="text"
                name="nickname"
                placeholder="닉네임을 입력하세요"
                value={newUsers.nickname}
                onChange={onChangeHandler}
              />
              &nbsp;
              <style.StSignupButton
                type="button"
                onClick={() => isNicknameSameButtonHandler(newUsers.nickname)}
              >
                중복확인
              </style.StSignupButton>
            </style.StSignUpId>
            <style.StSignUpId>
              <style.StSignupInput
                type="text"
                name="userId"
                placeholder="아이디를 입력하세요"
                value={newUsers.userId}
                onChange={onChangeHandler}
              />
              &nbsp;
              <style.StSignupButton type="button">중복확인</style.StSignupButton>
            </style.StSignUpId>
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <style.StSignupButton>회원가입하기!</style.StSignupButton>
              <AiFillHome
                type="button"
                onClick={() => {
                  navigate("/");
                }}
                style={{
                  marginLeft: "20px",
                }}
                size="30px"
              />
            </div>
          </style.StSignUpGroup>
        </style.StSignupForm>
      </Layout>
    </>
  );
};

export default Register;

