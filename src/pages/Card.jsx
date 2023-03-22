import { useNavigate } from 'react-router-dom';
import React from 'react';
import * as style from '../components/style/StyleHome';
import { cookies } from '../shared/cookie';
import api from '../axios/api';
import moment from 'moment/moment';

function Card({ item }) {
  const navigator = useNavigate();
  const createAt = item?.createdAt;

  const onClickAnswerHandler = async () => {
    try {
      await api.get(`/api/quiz/authChk/${item.quizId}`);
      navigator(`/detail/${item.quizId}`);
    } catch (error) {
      const answer = prompt(item.title);
      if (answer === item.answer) {
        alert('MZ가 맞으시군요??!!');
        navigator(`/detail/${item.quizId}`);
      } else if (answer !== '' && answer !== null && answer !== item.answer) {
        alert('MZ가 아니시군요??');
        navigator(`/detail/${item.quizId}`);
      } else {
        alert('문제 안풀고 어디가세요?');
      }
    }
  };
  const nowTime = () => {
    let dateNumber = parseInt(moment(createAt).fromNow());
    // dateNumber === NaN && dateNumber = 1
    if (moment(createAt).fromNow().indexOf('minutes') > 1) {
      return `${dateNumber}분 전`;
    } else if (moment(createAt).fromNow().indexOf('hour') > 1) {
      return `${dateNumber}시간 전`;
    } else if (moment(createAt).fromNow().indexOf('day') > 1) {
      return `${dateNumber}일 전`;
    } else if (moment(createAt).fromNow().indexOf('month') > 1) {
      return `${dateNumber}개월 전`;
    } else if (moment(createAt).fromNow().indexOf('year') > 1) {
      return `${dateNumber}년 전`;
    }
    console.log(dateNumber);
  };
  return (
    <style.StQuizContainer onClick={onClickAnswerHandler}>
      <style.StImageBox
        style={{
          backgroundImage: `url(${item.resourceUrl})`,
        }}
      />
      <style.StQuizTitle>
        {item?.title}
        {nowTime()}
      </style.StQuizTitle>
      <div></div>
      <style.StNickname>{item?.nickname}</style.StNickname>
    </style.StQuizContainer>
  );
}

export default Card;
