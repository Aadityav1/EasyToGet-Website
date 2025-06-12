import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SplashContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0056bff2, #003bb5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  animation: ${fadeIn} 1s ease forwards;
  z-index: 2000;
`;

const Logo = styled.div`
  margin-bottom: 1rem;
  font-size: 4rem;
  animation: ${fadeIn} 2s ease forwards;
`;

const SplashScreen = () => {
  return (
    <SplashContainer>
      <Logo>EasyToGet</Logo>
      Loading...
    </SplashContainer>
  );
};

export default SplashScreen;
