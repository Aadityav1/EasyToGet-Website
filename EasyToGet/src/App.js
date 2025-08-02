import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SplashScreen from './components/SplashScreen';
import CategoryPage from './pages/CategoryPage';
import ErrorBoundary from './components/ErrorBoundary';
import NotificationSystem from './components/Notification';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: ${props => props.theme?.background || 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)'};
  color: ${props => props.theme?.text || '#2d3748'};
  transition: all 0.3s ease;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const BackgroundPattern = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  background-image: radial-gradient(circle at 1px 1px, ${props => props.theme?.text || '#2d3748'} 1px, transparent 0);
  background-size: 20px 20px;
  pointer-events: none;
  z-index: 0;
`;

function AppContent() {
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    // Simulate loading with more realistic timing
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <AppContainer theme={theme}>
        <BackgroundPattern theme={theme} />
        <ErrorBoundary>
          <Header />
          <MainContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
            </Routes>
          </MainContent>
          <Footer />
          <NotificationSystem />
        </ErrorBoundary>
      </AppContainer>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
