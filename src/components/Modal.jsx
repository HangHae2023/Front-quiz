import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { modalOnOff } from '../redux/modules/quizSlice';

export const ModalOpenTrigger = ({ children }) => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.quizSlice.modal);
  return (
    <div style={{ display: 'block' }} onClick={() => dispatch(modalOnOff(modalState))}>
      {children}
    </div>
  );
};

export const ModalBackground = () => {
  const modalState = useSelector((state) => state.quizSlice.modal);
  return modalState && <Background />;
};

const Background = styled.div`
  background-color: #8591ab;
  opacity: 0.6;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 4;
`;

export const ModalContent = ({ children }) => {
  const modalState = useSelector((state) => state.quizSlice.modal);
  return modalState && <Body>{children}</Body>;
};

const Body = styled.div`
  width: 450px;
  position: absolute;
  background-color: #f8f8fc;
  top: -10%;
  left: 50%;
  right: 50%;
  transform: translate(-50%, 50%);
  border-radius: 40px;
  padding: 50px;
  box-sizing: border-box;
  z-index: 5;
`;
