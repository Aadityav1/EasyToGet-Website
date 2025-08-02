import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const logoGlow = keyframes`
  0%, 100% {
    text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(90,103,216,0.6);
  }
  50% {
    text-shadow: 0 0 30px rgba(255,255,255,1), 0 0 60px rgba(90,103,216,0.9);
  }
`;

const progressBar = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const SplashContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #5a67d8 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  animation: ${fadeIn} 0.8s ease forwards;
  z-index: 2000;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
    opacity: 0.3;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
`;

const Logo = styled.div`
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  animation: ${logoGlow} 2s ease infinite, ${pulse} 3s ease infinite;
  background: linear-gradient(45deg, #ffffff, #a3bffa, #ffffff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Tagline = styled.div`
  font-size: 1.2rem;
  font-weight: 300;
  opacity: 0.9;
  text-align: center;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1.5s ease forwards;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
`;

const LoadingText = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  opacity: 0.8;
  animation: ${fadeIn} 2s ease forwards;
`;

const ProgressBarContainer = styled.div`
  width: 300px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 250px;
  }
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #a3bffa, #ffffff, #a3bffa);
  border-radius: 2px;
  animation: ${progressBar} 2s ease forwards;
  box-shadow: 0 0 10px rgba(163, 191, 250, 0.8);
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: ${pulse} 1.5s ease infinite;
  animation-delay: ${props => props.delay}s;
`;

const SplashScreen = () => {
  const [loadingText, setLoadingText] = useState('Initializing...');
  
  useEffect(() => {
    const messages = [
      'Initializing...',
      'Loading resources...',
      'Setting up interface...',
      'Almost ready...'
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setLoadingText(messages[index]);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <SplashContainer>
      <LogoContainer>
        <Logo>EasyToGet</Logo>
        <Tagline>Your Gateway to Software Downloads</Tagline>
      </LogoContainer>
      
      <LoadingContainer>
        <LoadingText>{loadingText}</LoadingText>
        <ProgressBarContainer>
          <ProgressBarFill />
        </ProgressBarContainer>
        <LoadingDots>
          <Dot delay={0} />
          <Dot delay={0.2} />
          <Dot delay={0.4} />
        </LoadingDots>
      </LoadingContainer>
    </SplashContainer>
  );
};

export default SplashScreen;
