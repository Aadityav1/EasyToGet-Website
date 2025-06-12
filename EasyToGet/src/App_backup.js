import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SplashScreen from './components/SplashScreen';
import CategoryPage from './pages/CategoryPage';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div
        className="app-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          minHeight: '100vh',
          width: '100vw',
          flexGrow: 1,
          color: '#222',
        }}
      >
        <Header />
        <main style={{ flex: 1, padding: '0', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Removed HowItWorks, FAQ, Contact routes as files deleted */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
