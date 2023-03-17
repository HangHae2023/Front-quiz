import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';

const Context = createContext();

export const ModalRoot = ({ children }) => {
  const [open, setOpen] = useState(false);
  return <Context.Provider value={{ open, setOpen }}>{children}</Context.Provider>;
};

export const ModalOpenTrigger = ({ children }) => {
  const { setOpen } = useContext(Context);
  return (
    <div style={{ display: 'block' }} onClick={() => setOpen((open) => !open)}>
      {children}
    </div>
  );
};

export const ModalBackground = () => {
  const { open } = useContext(Context);

  return open && <Background />;
};

const Background = styled.div`
  background-color: #ded5c2;
  opacity: 0.8;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const ModalContent = ({ children }) => {
  const { open } = useContext(Context);

  return open && <Body>{children}</Body>;
};

const Body = styled.div`
  width: 600px;
  height: 700px;
  position: absolute;
  background-color: white;
  top: -20%;
  left: 50%;
  right: 50%;
  transform: translate(-50%, 50%);
  border-radius: 40px;
  padding: 50px;
  box-sizing: border-box;
`;
