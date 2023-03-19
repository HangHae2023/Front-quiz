import styled, { css } from 'styled-components';

const BasicButton = ({ children, ...rest }) => {
  return <BasicBtn {...rest}>{children}</BasicBtn>;
};

export const MainButton = (props) => {
  return <BasicButton {...props} activeBc="	#665C8F" />;
};

const BasicBtn = styled.button`
  cursor: pointer;

  color: white;
  border: 0;
  border-radius: 20px;
  font-weight: bold;
  
  ${({ type }) => {
    switch (type) {
      case 'login':
        return css`
          height: 50px;
          width: 350px;
          background-color: white;
          color: #518edb;
          border: 2.5px solid #518edb;
          &:active {
            color: white;
            background-color: #518edb;
          }
        `;
      case 'pink':
        return css`
          padding: 10px 20px;
          background-color: #cd75b7;
          &:hover {
            background-color: #da99c9;
          }
          &:active {
            background-color: #b23d75;
          }
        `;
      case 'blue':
        return css`
          padding: 10px 20px;
          background-color: #518edb;
          &:hover {
            background-color: #90b7e9;
          }
          &:active {
            background-color: #1868cc;
          }
        `;
      default:
        return css`
          padding: 10px 20px;
          background-color: #8f82c9;
          &:hover {
            background-color: #afa5d8;
          }
          &:active {
            background-color: #665c8f;
          }
        `;
    }
  }}
`;
