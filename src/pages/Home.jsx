import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { Flexdiv, Nav } from '../components/page';
import { __getQuiz } from '../redux/modules/quizSlice';
import * as style from '../components/style/StyleHome';
import { ModalBackground, ModalContent, ModalOpenTrigger } from '../components/Modal';
import Quiz from './Quiz';
import Answer from './Answer';
import { MainButton } from '../components/style/StyleButton';
import { StSignUpId } from '../components/style/StyleRegister';

function Home() {
  const dispatch = useDispatch();
  const { quiz } = useSelector((state) => state.quizSlice);
  console.log(quiz?.allQuizs);
  useEffect(() => {
    dispatch(__getQuiz());
  }, []);

  return (
    <>
      <Nav login={true} signup={true} />
      <Layout>
        <style.StListContainer>
          <span
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Flexdiv>
              <ModalOpenTrigger>
                <ModalBackground />
                <StSignUpId>
                  <span>오늘의 퀴즈는?</span>
                  <MainButton type="pink">퀴즈 추가하기</MainButton>
                </StSignUpId>
              </ModalOpenTrigger>
              <ModalContent>
                <Quiz />
              </ModalContent>
            </Flexdiv>
          </span>
          <br />
          <br />
          <style.StListWrapper>
            {quiz.allQuizs?.map((item) => {
              return (
                <div key={item?.quizId}>
                  <Answer item={item} />
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
