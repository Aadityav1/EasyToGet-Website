import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaTwitter, FaHeart, FaShieldAlt, FaFileContract } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(90, 103, 216, 0.4);
  }
  50% {
    box-shadow: 0 0 12px 6px rgba(90, 103, 216, 0.8);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(90, 103, 216, 0.4);
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
  background: ${props => props.theme?.cardBackground || 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px) saturate(180%);
  padding: 3rem 2rem 2rem;
  margin-top: 4rem;
  border-top: 1px solid ${props => props.theme?.border || 'rgba(0, 0, 0, 0.1)'};
  color: ${props => props.theme?.text || '#2d3748'};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.theme?.primary || '#5a67d8'};
  margin-bottom: 0.5rem;
`;

const FooterText = styled.p`
  color: ${props => props.theme?.textSecondary || '#4a5568'};
  line-height: 1.6;
  font-size: 0.95rem;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const FooterLink = styled.a`
  color: ${props => props.theme?.textSecondary || '#4a5568'};
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  padding: 0.25rem 0;
  
  &:hover {
    color: ${props => props.theme?.primary || '#5a67d8'};
    transform: translateX(4px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  background: ${props => props.theme?.border || 'rgba(0, 0, 0, 0.1)'};
  color: ${props => props.theme?.text || '#2d3748'};
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    background: ${props => props.theme?.primary || '#5a67d8'};
    color: white;
    transform: translateY(-2px) scale(1.1);
    box-shadow: 0 8px 25px ${props => props.theme?.primary || '#5a67d8'}40;
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme?.border || 'rgba(0, 0, 0, 0.1)'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.div`
  color: ${props => props.theme?.textSecondary || '#4a5568'};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MadeWithLove = styled.div`
  color: ${props => props.theme?.textSecondary || '#4a5568'};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .heart {
    color: #e53e3e;
    animation: ${pulseGlow} 2s ease infinite;
  }
`;

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <FooterContainer theme={theme}>
      <FooterContent>
        <FooterSection>
          <FooterTitle theme={theme}>EasyToGet</FooterTitle>
          <FooterText theme={theme}>
            Your trusted platform for discovering and downloading software safely. 
            We provide direct links to official sources only.
          </FooterText>
          <SocialLinks>
            <SocialLink 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              theme={theme}
              title="GitHub"
            >
              <FaGithub />
            </SocialLink>
            <SocialLink 
              href="https://x.com/AADITYA_1149" 
              target="_blank" 
              rel="noopener noreferrer"
              theme={theme}
              title="Twitter"
            >
              <FaTwitter />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle theme={theme}>Quick Links</FooterTitle>
          <FooterLinks>
            <FooterLink href="/" theme={theme}>Home</FooterLink>
            <FooterLink href="/#/category/operating-systems" theme={theme}>Operating Systems</FooterLink>
            <FooterLink href="/#/category/development" theme={theme}>Development Tools</FooterLink>
            <FooterLink href="/#/category/multimedia" theme={theme}>Multimedia</FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle theme={theme}>Legal</FooterTitle>
          <FooterLinks>
            <FooterLink href="#" theme={theme}>
              <FaShieldAlt /> Privacy Policy
            </FooterLink>
            <FooterLink href="#" theme={theme}>
              <FaFileContract /> Terms of Service
            </FooterLink>
          </FooterLinks>
          <FooterText theme={theme}>
            <strong>Disclaimer:</strong> EasyToGet does not host any files. 
            We only provide links to official download sources.
          </FooterText>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom theme={theme}>
        <Copyright theme={theme}>
          &copy; {new Date().getFullYear()} EasyToGet. All rights reserved.
        </Copyright>
        <MadeWithLove theme={theme}>
          Made with <FaHeart className="heart" /> for the community
        </MadeWithLove>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
