import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { modalOnOff, __addQuiz } from '../redux/modules/quizSlice';

function Quiz() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.quizSlice.modal);

  const [newQuiz, setNewQuiz] = useState({
    title: '',
    answer: '',
    explain: '',
    resourceUrl: null,
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewQuiz({ ...newQuiz, [name]: value });
  };

  // formdata는 특수한 객체 형태로서 배열처럼 사용한다.
  const fileInputHandler = (e) => {
    setNewQuiz({ ...newQuiz, resourceUrl: e.target.files[0] });
  };

  const submitInputHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newQuiz.title);
    formData.append('answer', newQuiz.answer);
    formData.append('explain', newQuiz.explain);
    formData.append('resourceUrl', newQuiz.resourceUrl);
    setNewQuiz({ ...newQuiz, resourceUrl: formData });
    dispatch(__addQuiz(newQuiz));
    dispatch(modalOnOff(modalState));
  };

  return (
    <form onSubmit={submitInputHandler}>
      <div>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={fileInputHandler}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '30px',
          backgroundColor: 'green',
          paddingLeft: '1px',
        }}
      >
        <StAddQuizInput
          type="text"
          name="title"
          placeholder="질문을 입력하세요"
          value={newQuiz.title}
          onChange={onChangeHandler}
        />
        <br />
        <StAddQuizInput
          type="text"
          name="answer"
          placeholder="정답을 입력하세요"
          value={newQuiz.answer}
          onChange={onChangeHandler}
        />
        <br />
        <StAddQuizInput
          type="text"
          name="explain"
          placeholder="해설을 입력하세요"
          value={newQuiz.explain}
          onChange={onChangeHandler}
        />
      </div>
      <button type="submit">퀴즈 추가!</button>
    </form>
  );
}

export default Quiz;

const StAddQuizInput = styled.input`
  height: 40px;
  width: 240px;
  border: 1px solid black;
  border-radius: 12px;
  padding: 0 12px;
`;
