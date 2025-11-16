import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aperture, Search, LayoutGrid, Tag, MessageSquare, Flame } from 'lucide-react';
import '../styles/home.css';

const Home: React.FC = () => {
  const [isRotating, setIsRotating] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      navigate('/camera');
    }, 700);
  };

  return (
    <div className="home-container">
      <div className="home-layout">
        {/* Left Side - Brand & Clickable Logo */}
        <div className="brand-section">
          <div className="camera-logo-container" onClick={handleLogoClick}>
            <div className="concentric-circles circle-1"></div>
            <div className="concentric-circles circle-2"></div>
            <div className="concentric-circles circle-3"></div>
            <Aperture 
              className={`camera-icon ${isRotating ? 'rotating' : ''}`} 
              size={80} 
              strokeWidth={1} 
            />
          </div>
          <h1 className="brand-title">Snap&Find</h1>
          <p className="brand-tagline">AI-Powered Visual-First Classifieds</p>
        </div>

        {/* Right Side - Navigation */}
        <div className="navigation-section">
          <h2 className="welcome-title">Welcome to Snap&Find</h2>
          <nav className="nav-links">
            <button onClick={() => navigate('/camera')} className="nav-link">
              <Search className="nav-icon" />
              <span>AI Search</span>
            </button>
            <button onClick={() => navigate('/categories')} className="nav-link">
              <LayoutGrid className="nav-icon" />
              <span>Categories</span>
            </button>
            <button onClick={() => navigate('/results')} className="nav-link">
              <Tag className="nav-icon" />
              <span>Listings</span>
            </button>
            <button onClick={() => navigate('/chat')} className="nav-link">
              <MessageSquare className="nav-icon" />
              <span>Chat</span>
            </button>
            <button onClick={() => navigate('/wanted')} className="nav-link">
              <Flame className="nav-icon" />
              <span>Wanted</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Home;
