import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Flexdiv, Nav } from '../components/page';
import { modalOnOff, __getQuiz } from '../redux/modules/quizSlice';
import { RiLogoutBoxFill } from 'react-icons/ri';
import * as style from '../components/style/Home';
import { ModalBackground, ModalContent, ModalOpenTrigger } from '../components/Modal';
import Quiz from './Quiz';

function Home() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.quizSlice.modal);
  const navigator = useNavigate();
  const { quiz } = useSelector((state) => state.quizSlice);
  console.log(quiz?.allQuizs);
  useEffect(() => {
    dispatch(__getQuiz());
  }, []);

  const onClickAnswerButton = () => {
    const answer = prompt('정답을 입력하세요');
    if (answer === quiz.answer) {
      alert('MZ가 맞으시군요??!!');
    } else {
      alert('MZ가 아니시군요??');
    }
    // navigator(`/detail/${quiz.allQuizs.quizId}`);
  };

  return (
    <>
      <Nav />
      <Layout>
        <style.StListContainer>
          <span
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '20px',
            }}
          >
            <RiLogoutBoxFill
              size="40px"
              // onClick={}
            />
            <Flexdiv>
              <ModalOpenTrigger>
                <ModalBackground />
                <style.StAddButton>퀴즈 추가하기</style.StAddButton>
              </ModalOpenTrigger>
              <ModalContent>
                <Quiz />
              </ModalContent>
            </Flexdiv>
          </span>
          <br />
          <br />
          <style.StListWrapper>
            {quiz.allQuizs?.map((quiz) => {
              return (
                <style.StQuizContainer key={quiz?.quizId}>
                  <style.StImageBox>사진을 어케넣지?</style.StImageBox>
                  {/* {quiz.resourceUrl} */}
                  <h3>{quiz?.title}</h3>
                  <ModalOpenTrigger>
                    {/* <style.StAnswerButton onClick={() => onClickAnswerButton()}> */}
                    <style.StAnswerButton onClick={dispatch(modalOnOff(modalState))}>
                      정답 입력하기
                    </style.StAnswerButton>
                    <ModalBackground />
                  </ModalOpenTrigger>
                  <ModalContent></ModalContent>
                  <style.StNickname>{quiz?.nickname}</style.StNickname>
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
