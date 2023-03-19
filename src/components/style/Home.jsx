import styled from 'styled-components';

const StListContainer = styled.div`
  padding: 0 24px;
`;

const StListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 30px;
`;

const StQuizContainer = styled.div`
  width: 265px;
  height: 360px;
  box-sizing: border-box;
  border: 1px solid #8f82c9;
  min-height: 150px;
  border-radius: 25px;
  padding: 12px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const StImageBox = styled.div`
  width: 230px;
  height: 200px;
  background-color: aliceblue;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StNickname = styled.span`
  margin-left: 150px;
  margin-top: 40px;
  font-weight: 600;
`;

export { StListContainer, StListWrapper, StQuizContainer, StImageBox, StNickname };
