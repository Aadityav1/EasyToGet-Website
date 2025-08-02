import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const themes = {
  light: {
    primary: '#5a67d8',
    secondary: '#764ba2',
    background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
    cardBackground: 'rgba(255, 255, 255, 0.9)',
    text: '#2d3748',
    textSecondary: '#4a5568',
    border: 'rgba(0, 0, 0, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.1)',
    accent: '#667eea',
    success: '#38a169',
    error: '#e53e3e',
    warning: '#d69e2e'
  },
  dark: {
    primary: '#a3bffa',
    secondary: '#9f7aea',
    background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
    cardBackground: 'rgba(45, 55, 72, 0.9)',
    text: '#f7fafc',
    textSecondary: '#e2e8f0',
    border: 'rgba(255, 255, 255, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.3)',
    accent: '#667eea',
    success: '#68d391',
    error: '#fc8181',
    warning: '#f6e05e'
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const theme = isDark ? themes.dark : themes.light;

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  useEffect(() => {
    document.body.style.background = theme.background;
    document.body.style.color = theme.text;
    document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};