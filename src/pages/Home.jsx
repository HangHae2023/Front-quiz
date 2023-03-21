import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/page';
import { Flexdiv, Nav } from '../components/page';
import { modalOnOff, __getQuiz } from '../redux/modules/quizSlice';
import * as style from '../components/style/StyleHome';
import { ModalBackground, ModalContent, ModalOpenTrigger } from '../components/Modal';
import { MainButton } from '../components/style/StyleButton';
import AddQuiz from './AddQuiz';
import Card from './Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../axios/api';
import { cookies } from '../shared/cookie';

function Home() {
  const token = cookies.get('mytoken');
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.quizSlice.modal);
  const navi = useNavigate();

  const quiz = useSelector((state) => state.quizSlice.quiz);

  useEffect(() => {
    dispatch(__getQuiz());
  }, [JSON.stringify(quiz)]);

  const onClickAddQuiz = async () => {
    if (token) {
      try {
        await api.get(`/user/loginck`); // 로그인 유효성검사
        dispatch(modalOnOff(modalState));
      } catch (error) {
        alert('다시 로그인 해주세요!!');
      }
    } else {
      window.confirm('로그인 후 이용해주세요') && navi('/login');
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
      <Nav />
      <Layout color="#8F82C9">
        <style.StListContainer>
          <Flexdiv ai="conter">
            <style.StTodayQuiz>
              오늘의 퀴즈는?
              <ModalOpenTrigger>
                <ModalBackground />
              </ModalOpenTrigger>
              <MainButton onClick={onClickAddQuiz}>퀴즈 추가하기</MainButton>
            </style.StTodayQuiz>
            <ModalContent>
              <AddQuiz />
            </ModalContent>
          </Flexdiv>
          <br />
          <br />
          <style.StListWrapper>
            {quiz?.map((item) => {
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
