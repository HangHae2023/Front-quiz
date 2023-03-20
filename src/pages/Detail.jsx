import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Layout from '../components/page';
import { ModalBackground, ModalContent, ModalOpenTrigger } from '../components/Modal';
import { Flexdiv, Nav, QuizAnswer, QuizTitle } from '../components/page';
import { MainButton } from '../components/style/StyleButton';
import { StDetailHeader, StHeaderTitle } from '../components/style/StyleHome';
import {
  __deleteQuiz,
  __getComment,
  __getDetailQuiz,
  __getQuiz,
} from '../redux/modules/quizSlice';
import Comment from './Comment';
import Edit from './Edit';

function Detail() {
  const navi = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.quizSlice.quiz.allQuizs);
  const postData = data?.find((item) => item.quizId === parseInt(param.id));
  const createAt = postData?.createdAt;
  const year = createAt?.split('-')[0];
  const date = createAt?.split('-')[2].split('T')[0];
  const month = createAt?.split('-')[1];
  // console.log(postData);
  useEffect(() => {
    dispatch(__getQuiz());
    dispatch(__getComment(postData?.quizId));
  }, [JSON.stringify(postData)]);

  const deleteQuizHandler = (id) => {
    // try {
    dispatch(__deleteQuiz(id));
    navi('/');
    // } catch (error) {
    //   alert('권한이 없습니다');
    // }
  };
  return (
    <div>
      <Nav />
      <Layout color="#8F82C9">
        <Flexdiv style={{ justifyContent: 'space-between', borderBottom: '3px solid' }}>
          <StHeaderTitle>MZ력 테스트</StHeaderTitle>
          <StDetailHeader>
            <div>작성자 : {postData?.nickname}</div>
            <div style={{ color: 'gray', fontSize: '16px' }}>
              작성일 : {year}년 {month}월 {date}일
            </div>
          </StDetailHeader>
        </Flexdiv>

        <Flexdiv style={{ justifyContent: 'flex-end', width: '95%', gap: '7px' }}>
          <ModalOpenTrigger>
            <ModalBackground />
            <MainButton>수정</MainButton>
          </ModalOpenTrigger>

          <ModalContent>
            <Edit item={postData} />
          </ModalContent>

          <MainButton type="pink" onClick={() => deleteQuizHandler(postData?.quizId)}>
            삭제
          </MainButton>
        </Flexdiv>
        <QuizTitle>{postData?.title}</QuizTitle>
        <QuizAnswer>정답 : {postData?.answer}</QuizAnswer>
        <Comment postId={postData?.quizId} />
      </Layout>
    </div>
  );
}

export default Detail;
