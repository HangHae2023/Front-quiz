import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MainButton } from './style/StyleButton';
import { StSignUpId } from './style/StyleRegister';

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
        <NavImg src="/assets/quizLogo.png" />
      </NavLogo>
      <StSignUpId>
        {login && (
          <MainButton type="pink" onClick={clickLogin}>
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
  width: 65px;
  height: 53px;
`;

const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* border: 1px solid black; */
  /* border-width: 0 0 2px 0; */
  box-sizing: border-box;
  box-shadow: 0 2px 6px 3px lightgray;
  margin-bottom: 10px;
`;

export const Header = ({ children }) => {
  return <QuizHeader>{children}</QuizHeader>;
};

const QuizHeader = styled.div`
  font-size: 20px;
  display: flex;
  padding: 10px 20px;
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
  return <Div {...rest}>{children}</Div>;
};

const Div = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Layout = ({ children, ...rest }) => {
  return <StLayout {...rest}>{children}</StLayout>;
};

export default Layout;

const StLayout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
  color: ${({ color }) => color};
`;
