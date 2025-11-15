import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Aperture, Search, LayoutGrid, Tag, MessageSquare, User } from 'lucide-react';
import '../styles/home.css';

const Home: React.FC = () => {
  const [user] = useAuthState(auth);
  const [isRotating, setIsRotating] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      navigate('/capture');
    }, 700); // This duration should match the animation duration in home.css
  };

  if (!user) {
    // Optionally, you can redirect to a login page or show a message
    return (
      <div className="home-container">
        <p>Please log in to continue.</p>
      </div>
    );
  }

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
            <a href="/search" className="nav-link">
              <Search className="nav-icon" />
              <span>AI Search</span>
            </a>
            <a href="/categories" className="nav-link">
              <LayoutGrid className="nav-icon" />
              <span>Categories</span>
            </a>
            <a href="/listings" className="nav-link">
              <Tag className="nav-icon" />
              <span>Listings</span>
            </a>
            <a href="/chat" className="nav-link">
              <MessageSquare className="nav-icon" />
              <span>Chat</span>
            </a>
            <a href="/profile" className="nav-link">
              <User className="nav-icon" />
              <span>Profile</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Home;
