import { useNavigate } from 'react-router-dom';
import React from 'react';
import { MainButton } from '../components/style/StyleButton';
import * as style from '../components/style/StyleHome';
import { ModalBackground, ModalContent, ModalOpenTrigger } from '../components/Modal';

function Card({ item }) {
  const navigator = useNavigate();

  const onClickAnswerHandler = () => {
    const answer = prompt('정답을 입력하세요');
    if (answer === item.answer) {
      alert('MZ가 맞으시군요??!!');
      navigator(`/detail/${item.quizId}`);
    } else if (answer !== item.answer) {
      alert('MZ가 아니시군요??');
      navigator(`/detail/${item.quizId}`);
    } else {
      alert('MZ가 아니시군요??');
      // navigator(`/detail/${item.quizId}`);
    }
  };

  return (
    // <ModalOpenTrigger>
    //   <ModalBackground />
    //   <ModalContent></ModalContent>
    <style.StQuizContainer onClick={onClickAnswerHandler}>
      <style.StImageBox>사진을 어케넣지?</style.StImageBox>
      {/* {quiz.resourceUrl} */}
      <h3>{item?.title}</h3>
      <style.StNickname>{item?.nickname}</style.StNickname>
    </style.StQuizContainer>
    // </ModalOpenTrigger>
  );
}

export default Card;
