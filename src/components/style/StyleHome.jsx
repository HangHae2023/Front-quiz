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
  height: 380px;
  box-sizing: border-box;
  min-height: 150px;
  border-radius: 25px;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 1px 2px 5px 1px gray;
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
  margin-left: auto;
  margin-right: auto;
`;
const StQuizTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  margin-top: 20px;
  max-width: 400px;
  max-height: 100px;
  border: 1px solid;
`;
const StNickname = styled.div`
  margin-right: 10px;
  margin-top: 80px;
  font-weight: 600;
  display: flex;
  justify-content: flex-end;
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

const StCords = styled.div`
  border-bottom: 3px solid;
  padding-bottom: 20px;
  height: 720px;
  overflow-y: auto;
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

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

const StLabel = styled.label`
  font-weight: 600;
  display: flex;
  flex-direction: column;
`;
export {
  StListContainer,
  StListWrapper,
  StQuizContainer,
  StImageBox,
  StNickname,
  StTodayQuiz,
  StCords,
  StInput,
  StDetailHeader,
  StHeaderTitle,
  StForm,
  StLabel,
  StQuizTitle,
};