import React, { useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { Nav } from "../components/page";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __isSameNickname, __signUpId } from "../redux/modules/signUpSlice";

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
        <StSignupForm onSubmit={onSubmitButtonHandler}>
          <StSignUpGroup>
            <StSignUpId>
              <StSignupInput
                type="text"
                name="nickname"
                placeholder="닉네임을 입력하세요"
                value={newUsers.nickname}
                onChange={onChangeHandler}
              />
              &nbsp;
              <StSignupButton
                type="button"
                onClick={() => isNicknameSameButtonHandler(newUsers.nickname)}
              >
                중복확인
              </StSignupButton>
            </StSignUpId>
            <StSignUpId>
              <StSignupInput
                type="text"
                name="userId"
                placeholder="아이디를 입력하세요"
                value={newUsers.userId}
                onChange={onChangeHandler}
              />
              &nbsp;
              <StSignupButton type="button">중복확인</StSignupButton>
            </StSignUpId>
            <StSignupInput
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={newUsers.password}
              onChange={onChangeHandler}
            />
            <StSignupInput
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
              <StSignupButton>회원가입하기!</StSignupButton>
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
          </StSignUpGroup>
        </StSignupForm>
      </Layout>
    </>
  );
};

export default Register;

const StSignupForm = styled.form`
  background-color: #eee;
  border-radius: 12px;
  margin: 0 auto;
  margin-top: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 20px;
`;

const StSignUpGroup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const StSignUpId = styled.div`
  gap: 20px;
`;

const StSignupInput = styled.input`
  height: 40px;
  width: 240px;
  border: 1px solid black;
  border-radius: 12px;
  padding: 0 12px;
`;

const StSignupButton = styled.button`
  border: 1px solid black;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  width: 140px;

  font-weight: 700;
`;
