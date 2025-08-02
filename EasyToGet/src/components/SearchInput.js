import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTimes, FaSearch, FaFilter, FaMicrophone } from 'react-icons/fa';

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  overflow: hidden;
  
  &:focus-within {
    border-color: #5a67d8;
    box-shadow: 0 12px 40px rgba(90, 103, 216, 0.2);
    transform: translateY(-2px);
  }
  
  &:hover {
    box-shadow: 0 10px 36px rgba(0, 0, 0, 0.15);
  }
`;

const SearchIcon = styled(FaSearch)`
  margin: 0 15px;
  color: #667eea;
  font-size: 1.1rem;
`;

const InputField = styled.input`
  flex: 1;
  padding: 16px 0;
  font-size: 1.1rem;
  border: none;
  outline: none;
  background: transparent;
  color: #2d3748;
  font-weight: 500;
  
  &::placeholder {
    color: #a0aec0;
    font-weight: 400;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  padding: 12px;
  cursor: pointer;
  color: #667eea;
  transition: all 0.3s ease;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(102, 126, 234, 0.1);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const SearchButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 16px 24px;
  margin: 4px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #5a67d8, #6b46c1);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #e2e8f0;
    color: #a0aec0;
  }
  
  &.loading {
    background: linear-gradient(
      90deg,
      #e2e8f0 0px,
      #f7fafc 40px,
      #e2e8f0 80px
    );
    background-size: 200px;
    animation: ${shimmer} 1.5s infinite;
    color: transparent;
  }
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  margin-top: 8px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  display: ${props => props.show ? 'block' : 'none'};
`;

const SuggestionItem = styled.div`
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &:hover {
    background: #f8fafc;
    transform: translateX(4px);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

const FilterChip = styled.button`
  background: ${props => props.active ? '#667eea' : 'rgba(102, 126, 234, 0.1)'};
  color: ${props => props.active ? 'white' : '#667eea'};
  border: none;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.active ? '#5a67d8' : 'rgba(102, 126, 234, 0.2)'};
    transform: translateY(-1px);
  }
`;

const VoiceButton = styled(ActionButton)`
  ${props => props.listening && `
    animation: ${pulse} 1s infinite;
    color: #e53e3e;
  `}
`;

const SearchInput = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [listening, setListening] = useState(false);
  const inputRef = useRef(null);
  
  const suggestions = [
    'Windows 11', 'Visual Studio Code', 'Chrome Browser', 'Adobe Photoshop',
    'VLC Player', 'Zoom', 'Discord', 'Spotify', 'Git', 'Python'
  ];
  
  const filters = ['Operating Systems', 'Development', 'Multimedia', 'Games', 'Antivirus'];

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setShowSuggestions(newQuery.length > 0);
    onSearch(newQuery);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const clearInput = () => {
    setQuery('');
    setShowSuggestions(false);
    onSearch('');
    inputRef.current?.focus();
  };

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        onSearch(transcript);
      };
      
      recognition.start();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <SearchContainer ref={inputRef}>
      <InputContainer>
        <SearchIcon />
        <InputField
          type="text"
          placeholder="Search for software, games, or tools..."
          value={query}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch(query);
              setShowSuggestions(false);
            }
          }}
          disabled={loading}
        />
        
        {query && (
          <ActionButton onClick={clearInput} title="Clear search">
            <FaTimes />
          </ActionButton>
        )}
        
        <ActionButton 
          onClick={() => setShowFilters(!showFilters)} 
          title="Toggle filters"
        >
          <FaFilter />
        </ActionButton>
        
        <VoiceButton 
          onClick={startVoiceSearch} 
          listening={listening}
          title="Voice search"
        >
          <FaMicrophone />
        </VoiceButton>
        
        <SearchButton 
          onClick={() => {
            onSearch(query);
            setShowSuggestions(false);
          }} 
          disabled={loading}
          className={loading ? 'loading' : ''}
        >
          {loading ? 'Searching...' : 'Search'}
        </SearchButton>
      </InputContainer>
      
      {showFilters && (
        <FilterContainer>
          {filters.map(filter => (
            <FilterChip
              key={filter}
              active={activeFilters.includes(filter)}
              onClick={() => toggleFilter(filter)}
            >
              {filter}
            </FilterChip>
          ))}
        </FilterContainer>
      )}
      
      <SuggestionsContainer show={showSuggestions}>
        {suggestions
          .filter(s => s.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 6)
          .map(suggestion => (
            <SuggestionItem
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <FaSearch size={12} style={{ opacity: 0.5 }} />
              {suggestion}
            </SuggestionItem>
          ))
        }
      </SuggestionsContainer>
    </SearchContainer>
  );
};

export default SearchInput;
