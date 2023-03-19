import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ModalBackground, ModalContent, ModalOpenTrigger } from '../components/Modal';
import { Flexdiv, Header, Nav, QuizAnswer, QuizTitle } from '../components/page';
import { __deleteQuiz, __getDetailQuiz, __getQuiz } from '../redux/modules/quizSlice';
import Comment from './Comment';
import Edit from './Edit';

function Detail() {
  const navi = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.quizSlice);
  const postData = data?.quiz.find((item) => item.quizId === parseInt(param.id)); // 실제 서버에서 사용
  // const postData = data?.quiz.find((item) => item.id === parseInt(param.id)); // 가상 서버에서 사용

  useEffect(() => {
    dispatch(__getDetailQuiz());
  }, [JSON.stringify(data.quiz, data.comment)]);

  const deleteQuizHandler = (id) => {
    dispatch(__deleteQuiz(id));
    navi('/');
  };
  return (
    <div>
      <Nav />
      <Flexdiv>
        <ModalOpenTrigger>
          <ModalBackground />
          <button>수정</button>
        </ModalOpenTrigger>

        <ModalContent>
          <Edit item={postData} />
        </ModalContent>

        <button onClick={() => deleteQuizHandler(postData?.id)}>삭제</button>
      </Flexdiv>

      <Header>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span>{postData?.nickname}</span>
          <span style={{ color: 'gray', fontSize: '16px' }}>{postData?.createdAt}</span>
        </div>
      </Header>
      <QuizTitle>{postData?.title}</QuizTitle>
      <QuizAnswer>정답 : {postData?.answer}</QuizAnswer>
      <Comment id={postData?.quizId} data={data.comment} />
    </div>
  );
}

export default Detail;
