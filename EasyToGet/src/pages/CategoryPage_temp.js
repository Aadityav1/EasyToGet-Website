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
        const response = await fetch('http://localhost:5001/content/category/' + encodeURIComponent(transformedCategoryName));
        if (!response.ok) {
          setError('Failed to fetch category content. Status: ' + response.status);
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
        setError('Error fetching category content.');
        setResults([]);
      }
      setLoading(false);
    };
    fetchCategoryContent();
  }, [categoryName]);

  return (
    <CategoryContainer>
      <Heading>{categoryName.replace(/-/g, ' ')}</Heading>
      {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && !error && (
        <Results
          links={results.map(item => ({
            name: item.title,
            url: item.url,
            thumbnail: `https://logo.clearbit.com/${new URL(item.url).hostname.replace('www.', '')}`
          }))}
        />
      )}
    </CategoryContainer>
  );
};

export default CategoryPage;
