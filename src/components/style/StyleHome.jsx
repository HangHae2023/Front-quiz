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
  width: 265px;
  height: 360px;
  box-sizing: border-box;
  min-height: 150px;
  border-radius: 25px;
  padding: 12px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  box-shadow: 1px 2px 5px 1px gray;
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
};
