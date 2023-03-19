import styled from "styled-components";

const StAddButton = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  background-color: teal;
  width: 140px;
  color: #fff;
  font-weight: 700;
`;

const StListContainer = styled.div`
  padding: 0 24px;
`;

const StListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
`;

const StQuizContainer = styled.div`
  width: 270px;
  border: 4px solid teal;
  min-height: 150px;
  border-radius: 12px;
  padding: 12px 24px 12px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StImageBox = styled.div`
  width: 250px;
  height: 150px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StAnswerButton = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  background-color: teal;
  width: 140px;
  color: #fff;
  font-weight: 700;
`;

const StNickname = styled.span`
  margin-left: 200px;
  margin-top: 10px;
  font-weight: 600;
`;

export {
  StAddButton,
  StListContainer,
  StListWrapper,
  StQuizContainer,
  StImageBox,
  StAnswerButton,
  StNickname,
};
