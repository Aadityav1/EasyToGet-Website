import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
`;

const NotificationItem = styled.div`
  background: ${props => props.theme?.cardBackground || 'white'};
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 10px 30px ${props => props.theme?.shadow || 'rgba(0, 0, 0, 0.1)'};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme?.border || 'rgba(0, 0, 0, 0.1)'};
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 300px;
  max-width: 400px;
  pointer-events: all;
  animation: ${props => props.isExiting ? slideOut : slideIn} 0.3s ease forwards;
  border-left: 4px solid ${props => {
    switch (props.type) {
      case 'success': return props.theme?.success || '#38a169';
      case 'error': return props.theme?.error || '#e53e3e';
      case 'warning': return props.theme?.warning || '#d69e2e';
      default: return props.theme?.primary || '#5a67d8';
    }
  }};
`;

const IconContainer = styled.div`
  color: ${props => {
    switch (props.type) {
      case 'success': return props.theme?.success || '#38a169';
      case 'error': return props.theme?.error || '#e53e3e';
      case 'warning': return props.theme?.warning || '#d69e2e';
      default: return props.theme?.primary || '#5a67d8';
    }
  }};
  font-size: 1.2rem;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-weight: 600;
  color: ${props => props.theme?.text || '#2d3748'};
  margin-bottom: 2px;
`;

const Message = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme?.textSecondary || '#4a5568'};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme?.textSecondary || '#4a5568'};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme?.border || 'rgba(0, 0, 0, 0.1)'};
    color: ${props => props.theme?.text || '#2d3748'};
  }
`;

const getIcon = (type) => {
  switch (type) {
    case 'success': return <FaCheckCircle />;
    case 'error': return <FaExclamationTriangle />;
    case 'warning': return <FaExclamationTriangle />;
    default: return <FaInfoCircle />;
  }
};

const getTitle = (type) => {
  switch (type) {
    case 'success': return 'Success';
    case 'error': return 'Error';
    case 'warning': return 'Warning';
    default: return 'Info';
  }
};

let notificationId = 0;
const notifications = [];
const listeners = [];

export const showNotification = (message, type = 'info', duration = 5000) => {
  const id = ++notificationId;
  const notification = {
    id,
    message,
    type,
    duration,
    timestamp: Date.now()
  };
  
  notifications.push(notification);
  listeners.forEach(listener => listener([...notifications]));
  
  if (duration > 0) {
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  }
  
  return id;
};

export const removeNotification = (id) => {
  const index = notifications.findIndex(n => n.id === id);
  if (index > -1) {
    notifications.splice(index, 1);
    listeners.forEach(listener => listener([...notifications]));
  }
};

const NotificationSystem = () => {
  const { theme } = useTheme();
  const [notificationList, setNotificationList] = useState([]);
  const [exitingIds, setExitingIds] = useState(new Set());

  useEffect(() => {
    const listener = (newNotifications) => {
      setNotificationList(newNotifications);
    };
    
    listeners.push(listener);
    
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  const handleClose = (id) => {
    setExitingIds(prev => new Set([...prev, id]));
    setTimeout(() => {
      removeNotification(id);
      setExitingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 300);
  };

  return (
    <NotificationContainer>
      {notificationList.map(notification => (
        <NotificationItem
          key={notification.id}
          type={notification.type}
          theme={theme}
          isExiting={exitingIds.has(notification.id)}
        >
          <IconContainer type={notification.type} theme={theme}>
            {getIcon(notification.type)}
          </IconContainer>
          <Content>
            <Title theme={theme}>{getTitle(notification.type)}</Title>
            <Message theme={theme}>{notification.message}</Message>
          </Content>
          <CloseButton
            onClick={() => handleClose(notification.id)}
            theme={theme}
          >
            <FaTimes />
          </CloseButton>
        </NotificationItem>
      ))}
    </NotificationContainer>
  );
};

export default NotificationSystem;