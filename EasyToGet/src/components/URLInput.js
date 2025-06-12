import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const pulseGlow = keyframes\`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 91, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 8px 4px rgba(0, 91, 255, 0.6);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 91, 255, 0.4);
  }
\`;

const InputContainer = styled.div\`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  width: 100%;
  max-width: 500px;
\`;

const InputField = styled.input\`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s ease;
  background: url('data:image/svg+xml;utf8,<svg fill="gray" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M3.9 12a5 5 0 0 1 5-5h2v2H8.9a3 3 0 0 0 0 6h2v2h-2a5 5 0 0 1-5-5zm7-3h2v2h-2zm0 4h2v2h-2zm4-4h2a5 5 0 0 1 0 10h-2v-2h2a3 3 0 0 0 0-6h-2zm-4 4h2v2h-2z"/></svg>') no-repeat 8px center;
  background-size: 20px 20px;
  &:focus {
    border-color: #007bff;
  }
\`;

const Button = styled.button\`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.4s ease;
  &:hover {
    background-color: #0056b3;
    box-shadow: 0 0 8px 2px rgba(0, 91, 255, 0.6);
    animation: \${pulseGlow} 2s infinite;
  }
  &:disabled {
    background-color: #a0c8ff;
    cursor: not-allowed;
  }
\`;

const ErrorMessage = styled.p\`
  color: red;
  margin-top: 0.5rem;
\`;

const URLInput = ({ onFetchLinks }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateUrl = (input) => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const handleClick = async () => {
    if (validateUrl(url)) {
      setError('');
      setLoading(true);
      try {
        await onFetchLinks(url);
      } catch (e) {
        setError('Failed to fetch links. Please try again.');
      }
      setLoading(false);
    } else {
      setError('Please enter a valid URL.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && url) {
      handleClick();
    }
  };

  return (
    <InputContainer>
      <InputField
        type="text"
        placeholder="Paste your URL here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        aria-label="URL input"
        aria-invalid={!!error}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <Button onClick={handleClick} disabled={!url || loading} aria-busy={loading}>
        {loading ? 'Loading...' : 'Get Download Link'}
      </Button>
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default URLInput;
