import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Nav } from "../components/page";
import { __getQuiz } from "../redux/modules/quizSlice";
import { RiLogoutBoxFill } from "react-icons/ri";
import * as style from "../components/style/Home";


function Home() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { quiz } = useSelector((state) => state.quizSlice);

  useEffect(() => {
    dispatch(__getQuiz());
  }, [dispatch]);

  const onClickAnswerButton = () => {
    const answer = prompt("정답을 입력하세요");
    if (answer === quiz.answer) {
      alert("MZ가 맞으시군요??!!");
    } else {
      alert("MZ가 아니시군요??");
    }
    navigator(`/detail/${quiz.postId}`);
  };

  return (
    <>
      <Nav />
      <Layout>
        <style.StListContainer>
          <span
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "20px",
            }}
          >
            <RiLogoutBoxFill
              size="40px"
              // onClick={}
            />
            <style.StAddButton>퀴즈 추가하기</style.StAddButton>
          </span>
          <br />
          <br />
          <style.StListWrapper>
            {quiz.map((quiz) => {
              return (
                <style.StQuizContainer key={quiz.postId}>
                  <style.StImageBox>사진공간</style.StImageBox>
                  <h3>{quiz.title}</h3>
                  <style.StAnswerButton onClick={() => onClickAnswerButton()}>
                    정답 입력하기
                  </style.StAnswerButton>
                  <style.StNickname>{quiz.nickname}</style.StNickname>
                </style.StQuizContainer>
              );
            })}
          </style.StListWrapper>
        </style.StListContainer>
      </Layout>
    </>
  );
}


export default Home;