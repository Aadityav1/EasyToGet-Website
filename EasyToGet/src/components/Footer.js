import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 91, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 12px 6px rgba(0, 91, 255, 0.8);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 91, 255, 0.4);
  }
`;

const backgroundAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #0047b3, #002a80, #0047b3);
  background-size: 600% 600%;
  animation: ${backgroundAnimation} 15s ease infinite;
  padding: 2rem 3rem;
  text-align: center;
  font-size: 0.9rem;
  color: white;
  margin-top: auto;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
  border-top: 3px solid #001f4d;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterText = styled.div`
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const FooterLinks = styled.nav`
  display: flex;
  gap: 1.5rem;
  a {
    color: #a8caff;
    text-decoration: none;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    transition: color 0.3s ease, text-shadow 0.3s ease;
    &:hover {
      color: #61a8ff;
      text-shadow: 0 0 12px #61a8ff;
      animation: ${pulseGlow} 2s infinite;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer role="contentinfo" aria-label="Footer">
      <FooterText>&copy; {new Date().getFullYear()} EasyToGet. All rights reserved.</FooterText>
      <FooterText>Disclaimer: EasyToGet does not host or store any content. Users are responsible for the content they access.</FooterText>
      <FooterLinks aria-label="Footer navigation">
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">🔒 Privacy Policy</a>
        <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">📄 Terms of Service</a>
        <a href="https://x.com/AADITYA_1149" target="_blank" rel="noopener noreferrer">🐦 Twitter (AADITYA_1149)</a>
      </FooterLinks>
    </FooterContainer>
  );
};

export default Footer;
