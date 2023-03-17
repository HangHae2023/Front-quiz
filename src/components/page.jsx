import React, { Children } from 'react';
import styled from 'styled-components';

export const Nav = () => {
  return <HeaderNav>퀴즈챌린지</HeaderNav>;
};

const HeaderNav = styled.div`
  font-size: 30px;
  display: flex;
  justify-content: center;
`;

export const Header = ({ children }) => {
  return <QuizHeader>{children}</QuizHeader>;
};

const QuizHeader = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: space-around;
`;

export const QuizTitle = ({ children }) => {
  return <Title>{children}</Title>;
};

const Title = styled.div`
  font-size: 60px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  height: 300px;
  padding-top: 50px;

  /* border: 1px solid black; */
`;

export const QuizAnswer = ({ children }) => {
  return <Answer>{children}</Answer>;
};

const Answer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 25px;
`;
