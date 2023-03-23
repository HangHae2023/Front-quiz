import { useNavigate } from 'react-router-dom';
import React from 'react';
import * as style from '../components/style/StyleHome';
import api from '../axios/api';
import { Day } from '../shared/Day';
// import dayjs from 'dayjs';

function Card({ item }) {
  const navigator = useNavigate();

  const onClickAnswerHandler = async () => {
    try {
      await api.get(`/api/quiz/authChk/${item.quizId}`);
      navigator(`/detail/${item.quizId}`);
    } catch (error) {
      const answer = prompt(item.title);
      if (answer.replace(/ /g, '') == item.answer.replace(/ /g, '')) {
        alert('MZ가 맞으시군요??!!');
        navigator(`/detail/${item.quizId}`);
      } else if (
        answer.replace(/ /g, '') !== '' &&
        answer !== null &&
        answer.replace(/ /g, '') !== item.answer.replace(/ /g, '')
      ) {
        alert('MZ가 아니시군요??ㅋ');
        navigator(`/detail/${item.quizId}`);
      } else {
        alert('문제 안풀고 어디가세요?');
      }
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
      <style.StQuizContent style={{ right: '25px', justifyContent: 'flex-end' }}>
        {Day(item?.createdAt)}
      </style.StQuizContent>

      <style.StQuizContent style={{ left: '25px' }}>{item?.nickname}</style.StQuizContent>
    </style.StQuizContainer>
  );
}

export default Card;
