import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  ModalBackground,
  ModalContent,
  ModalOpenTrigger,
  ModalRoot,
} from '../components/Modal';
import { Flexdiv, Header, Nav, QuizAnswer, QuizTitle } from '../components/page';
import { __getQuiz } from '../redux/modules/quizSlice';
import Comment from './Comment';
import Edit from './Edit';

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
      <Flexdiv>
        <ModalRoot>
          <ModalOpenTrigger>
            <ModalBackground />
            <button>수정</button>
          </ModalOpenTrigger>

          <ModalContent>
            <Edit item={postData} />
          </ModalContent>
        </ModalRoot>
        <button>삭제</button>
      </Flexdiv>

      <Header>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span>{postData?.nickname}</span>
          <span style={{ color: 'gray', fontSize: '16px' }}>{postData?.createdAt}</span>
        </div>
      </Header>
      <QuizTitle>{postData?.title}</QuizTitle>
      <QuizAnswer>정답 : {postData?.answer}</QuizAnswer>
      <Comment id={postData?.postId} data={data.comment} />
    </div>
  );
}

export default Detail;
