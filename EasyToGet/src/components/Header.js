import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(163, 191, 250, 0.4);
  }
  50% {
    box-shadow: 0 0 12px 6px rgba(163, 191, 250, 0.8);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(163, 191, 250, 0.4);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const HeaderContainer = styled.header`
  background: ${props => props.theme?.cardBackground || 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px) saturate(180%);
  padding: 1rem 2rem;
  box-shadow: 0 8px 32px ${props => props.theme?.shadow || 'rgba(0, 0, 0, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid ${props => props.theme?.border || 'rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;

  @media (max-width: 1024px) {
    padding: 1rem;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.div`
  font-weight: 900;
  font-size: 2rem;
  color: ${props => props.theme?.primary || '#5a67d8'};
  user-select: none;
  cursor: pointer;
  background: linear-gradient(135deg, ${props => props.theme?.primary || '#5a67d8'}, ${props => props.theme?.secondary || '#764ba2'});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
`;

const NavTabs = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme?.cardBackground || 'rgba(255, 255, 255, 0.8)'};
  border-radius: 25px;
  padding: 0.5rem;
  box-shadow: inset 0 2px 8px ${props => props.theme?.shadow || 'rgba(0, 0, 0, 0.1)'};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme?.border || 'rgba(0, 0, 0, 0.1)'};

  @media (max-width: 1024px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 1rem;
    right: 1rem;
    flex-direction: column;
    gap: 0;
    padding: 1rem 0;
    animation: ${slideIn} 0.3s ease;
    border-radius: 15px;
    margin-top: 0.5rem;
  }
`;

const TabLink = styled(Link)`
  padding: 0.75rem 1.25rem;
  text-decoration: none;
  color: ${props => props.theme?.text || '#2d3748'};
  font-weight: 600;
  border-radius: 20px;
  background: transparent;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &.active {
    background: linear-gradient(135deg, ${props => props.theme?.primary || '#5a67d8'}, ${props => props.theme?.secondary || '#764ba2'});
    color: white;
    font-weight: 700;
    box-shadow: 0 4px 15px ${props => props.theme?.primary || '#5a67d8'}40;
    transform: translateY(-1px);
  }
  
  &:hover:not(.active) {
    background: ${props => props.theme?.primary || '#5a67d8'}20;
    color: ${props => props.theme?.primary || '#5a67d8'};
    transform: translateY(-1px);
  }
  
  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
    margin: 0.25rem 0;
  }
`;

const ThemeToggle = styled.button`
  background: ${props => props.theme?.cardBackground || 'rgba(255, 255, 255, 0.8)'};
  border: 2px solid ${props => props.theme?.border || 'rgba(0, 0, 0, 0.1)'};
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${props => props.theme?.text || '#2d3748'};
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: scale(1.1) rotate(180deg);
    box-shadow: 0 4px 15px ${props => props.theme?.shadow || 'rgba(0, 0, 0, 0.2)'};
    border-color: ${props => props.theme?.primary || '#5a67d8'};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme?.text || '#2d3748'};
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 1024px) {
    display: block;
  }
`;

const categories = [
  { path: '/', label: 'Home' },
  { path: '/category/software-categories', label: 'Software' },
  { path: '/category/operating-systems', label: 'OS' },
  { path: '/category/development', label: 'Dev Tools' },
  { path: '/category/multimedia', label: 'Media' },
  { path: '/category/games', label: 'Games' },
  { path: '/category/antivirus', label: 'Security' }
];

function Header() {
  const location = useLocation();
  const { theme, isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <HeaderContainer theme={theme}>
      <LeftSection>
        <Logo theme={theme}>EasyToGet</Logo>
        <NavTabs theme={theme} isOpen={mobileMenuOpen}>
          {categories.map(({ path, label }) => (
            <TabLink
              key={path}
              to={path}
              theme={theme}
              className={location.pathname === path ? 'active' : ''}
              onClick={() => setMobileMenuOpen(false)}
            >
              {label}
            </TabLink>
          ))}
        </NavTabs>
      </LeftSection>
      
      <RightSection>
        <ThemeToggle theme={theme} onClick={toggleTheme} title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
          {isDark ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
        
        <MobileMenuButton theme={theme} onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
      </RightSection>
    </HeaderContainer>
  );
}

export default Header;
