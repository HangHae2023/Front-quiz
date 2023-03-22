import { useNavigate } from 'react-router-dom';
import React from 'react';
import * as style from '../components/style/StyleHome';

function Card({ item }) {
  const navigator = useNavigate();
  const onClickAnswerHandler = () => {
    const answer = prompt(item.title);
    if (answer === item.answer) {
      alert('MZ가 맞으시군요??!!');
      navigator(`/detail/${item.quizId}`);
    } else if (answer !== '' && answer !== null && answer !== item.answer) {
      alert('MZ가 아니시군요??');
      navigator(`/detail/${item.quizId}`);
    } else {
      alert('문제 안풀고 어디가세요?');
      // navigator(`/detail/${item.quizId}`);
    }
  };

  return (
    <style.StQuizContainer onClick={onClickAnswerHandler}>
      <style.StImageBox
        style={{
          backgroundImage: `url(${item.resourceUrl})`,
        }}
      />
      <style.StQuizTitle>{item?.title}</style.StQuizTitle>
      <style.StNickname>{item?.nickname}</style.StNickname>
    </style.StQuizContainer>
  );
}

export default Card;
