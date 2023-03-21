import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/page";
import { Flexdiv, Nav } from "../components/page";
import { modalOnOff, __getQuiz } from "../redux/modules/quizSlice";
import * as style from "../components/style/StyleHome";
import {
  ModalBackground,
  ModalContent,
  ModalOpenTrigger,
} from "../components/Modal";
import { MainButton } from "../components/style/StyleButton";
import AddQuiz from "./AddQuiz";
import Card from "./Card";
import { cookies } from "../shared/cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.quizSlice.modal);
  const navi = useNavigate();

  const { isLoading, error, quiz } = useSelector((state) => state.quizSlice);

  useEffect(() => {
    dispatch(__getQuiz());
  }, [dispatch]);

  const onClickAddQuiz = async () => {
    const token = cookies.get("mytoken"); // 유효성검사 추가하기
    // token ? dispatch(modalOnOff(modalState)) : alert('로그인 후 이용 가능합니다');
    if (token) {
      try {
        await axios.get(`${process.env.REACT_APP_QUIZ_URL}/user/loginck`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(modalOnOff(modalState));
      } catch (error) {
        alert("다시 로그인 해주세요");
      }
    } else {
      window.confirm("로그인 후 이용해주세요") && navi("/login");
    }
  };

  // if (isLoading) {
  //   return <div>로딩중</div>;
  // }
  // switch (error) {
  //   case 400:
  //     alert('다시 로딩해주세요');
  //   case 403:
  //     alert('로그인이 필요합니다');
  //   default:
  //     console.log('error', error);
  // }
  return (
    <>
      <Nav login={true} signup={true} />
      <Layout color="#518edb">
        <style.StListContainer>
          <Flexdiv>
            <style.StTodayQuiz>
              오늘의 퀴즈는?
              <ModalOpenTrigger>
                <ModalBackground />
              </ModalOpenTrigger>
              <MainButton type="blue" onClick={onClickAddQuiz}>
                퀴즈 추가하기
              </MainButton>
            </style.StTodayQuiz>
            <ModalContent>
              <AddQuiz />
            </ModalContent>
          </Flexdiv>
          <br />
          <br />
          <style.StListWrapper>
            {quiz.allQuizs?.map((item) => {
              return (
                <div key={item?.quizId}>
                  <Card item={item} />
                </div>
              );
            })}
          </style.StListWrapper>
        </style.StListContainer>
      </Layout>
    </>
  );
}

export default Home;
