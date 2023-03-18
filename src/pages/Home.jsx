import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import { Nav } from "../components/page";
import { __getQuiz } from "../redux/modules/quizSlice";
import { RiLogoutBoxFill } from "react-icons/ri";

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
      alert("정답입니다!!");
    } else {
      alert("MZ가 아니시군요??");
    }
    navigator(`/detail/${quiz.postId}`);
  };

  return (
    <>
      <Nav />
      <Layout>
        <StListContainer>
          <span
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap:"20px"
            }}
          >
            <RiLogoutBoxFill size="40px" 
            // onClick={}
            />
            <StAddButton>퀴즈 추가하기</StAddButton>
          </span>
          <br />
          <br />
          <StListWrapper>
            {quiz.map((quiz) => {
              return (
                <StQuizContainer key={quiz.postId}>
                  <StImageBox>사진공간</StImageBox>
                  <h3>{quiz.title}</h3>
                  <StAnswerButton onClick={() => onClickAnswerButton()}>
                    정답 입력하기
                  </StAnswerButton>
                </StQuizContainer>
              );
            })}
          </StListWrapper>
        </StListContainer>
      </Layout>
    </>
  );
}

export default Home;

const StAddButton = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  background-color: teal;
  width: 140px;
  color: #fff;
  font-weight: 700;
`;

const StListContainer = styled.div`
  padding: 0 24px;
`;

const StListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
`;

const StQuizContainer = styled.div`
  width: 270px;
  border: 4px solid teal;
  min-height: 150px;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StImageBox = styled.div`
  width: 250px;
  height: 150px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StAnswerButton = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  background-color: teal;
  width: 140px;
  color: #fff;
  font-weight: 700;
`;
