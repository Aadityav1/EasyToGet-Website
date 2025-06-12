import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Results from '../components/Results';
import SearchInput from '../components/SearchInput';

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
  max-width: 1200px;
  margin: 2rem auto;
  gap: 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  animation: ${fadeIn} 1s ease forwards;
  background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  padding: 3rem;
  color: #222;
  backdrop-filter: saturate(200%) blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: box-shadow 0.4s ease, transform 0.4s ease;

  &:hover {
    box-shadow: 0 32px 80px rgba(0,0,0,0.35);
    transform: translateY(-8px) scale(1.03);
  }

  @media (max-width: 768px) {
    flex-direction: column;
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
  flex-direction: row;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
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
  color: #1a202c;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.35rem;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.75rem;

  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
`;

const CallToAction = styled.button`
  background-color: #5a67d8;
  color: white;
  font-weight: 700;
  padding: 0.85rem 1.75rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  animation: ${hoverLift} 3s ease infinite;

  &:hover,
  &:focus {
    background-color: #4c51bf;
    outline: 3px solid #a3bffa;
    outline-offset: 3px;
    box-shadow: 0 0 12px #4c51bf;
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
  color: ${props => props.error ? '#e53e3e' : '#38a169'};
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
        setMessage(resultsWithThumbnails.length === 0 ? 'No results found.' : `Found ${resultsWithThumbnails.length} result(s).`);
      } catch (e) {
        console.error('Fetch error in Home.js:', e);
        setResults([]);
        setMessage('Error fetching data: ' + e.message);
      }
      setLoading(false);
    };
    fetchContent(debouncedSearchQuery.trim());
  }, [debouncedSearchQuery]);

  const onCallToActionClick = () => {
    alert('Welcome to EasyToGet! Start by using the search bar below.');
  };

  const handleSearchInputChange = async (query) => {
    setSearchQuery(query);
    return Promise.resolve();
  };

  return (
    <HomeContainer>
      <ContentArea>
        <HeroSection>
          <HeroText>
            <HeroTitle>Welcome to EasyToGet!</HeroTitle>
            <HeroDescription>
              Your one-stop platform to discover, download, and enjoy your favorite content effortlessly.
            </HeroDescription>
            <CallToAction onClick={onCallToActionClick}>Get Started</CallToAction>
          </HeroText>
          <ImageContainer>
            <HeroImage src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Welcome illustration" />
          </ImageContainer>
        </HeroSection>
        <CenteredSearchBarWrapper>
          <SearchBarWrapper>
            <SearchInput onSearch={handleSearchInputChange} loading={loading} />
          </SearchBarWrapper>
        </CenteredSearchBarWrapper>
        {message && <Message error={message.includes('Error') || message.includes('Failed')}>{message}</Message>}
        {loading && <Message>Loading...</Message>}
        <Results
          links={results.map(item => ({ 
            name: item.title, 
            url: item.url, 
            content: item.content,
            thumbnail: item.thumbnail || 'https://via.placeholder.com/120x90.png?text=Image', 
            timestamp: item.timestamp 
          }))}
        />
      </ContentArea>
    </HomeContainer>
  );
};

export default Home;