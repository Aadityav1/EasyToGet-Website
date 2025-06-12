import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

const InputField = styled.input`
  flex-grow: 1;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 2px solid #a3be00;
  border-radius: 4px 0 0 4px;
  outline: none;
  box-shadow: none;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #7a8b00;
  }
`;

const ClearButton = styled.button`
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 0 0.5rem;
  display: ${props => (props.show ? 'block' : 'none')};
  &:hover {
    color: #a3be00;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #a3be00;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #7a8b00;
  }
  &:disabled {
    background-color: #d0d8a0;
    cursor: not-allowed;
  }
`;

const SearchInput = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setError('');
  };

  const clearInput = () => {
    setQuery('');
    setError('');
    onSearch('');
  };

  return (
    <InputContainer>
      <InputField
        type="text"
        placeholder="Search Website"
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch(query);
          }
        }}
        aria-label="Search input"
        aria-invalid={!!error}
        disabled={loading}
      />
      <ClearButton onClick={clearInput} show={query.length > 0} aria-label="Clear search input">
        <FaTimes />
      </ClearButton>
      <Button onClick={() => onSearch(query)} aria-busy={loading} disabled={loading}>
        {loading ? 'Loading...' : 'GO'}
      </Button>
    </InputContainer>
  );
};

export default SearchInput;
