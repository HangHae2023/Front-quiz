import styled from 'styled-components';

const StListContainer = styled.div`
  padding: 0 24px;
  width: 95%;
`;

const StListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  margin: 5px;
`;

const StQuizContainer = styled.div`
  width: 360px;
  height: 390px;
  box-sizing: border-box;
  min-height: 150px;
  border-radius: 25px;
  padding: 15px 15px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 1px 2px 5px 1px gray;
  position: relative;
`;

const StImageBox = styled.div`
  width: 330px;
  height: 200px;
  background-color: aliceblue;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 0 auto 20px auto;
  z-index: 3;
`;

const StQuizTitle = styled.div`
  font-size: 20px;
  max-width: 400px;
  max-height: 200px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 몇줄로 자를건지 결정 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StQuizContent = styled.div`
  width: 200px;
  font-weight: 600;
  position: absolute;
  bottom: 15px;
  overflow: hidden;
  display: flex;
`;

const StTodayQuiz = styled.div`
  width: 100%;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid;
  font-size: 1.7em;
  font-weight: bold;
`;

const StInput = styled.input`
  width: 300px;
  height: 40px;
  border: 1px solid;
  border-radius: 7px;
  padding: 0 12px;
  box-sizing: border-box;
`;

const StDetailHeader = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StHeaderTitle = styled.span`
  font-size: 30px;
  font-weight: bold;
`;

const StLabel = styled.label`
  font-weight: 600;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const StImgLabel = styled.label`
  color: white;
  border: 0;
  border-radius: 20px;
  font-weight: bold;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 18px;
  margin-bottom: 20px;
  font-size: 13px;
  width: 53px;
  height: 13px;
  background-color: #cd75b7;
  &:hover {
    background-color: #da99c9;
  }
  &:active {
    background-color: #b23d75;
  }
`;

const StContent = styled.div`
  padding-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
  width: 80%;
  border-bottom: 1px solid;
`;

export {
  StListContainer,
  StListWrapper,
  StQuizContainer,
  StImageBox,
  StQuizContent,
  StTodayQuiz,
  StInput,
  StDetailHeader,
  StHeaderTitle,
  StLabel,
  StQuizTitle,
  StContent,
  StImgLabel,
};
