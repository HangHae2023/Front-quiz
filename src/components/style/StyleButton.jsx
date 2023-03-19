import styled, { css } from 'styled-components';

const BasicButton = ({ children, ...rest }) => {
  return <BasicBtn {...rest}>{children}</BasicBtn>;
};

export const MainButton = (props) => {
  return <BasicButton {...props} bc="#8F82C9" activeBc="	#665C8F" />;
};

const BasicBtn = styled.button`
  cursor: pointer;
  &:active {
    background-color: ${({ activeBc }) => activeBc};
  }
  color: white;
  border: 0;
  border-radius: 10px;
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
      default:
        return css`
          height: 40px;
          width: 100px;
          background-color: ${({ bc }) => bc};
        `;
    }
  }}
`;
