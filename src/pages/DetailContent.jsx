import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ModalBackground, ModalContent, ModalOpenTrigger } from '../components/Modal';
import { Flexdiv, Nav, QuizAnswer, QuizTitle } from '../components/page';
import { MainButton } from '../components/style/StyleButton';
import { StDetailHeader, StHeaderTitle } from '../components/style/StyleHome';
import {
  modalOnOff,
  mytoken,
  __deleteQuiz,
  __getComment,
  __getDetailQuiz,
  __getQuiz,
} from '../redux/modules/quizSlice';
import Edit from './Edit';
import api from '../axios/api';
import { cookies } from '../shared/cookie';

function DetailContent() {
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
  const isToken = useSelector((state) => state.quizSlice.istoken);

  // console.log(data);

  const [authChk, setAuthChk] = useState(false);

  const authChkUpdate = async (id) => {
    if (isToken) {
      try {
        await api.get(`/api/quiz/authChk/${id}`);
        dispatch(mytoken(true));
        setAuthChk(true);
      } catch (error) {
        setAuthChk(false);
      }
    }
  };
  useEffect(() => {
    dispatch(__getDetailQuiz(param.id));
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (token) {
      authChkUpdate(param.id);
    } else {
      setAuthChk(false);
    }
  }, [isToken]);

  console.log('DetailContent >>>', isToken);

  const clickEditHandler = async (id) => {
    dispatch(modalOnOff(modalState));
  };

  const clickDeleteHandler = async (id) => {
    window.confirm('정말 삭제 하시겠습니까?') && dispatch(__deleteQuiz(id)) && navi('/');
  };
  return (
    <>
      <Flexdiv
        ai="center"
        jc="space-between"
        style={{ borderBottom: '3px solid', margin: '10px 0', padding: '0 30px' }}
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

        {authChk && (
          <>
            <MainButton onClick={() => clickEditHandler(data?.quizId)}>수정</MainButton>
            <ModalContent>
              <Edit item={data} />
            </ModalContent>

            <MainButton type="pink" onClick={() => clickDeleteHandler(data?.quizId)}>
              삭제
            </MainButton>
          </>
        )}
      </Flexdiv>
      <QuizTitle>{data?.title}</QuizTitle>
      <QuizAnswer>정답 : {data?.answer}</QuizAnswer>
      <QuizAnswer>해설 : {data?.explain}</QuizAnswer>
    </>
  );
}

export default DetailContent;
