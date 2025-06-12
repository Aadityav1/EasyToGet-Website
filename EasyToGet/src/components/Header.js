import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

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

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #5a67d8, #764ba2);
  padding: 1rem 1rem;
  box-shadow: 0 10px 30px rgba(90, 103, 216, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: sticky;
  top: 0;
  z-index: 1000;
  animation: ${pulseGlow} 4s ease infinite;
  color: white;
  backdrop-filter: saturate(180%) blur(10px);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 1.9rem;
  color: white;
  user-select: none;
  cursor: default;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
`;

const NavTabs = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 1px 8px rgba(255,255,255,0.5);
  backdrop-filter: blur(12px);

  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    gap: 0.75rem;
  }
`;

const TabLink = styled(Link)`
  padding: 0.7rem 1.4rem;
  text-decoration: none;
  color: white;
  font-weight: 700;
  border-right: 1px solid rgba(255, 255, 255, 0.4);
  background: transparent;
  transition: background-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease;
  &:last-child {
    border-right: none;
  }
  &.active {
    background: #a3be00;
    color: white;
    font-weight: 800;
    box-shadow: 0 0 16px #a3be00;
  }
  &:hover:not(.active) {
    background: rgba(163, 190, 250, 0.4);
    box-shadow: 0 0 12px rgba(163, 190, 250, 0.8);
  }
  &:focus-visible {
    outline: 3px solid #a3be00;
    outline-offset: 3px;
  }
`;

function Header() {
  const location = useLocation();

  return (
    <HeaderContainer role="banner">
      <Logo tabIndex={0} aria-label="EasyToGet logo">EasyToGet</Logo>
      <NavTabs role="navigation" aria-label="Primary navigation">
        <TabLink to="/" className={location.pathname === '/' ? 'active' : ''}>Home</TabLink>
        <TabLink to="/category/software-categories" className={location.pathname === '/category/software-categories' ? 'active' : ''}>Software Categories</TabLink>
        <TabLink to="/category/operating-systems" className={location.pathname === '/category/operating-systems' ? 'active' : ''}>Operating Systems</TabLink>
        <TabLink to="/category/graphic-design" className={location.pathname === '/category/graphic-design' ? 'active' : ''}>Graphic Design</TabLink>
        <TabLink to="/category/multimedia" className={location.pathname === '/category/multimedia' ? 'active' : ''}>Multimedia</TabLink>
        <TabLink to="/category/development" className={location.pathname === '/category/development' ? 'active' : ''}>Development</TabLink>
        <TabLink to="/category/antivirus" className={location.pathname === '/category/antivirus' ? 'active' : ''}>Antivirus</TabLink>
        <TabLink to="/category/backup-softwares" className={location.pathname === '/category/backup-softwares' ? 'active' : ''}>Backup softwares</TabLink>
      </NavTabs>
    </HeaderContainer>
  );
}

export default Header;
