import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/page";
import { Nav } from "../components/page";
import { MainButton } from "../components/style/StyleButton";
import * as style from "../components/style/StyleRegister";
import { cookies } from "../shared/cookie";

const Login = () => {
  const navi = useNavigate();
  const nameInput = useRef();

  const [login, setLogin] = useState({
    userId: "",
    password: "",
  });

  useEffect(() => {
    const mytoken = cookies.get("mytoken");
    if (mytoken) {
      // alert("이미 로그인 하셨습니다!");
      navi("/");
    }
    nameInput.current.focus();
  }, [cookies]);

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value.replace(/[^a-zA-Z0-9]/gi, "").substring(0, 30),
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_QUIZ_URL}/user/login`,
        login
      );
      cookies.set("mytoken", data.headers.authorization.split(" ")[1], {
        path: "/",
      });
      navi(-1);
    } catch (error) {
      if (error.response.status === 401) {
        alert("패스워드를 확인해주세요.");
      } else if (error.response.status === 404) {
        alert("존재하지 않는 사용자입니다.");
      } else if (error.response.status === 500) {
        alert("서버 에러가 발생했습니다.");
      } else {
        alert("알 수 없는 에러가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <Nav />
      <Layout style={{ maxWidth: "1000px" }}>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          로 그 인
        </h2>
        <style.StSignupForm onSubmit={submitHandler}>
          <style.HeaderLetter>
            어서오세요 ! <br />
            우리 한번 놀아봅시다 !
          </style.HeaderLetter>

          <style.StSignUpGroup>
            <style.StSignupInput
              type="text"
              name="userId"
              placeholder="아이디를 입력하세요"
              value={login.userId}
              onChange={changeInputHandler}
              required
              ref={nameInput}
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
            <style.StSignupButton onClick={() => navi("/Register")}>
              아직 회원이 아니신가요?&nbsp;
              <span
                style={{
                  color: "red",
                  border: "1px solid red",
                  borderRadius: "10px",
                }}
              >
                &nbsp;회원가입&nbsp;
              </span>
            </style.StSignupButton>
          </style.StSignUpGroup>
        </style.StSignupForm>
      </Layout>
    </>
  );
};

export default Login;
