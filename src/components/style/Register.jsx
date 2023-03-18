import styled from "styled-components";

export const StSignupForm = styled.form`
  background-color: #eee;
  border-radius: 12px;
  margin: 0 auto;
  margin-top: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 20px;
`;

export const StSignUpGroup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

export const StSignUpId = styled.div`
  gap: 20px;
`;

export const StSignupInput = styled.input`
  height: 40px;
  width: 240px;
  border: 1px solid black;
  border-radius: 12px;
  padding: 0 12px;
`;

export const StSignupButton = styled.button`
  border: 1px solid black;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  width: 140px;

  font-weight: 700;
`;
