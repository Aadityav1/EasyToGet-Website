import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Results from '../components/Results';
import SearchInput from '../components/SearchInput';
import { useTheme } from '../contexts/ThemeContext';
import { showNotification } from '../components/Notification';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const hoverLift = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 2rem auto;
  gap: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  animation: ${fadeIn} 1s ease forwards;
  background: ${props => props.theme?.cardBackground || 'rgba(255,255,255,0.95)'};
  border-radius: 24px;
  box-shadow: 0 20px 60px ${props => props.theme?.shadow || 'rgba(0,0,0,0.1)'};
  padding: 3rem;
  color: ${props => props.theme?.text || '#2d3748'};
  backdrop-filter: saturate(200%) blur(20px);
  border: 1px solid ${props => props.theme?.border || 'rgba(255, 255, 255, 0.2)'};
  transition: all 0.4s ease;

  &:hover {
    box-shadow: 0 32px 80px ${props => props.theme?.shadow || 'rgba(0,0,0,0.15)'};
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 2rem;
  }
`;

const ContentArea = styled.main`
  flex: 1;
`;

const HeroSection = styled.section`
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const HeroText = styled.div`
  max-width: 600px;
  text-align: center;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  margin-bottom: -2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 0.75rem;
  font-weight: 900;
  background: linear-gradient(135deg, ${props => props.theme?.primary || '#5a67d8'}, ${props => props.theme?.secondary || '#764ba2'});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.35rem;
  color: ${props => props.theme?.textSecondary || '#4a5568'};
  line-height: 1.6;
  margin-bottom: 1.75rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
`;

const CallToAction = styled.button`
  background: linear-gradient(135deg, ${props => props.theme?.primary || '#5a67d8'}, ${props => props.theme?.secondary || '#764ba2'});
  color: white;
  font-weight: 700;
  padding: 1rem 2rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  animation: ${hoverLift} 3s ease infinite;
  box-shadow: 0 8px 25px ${props => props.theme?.primary || '#5a67d8'}40;
  margin: 0 auto;
  display: block;

  &:hover,
  &:focus {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 12px 35px ${props => props.theme?.primary || '#5a67d8'}60;
    outline: none;
  }
`;

const HeroImage = styled.img`
  max-width: 320px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

const SearchBarWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
`;

const Message = styled.div`
  margin: 1rem 0;
  font-weight: 600;
  text-align: center;
  animation: ${fadeIn} 0.5s ease forwards;
  color: ${props => props.error ? (props.theme?.error || '#e53e3e') : (props.theme?.success || '#38a169')};
  padding: 1rem;
  border-radius: 12px;
  background: ${props => props.error ? 
    (props.theme?.error || '#e53e3e') + '20' : 
    (props.theme?.success || '#38a169') + '20'
  };
  border: 1px solid ${props => props.error ? 
    (props.theme?.error || '#e53e3e') + '40' : 
    (props.theme?.success || '#38a169') + '40'
  };
`;

const CenteredSearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

// Simple debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const Home = () => {
  const { theme } = useTheme();
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Helper function to get domain from URL
  const getDomain = (url) => {
    try {
      const { hostname } = new URL(url);
      return hostname.replace('www.', '');
    } catch {
      return '';
    }
  };

  useEffect(() => {
    const fetchContent = async (query) => {
      setLoading(true);
      setMessage(null);
      try {
        // Use window.location.hostname to make it work in any environment
        const apiUrl = `http://${window.location.hostname}:5001`;
        const url = query ? 
          `${apiUrl}/search?q=${encodeURIComponent(query)}&_=${Date.now()}` : 
          `${apiUrl}/content`;
        
        console.log('Fetching from URL:', url);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        });
        
        if (!response.ok) throw new Error('Status: ' + response.status);
        const data = await response.json();
        console.log('Fetched data in Home.js:', data);
        const contentData = data.data ? data.data : data; // Fix: handle both response formats
        // Filter out sample software entries with url 'example.com'
        const filteredContent = contentData.filter(item => !item.url.includes('example.com'));
        const resultsWithThumbnails = filteredContent.map((item, index) => {
          const domain = getDomain(item.url);
          // Simulate timestamp: current time minus index hours
          const timestamp = new Date(Date.now() - index * 3600 * 1000).toISOString();
          return {
            ...item,
            thumbnail: `https://logo.clearbit.com/${domain}`,
            timestamp,
          };
        });
        setResults(resultsWithThumbnails);
        if (resultsWithThumbnails.length === 0) {
          setMessage('No results found.');
          if (query) {
            showNotification(`No results found for "${query}". Try different keywords.`, 'warning', 3000);
          }
        } else {
          setMessage(`Found ${resultsWithThumbnails.length} result(s).`);
          if (query) {
            showNotification(`Found ${resultsWithThumbnails.length} results for "${query}"`, 'success', 2000);
          }
        }
      } catch (e) {
        console.error('Fetch error in Home.js:', e);
        setResults([]);
        setMessage('Error fetching data: ' + e.message);
        showNotification('Failed to fetch data. Please check your connection and try again.', 'error', 5000);
      }
      setLoading(false);
    };
    fetchContent(debouncedSearchQuery.trim());
  }, [debouncedSearchQuery]);

  const onCallToActionClick = () => {
    showNotification('Welcome to EasyToGet! Start by using the search bar below to find your favorite software.', 'success', 4000);
  };

  const handleSearchInputChange = async (query) => {
    setSearchQuery(query);
    return Promise.resolve();
  };

  return (
    <HomeContainer theme={theme}>
      <ContentArea>
        <HeroSection>
          <HeroText>
            <HeroTitle theme={theme}>Welcome to EasyToGet!</HeroTitle>
            <HeroDescription theme={theme}>
              Your one-stop platform to discover, download, and enjoy your favorite software effortlessly.
            </HeroDescription>
            <CallToAction theme={theme} onClick={onCallToActionClick}>Get Started</CallToAction>
          </HeroText>
          <ImageContainer>
            <HeroImage src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80" alt="Software downloads illustration" />
          </ImageContainer>
        </HeroSection>
        <CenteredSearchBarWrapper>
          <SearchBarWrapper>
            <SearchInput onSearch={handleSearchInputChange} loading={loading} />
          </SearchBarWrapper>
        </CenteredSearchBarWrapper>
        {message && <Message theme={theme} error={message.includes('Error') || message.includes('Failed')}>{message}</Message>}
        {loading && <Message theme={theme}>Loading...</Message>}
        <Results
          links={results.map(item => ({ 
            name: item.title, 
            url: item.url, 
            content: item.content,
            thumbnail: item.thumbnail || 'https://via.placeholder.com/400x200.png?text=Software', 
            timestamp: item.timestamp 
          }))}
        />
      </ContentArea>
    </HomeContainer>
  );
};

export default Home;