import styled from "styled-components";

export const StSignupForm = styled.form`
  /* background-color: #eee; */
  border-radius: 30px;
  margin: 30px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  /* padding: 30px; */
  width: 500px;
  height: 700px;
  box-shadow: 1px 4px 5px rgba(0, 0, 0, 0.6);
  border: 2px solid #518edb;
  gap: 40px;
`;
export const HeaderLetter = styled.div`
  font-size: 33px;
  font-weight: bold;
  margin-bottom: 30px;
  margin-top: 30px;
`;
export const StSignUpGroup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
`;

export const StSignUpId = styled.div`
  gap: 5px;
  display: flex;
`;

export const StSignupInput = styled.input`
  height: 50px;
  width: 350px;
  border: 1px solid #518edb;
  border-radius: 12px;
  padding: 0 12px;
  box-sizing: border-box;
`;

export const StSignupSameButton = styled.button`
  cursor: pointer;
  border-radius: 10px;
  font-weight: 700;
  border: 1px solid #518edb;
  color: #518edb;
`;

export const StSignupButton = styled.div`
  cursor: pointer;
  border-radius: 10px;
  font-weight: 700;
`;
