import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Header, Nav, QuizAnswer, QuizTitle } from '../components/page';
import { __getQuiz } from '../redux/modules/quizSlice';
import Comment from './Comment';

function Detail() {
  const param = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.quizSlice);
  const postData = data?.quiz.find((item) => item.postId === parseInt(param.id));

  useEffect(() => {
    dispatch(__getQuiz());
  }, []);

  return (
    <div>
      <Nav />
      <Header>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span>{postData?.nickname}</span>
          <span style={{ color: 'gray', fontSize: '16px' }}>{postData?.createdAt}</span>
        </div>
        <div>
          <button>수정</button>
          <button>삭제</button>
        </div>
      </Header>
      <QuizTitle>{postData?.title}</QuizTitle>
      <QuizAnswer>정답 : {postData?.answer}</QuizAnswer>
      <Comment id={postData?.postId} data={data.comment} />
    </div>
  );
}

export default Detail;
