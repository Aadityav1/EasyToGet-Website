import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${props => props.theme?.border || 'rgba(0, 0, 0, 0.1)'};
  border-top: 3px solid ${props => props.theme?.primary || '#5a67d8'};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  color: ${props => props.theme?.textSecondary || '#4a5568'};
  font-weight: 500;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const LoadingSpinner = ({ text = 'Loading...' }) => {
  const { theme } = useTheme();
  
  return (
    <LoadingContainer>
      <Spinner theme={theme} />
      <LoadingText theme={theme}>{text}</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingSpinner;