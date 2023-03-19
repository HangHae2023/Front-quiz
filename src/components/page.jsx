import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MainButton } from './style/Button';
import { StSignUpId } from './style/Register';

export const Nav = ({ login, signup }) => {
  const navi = useNavigate();
  const clickLogo = () => {
    navi('/');
  };
  const clickLogin = () => {
    navi('/login');
  };
  const clickSignup = () => {
    navi('/register');
  };
  return (
    <HeaderNav>
      <NavLogo onClick={clickLogo}>
        <NavImg src="img/quizLogo.png" />
      </NavLogo>
      <StSignUpId>
        {login && (
          <MainButton type="blue" onClick={clickLogin}>
            로그인
          </MainButton>
        )}
        {signup && (
          <MainButton type="pupple" onClick={clickSignup}>
            회원가입
          </MainButton>
        )}
      </StSignUpId>
    </HeaderNav>
  );
};

const NavLogo = styled.div`
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const NavImg = styled.img`
  width: 60px;
  height: 60px;
`;

const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Header = ({ children }) => {
  return <QuizHeader>{children}</QuizHeader>;
};

const QuizHeader = styled.div`
  font-size: 20px;
  display: flex;
  padding: 10px 30px;
  justify-content: space-between;
  align-items: center;
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
`;

export const QuizAnswer = ({ children }) => {
  return <Answer>{children}</Answer>;
};

const Answer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 25px;
`;

export const Flexdiv = ({ children, ...rest }) => {
  return <Div style={{ ...rest }}>{children}</Div>;
};

const Div = styled.div`
  display: flex;
`;
