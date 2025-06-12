import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { formatDistanceToNow } from 'date-fns';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ResultsContainer = styled.section`
  margin-top: 2.5rem;
  max-width: 1200px;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  animation: ${fadeIn} 0.8s ease forwards;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 700;
`;

const ResultItem = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Thumbnail = styled.img`
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
`;

const CopyButton = styled.button`
  background: #2a7ae2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
  margin-left: 1rem;
  transition: background 0.3s ease;
  &:hover {
    background: #1a5bb8;
  }
`;

const ContentInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const Title = styled.a`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2a7ae2;
  text-decoration: none;
  word-break: break-word;
  &:hover {
    text-decoration: underline;
  }
`;

const Timestamp = styled.span`
  font-size: 0.85rem;
  color: #999;
  font-weight: 600;
  margin-left: 1rem;
`;

const Description = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #555;
  line-height: 1.3;
`;

const UrlDisplay = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
  word-break: break-all;
  font-family: monospace;
  background: #f0f0f0;
  padding: 0.3rem;
  border-radius: 4px;
`;

const Results = ({ links }) => {
  console.log('Results component links prop:', links);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Helper function to extract domain from URL
  const getDomain = (url) => {
    try {
      const { hostname } = new URL(url);
      return hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const handleCopy = (url, index) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!links) {
    return <p>Loading...</p>;
  }

  if (links.length === 0) {
    return <p>No download links found.</p>;
  }

  return (
    <ResultsContainer aria-live="polite" aria-label="Download links">
      <Heading>Download Links</Heading>
      {links.map((link, index) => (
        <ResultItem key={index}>
          <Thumbnail 
            src={link.thumbnail || 'https://via.placeholder.com/120x90.png?text=Image'} 
            alt={`Thumbnail for ${link.name || getDomain(link.url)}`} 
            loading="lazy" 
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/120x90.png?text=Image';
            }}
          />
          <ContentInfo>
            <TitleRow>
              <Title href={link.url} target="_blank" rel="noopener noreferrer" title={link.url}>
                {link.name || getDomain(link.url)}
              </Title>
              <div>
                <CopyButton onClick={() => handleCopy(link.url, index)}>
                  {copiedIndex === index ? 'Copied!' : 'Copy URL'}
                </CopyButton>
                <Timestamp>{link.timestamp ? formatDistanceToNow(new Date(link.timestamp), { addSuffix: true }) : 'Unknown time'}</Timestamp>
              </div>
            </TitleRow>
            <Description>{link.content || getDomain(link.url)}</Description>
            <UrlDisplay>{link.url}</UrlDisplay>
          </ContentInfo>
        </ResultItem>
      ))}
    </ResultsContainer>
  );
};

export default Results;