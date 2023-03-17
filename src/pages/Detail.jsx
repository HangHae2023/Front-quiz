import React from 'react';
import { Header, Nav, QuizAnswer, QuizTitle } from '../components/page';

function Detail() {
  return (
    <div>
      <Nav />
      <Header>
        <span>퀴즈를 맞춰봐</span>
        <span>퀴즈 작성자 : 홍길동</span>
      </Header>
      <QuizTitle>오히려 ??</QuizTitle>
      <QuizAnswer>정답 : 오히려 좋아</QuizAnswer>
    </div>
  );
}

export default Detail;
