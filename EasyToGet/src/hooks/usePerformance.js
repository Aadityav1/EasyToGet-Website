import { useEffect, useRef } from 'react';

export const usePerformance = (componentName) => {
  const startTime = useRef(Date.now());
  
  useEffect(() => {
    const endTime = Date.now();
    const renderTime = endTime - startTime.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 ${componentName} rendered in ${renderTime}ms`);
    }
    
    // Report to performance monitoring service in production
    if (process.env.NODE_ENV === 'production' && renderTime > 100) {
      console.warn(`⚠️ Slow render detected: ${componentName} took ${renderTime}ms`);
    }
  });
  
  return {
    measureAsync: async (operation, operationName) => {
      const start = performance.now();
      try {
        const result = await operation();
        const end = performance.now();
        const duration = end - start;
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`⏱️ ${operationName} completed in ${duration.toFixed(2)}ms`);
        }
        
        return result;
      } catch (error) {
        const end = performance.now();
        const duration = end - start;
        console.error(`❌ ${operationName} failed after ${duration.toFixed(2)}ms:`, error);
        throw error;
      }
    }
  };
};