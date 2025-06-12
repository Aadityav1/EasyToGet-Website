import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Results from '../components/Results';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CategoryContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  animation: ${fadeIn} 1s ease forwards;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1rem;
  }
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
`;

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    const fetchCategoryContent = async () => {
      setLoading(true);
      setError(null);
      try {
        // Transform categoryName: replace hyphens with spaces and capitalize words
        const transformedCategoryName = categoryName
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        // Use window.location.hostname to make it work in any environment
        const apiUrl = `http://${window.location.hostname}:5001`;
        const url = `${apiUrl}/content/category/${encodeURIComponent(transformedCategoryName)}`;
        
        console.log('Fetching from URL:', url);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        });
        
        if (!response.ok) {
          console.error('Fetch failed:', response);
          setError('Failed to fetch category content. Status: ' + response.status + ' ' + response.statusText);
          setResults([]);
          setLoading(false);
          return;
        }
        const data = await response.json();
        if (data.success) {
          console.log('Fetched category data:', data.data);
          setResults(data.data);
        } else {
          setError('Failed to load category content.');
          setResults([]);
        }
      } catch (error) {
        console.error('Fetch error in CategoryPage.js:', error);
        setError('Error fetching category content: ' + error.message);
        setResults([]);
      }
      setLoading(false);
    };
    fetchCategoryContent();
  }, [categoryName]);

  const safeCategoryName = categoryName ? categoryName.replace(/-/g, ' ') : '';

  console.log('CategoryPage results state:', results);
  return (
    <CategoryContainer>
      <Heading>{safeCategoryName}</Heading>
      {loading && <p>Loading category content...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Results
        links={results.map(item => {
          console.log('Mapping item to link:', item);
          const domain = getDomain(item.url);
          return {
            name: item.title,
            content: item.content,
            url: item.url,
            thumbnail: `https://logo.clearbit.com/${domain}`,
            timestamp: item.timestamp
          };
        })}
      />
    </CategoryContainer>
  );
};

export default CategoryPage;