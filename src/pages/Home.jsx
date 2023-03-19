import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/page';
import { Flexdiv, Nav } from '../components/page';
import { __getQuiz } from '../redux/modules/quizSlice';
import * as style from '../components/style/StyleHome';
import { ModalBackground, ModalContent, ModalOpenTrigger } from '../components/Modal';
import { MainButton } from '../components/style/StyleButton';
import AddQuiz from './AddQuiz';
import Card from './Card';

function Home() {
  const dispatch = useDispatch();
  const { isLoading, error, quiz } = useSelector((state) => state.quizSlice);
  useEffect(() => {
    dispatch(__getQuiz());
  }, []);

  if (isLoading) {
    return <div>로딩중</div>;
  }
  switch (error) {
    case 400:
      alert('다시 로딩해주세요');
    case 403:
    // alert('로그인이 필요합니다');
    default:
      console.log(error);
  }
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
                <MainButton type="blue">퀴즈 추가하기</MainButton>
              </ModalOpenTrigger>
            </style.StTodayQuiz>
            <ModalContent>
              <AddQuiz />
            </ModalContent>
          </Flexdiv>
          <br />
          <br />
          <style.StCords>
            <style.StListWrapper>
              {quiz.allQuizs?.map((item) => {
                return (
                  <div key={item?.quizId}>
                    <Card item={item} />
                  </div>
                );
              })}
            </style.StListWrapper>
          </style.StCords>
        </style.StListContainer>
      </Layout>
    </>
  );
}

export default Home;
