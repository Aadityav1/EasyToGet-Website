import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { formatDistanceToNow } from 'date-fns';
import { FaCopy, FaExternalLinkAlt, FaDownload, FaHeart, FaShare } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

const ResultsContainer = styled.section`
  margin-top: 2rem;
  width: 100%;
  animation: ${fadeInUp} 0.6s ease forwards;
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme?.text || '#2d3748'};
  font-weight: 800;
  text-align: center;
  background: linear-gradient(135deg, ${props => props.theme?.primary || '#5a67d8'}, ${props => props.theme?.secondary || '#764ba2'});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ResultCard = styled.div`
  background: ${props => props.theme?.cardBackground || 'rgba(255, 255, 255, 0.95)'};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px ${props => props.theme?.shadow || 'rgba(0, 0, 0, 0.1)'};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme?.border || 'rgba(255, 255, 255, 0.2)'};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${props => props.index * 0.1}s;
  opacity: 0;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px ${props => props.theme?.shadow || 'rgba(0, 0, 0, 0.15)'};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const ThumbnailContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #f7fafc, #edf2f7);
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  
  ${ResultCard}:hover & {
    transform: scale(1.1);
  }
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(90, 103, 216, 0.8), rgba(118, 75, 162, 0.8));
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  ${ResultCard}:hover & {
    opacity: 1;
  }
`;

const OverlayButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme?.text || '#2d3748'};
  margin: 0;
  line-height: 1.3;
  flex: 1;
  margin-right: 1rem;
`;

const CategoryBadge = styled.span`
  background: linear-gradient(135deg, ${props => props.theme?.primary || '#5a67d8'}, ${props => props.theme?.secondary || '#764ba2'});
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
`;

const Description = styled.p`
  color: ${props => props.theme?.textSecondary || '#4a5568'};
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const UrlDisplay = styled.div`
  background: ${props => props.theme?.border || 'rgba(0, 0, 0, 0.05)'};
  padding: 0.75rem;
  border-radius: 10px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.8rem;
  color: ${props => props.theme?.textSecondary || '#4a5568'};
  word-break: break-all;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme?.border || 'rgba(0, 0, 0, 0.1)'};
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme?.border || 'rgba(0, 0, 0, 0.1)'};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? 
    `linear-gradient(135deg, ${props.theme?.primary || '#5a67d8'}, ${props.theme?.secondary || '#764ba2'})` : 
    'transparent'
  };
  color: ${props => props.primary ? 'white' : (props.theme?.text || '#2d3748')};
  border: 2px solid ${props => props.primary ? 'transparent' : (props.theme?.border || 'rgba(0, 0, 0, 0.1)')};
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.primary ? 
      (props.theme?.primary || '#5a67d8') + '40' : 
      (props.theme?.shadow || 'rgba(0, 0, 0, 0.1)')
    };
  }
  
  &.copied {
    background: ${props => props.theme?.success || '#38a169'};
    color: white;
    animation: ${pulse} 0.3s ease;
  }
`;

const Timestamp = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme?.textSecondary || '#4a5568'};
  font-weight: 500;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme?.textSecondary || '#4a5568'};
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${props => props.theme?.text || '#2d3748'};
  }
  
  p {
    font-size: 1.1rem;
    opacity: 0.8;
  }
`;

const Results = ({ links }) => {
  const { theme } = useTheme();
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const getDomain = (url) => {
    try {
      const { hostname } = new URL(url);
      return hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const handleCopy = async (url, index) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async (link) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: link.name,
          text: link.content,
          url: link.url
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopy(link.url);
    }
  };

  const toggleFavorite = (index) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(index)) {
        newFavorites.delete(index);
      } else {
        newFavorites.add(index);
      }
      return newFavorites;
    });
  };

  if (!links || links.length === 0) {
    return (
      <EmptyState theme={theme}>
        <h3>No Results Found</h3>
        <p>Try adjusting your search terms or browse our categories.</p>
      </EmptyState>
    );
  }

  return (
    <ResultsContainer>
      <Heading theme={theme}>Download Links ({links.length})</Heading>
      <ResultsGrid>
        {links.map((link, index) => (
          <ResultCard 
            key={index} 
            theme={theme} 
            index={index}
            onClick={() => window.open(link.url, '_blank')}
          >
            <ThumbnailContainer>
              <Thumbnail 
                src={link.thumbnail || 'https://via.placeholder.com/400x200.png?text=Software'} 
                alt={`${link.name} thumbnail`}
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x200.png?text=Software';
                }}
              />
              <ThumbnailOverlay>
                <OverlayButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(link.url, '_blank');
                  }}
                  title="Open link"
                >
                  <FaExternalLinkAlt />
                </OverlayButton>
                <OverlayButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(link.url, index);
                  }}
                  title="Copy URL"
                >
                  <FaCopy />
                </OverlayButton>
                <OverlayButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(link);
                  }}
                  title="Share"
                >
                  <FaShare />
                </OverlayButton>
              </ThumbnailOverlay>
            </ThumbnailContainer>
            
            <CardContent>
              <CardHeader>
                <Title theme={theme}>{link.name || getDomain(link.url)}</Title>
                <CategoryBadge theme={theme}>Software</CategoryBadge>
              </CardHeader>
              
              <Description theme={theme}>
                {link.content || `Download ${link.name || getDomain(link.url)} from the official source.`}
              </Description>
              
              <UrlDisplay theme={theme}>
                {getDomain(link.url)}
              </UrlDisplay>
              
              <CardFooter theme={theme}>
                <Timestamp theme={theme}>
                  {link.timestamp ? formatDistanceToNow(new Date(link.timestamp), { addSuffix: true }) : 'Recently added'}
                </Timestamp>
                
                <ActionButtons>
                  <ActionButton
                    theme={theme}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(link.url, index);
                    }}
                    className={copiedIndex === index ? 'copied' : ''}
                    title="Copy URL"
                  >
                    <FaCopy />
                    {copiedIndex === index ? 'Copied!' : 'Copy'}
                  </ActionButton>
                  
                  <ActionButton
                    theme={theme}
                    primary
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(link.url, '_blank');
                    }}
                    title="Download"
                  >
                    <FaDownload />
                    Download
                  </ActionButton>
                </ActionButtons>
              </CardFooter>
            </CardContent>
          </ResultCard>
        ))}
      </ResultsGrid>
    </ResultsContainer>
  );
};

export default Results;