import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
import Edit from './Edit';
import api from '../axios/api';
import { cookies } from '../shared/cookie';

function DetailContent() {
  console.log('detailContent rendering');

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
  // console.log(data);
  useEffect(() => {
    dispatch(__getDetailQuiz(param.id));
  }, [JSON.stringify(data)]);

  const clickEditHandler = async (id) => {
    if (token) {
      try {
        // await api.get(`/api/quiz/authChk/${id}`);
        dispatch(modalOnOff(modalState));
      } catch (error) {
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
    <>
      <Flexdiv
        ai="center"
        jc="space-between"
        style={{ borderBottom: '3px solid', margin: '10px 0' }}
      >
        <StHeaderTitle>MZ력 테스트</StHeaderTitle>
        <StDetailHeader>
          <div>작성자 : {data?.nickname}</div>
          <div style={{ color: 'gray', fontSize: '16px' }}>
            작성일 : {year}년 {month}월 {date}일
          </div>
        </StDetailHeader>
      </Flexdiv>

      <Flexdiv
        ai="center"
        jc="flex-end"
        style={{ width: '95%', gap: '7px', marginTop: '10px' }}
      >
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
      <QuizAnswer>해설 : {data?.explain}</QuizAnswer>
    </>
  );
}

export default DetailContent;