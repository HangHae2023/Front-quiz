import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/page';
import { ModalBackground, ModalContent, ModalOpenTrigger } from '../components/Modal';
import { Flexdiv, Nav, QuizAnswer, QuizTitle } from '../components/page';
import { MainButton } from '../components/style/StyleButton';
import { StDetailHeader, StHeaderTitle } from '../components/style/StyleHome';
import {
  modalOnOff,
  __deleteQuiz,
  __getComment,
  __getDetailQuiz,
  __getQuiz,
} from '../redux/modules/quizSlice';
import Comment from './Comment';
import Edit from './Edit';
import api from '../axios/api';
import { cookies } from '../shared/cookie';

function Detail() {
  const navi = useNavigate();
  const token = cookies.get('mytoken');
  const param = useParams();
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.quizSlice.modal);
  const data = useSelector((state) => state.quizSlice.dailQuiz.quiz);
  const createAt = data?.createdAt;
  const year = createAt?.split('-')[0];
  const date = createAt?.split('-')[2].split('T')[0];
  const month = createAt?.split('-')[1];
  useEffect(() => {
    // dispatch(__getQuiz());
    dispatch(__getDetailQuiz(param.id));
    dispatch(__getComment(data?.quizId));
  }, [JSON.stringify(data)]);
  //
  console.log(data?.quizId);
  const clickEditHandler = async (id) => {
    if (token) {
      try {
        // await api.get(`/api/quiz/authChk/${id}`);
        dispatch(modalOnOff(modalState));
      } catch (error) {
        // console.log(error);
        // alert('다시 로그인 해주세요!!');
      }
    }
  };

  const clickDeleteHandler = async (id) => {
    if (token) {
      try {
        await api.get(`/api/quiz/authChk/${id}`);
        window.confirm('정말 삭제 하시겠습니까?') && dispatch(__deleteQuiz(id));
        navi('/');
      } catch (error) {
        alert('삭제할 권한이 없습니다.');
      }
    }
  };
  return (
    <Nav>
      <Layout color="#AE7BC0">
        <Flexdiv ai="center" jc="space-between" style={{ borderBottom: '3px solid' }}>
          <StHeaderTitle>MZ력 테스트</StHeaderTitle>
          <StDetailHeader>
            <div>작성자 : {data?.nickname}</div>
            <div style={{ color: 'gray', fontSize: '16px' }}>
              작성일 : {year}년 {month}월 {date}일
            </div>
          </StDetailHeader>
        </Flexdiv>

        <Flexdiv ai="center" jc="flex-end" style={{ width: '95%', gap: '7px' }}>
          <ModalOpenTrigger>
            <ModalBackground />
          </ModalOpenTrigger>

          <MainButton onClick={() => clickEditHandler(data?.quizId)}>수정</MainButton>
          <ModalContent>
            <Edit item={data} />
          </ModalContent>

          <MainButton type="pink" onClick={() => clickDeleteHandler(data?.quizId)}>
            삭제
          </MainButton>
        </Flexdiv>
        <QuizTitle>{data?.title}</QuizTitle>
        <QuizAnswer>정답 : {data?.answer}</QuizAnswer>
        <Comment postId={data?.quizId} />
      </Layout>
    </Nav>
  );
}

export default Detail;
