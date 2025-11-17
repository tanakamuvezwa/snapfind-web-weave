import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Camera } from 'lucide-react';
import '../styles/home.css';

const Home: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="home-container flex items-center justify-center">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Camera Icon with Glow */}
        <div className="camera-circle">
          <Camera className="camera-icon" size={64} strokeWidth={2} />
        </div>

        {/* Brand Title */}
        <h1 className="home-title">
          <span className="title-snap">Snap</span>
          <span className="title-find">Find</span>
        </h1>
        
        {/* Subtitle */}
        <p className="home-subtitle">AI-Powered Visual Marketplace</p>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            onClick={() => navigate('/camera?action=buy')} 
            className="btn-snap-buy"
          >
            <Camera size={20} />
            Snap to Buy
          </button>
          
          <button 
            onClick={() => navigate('/camera?action=sell')} 
            className="btn-snap-sell"
          >
            <Camera size={20} />
            Snap to Sell
          </button>
        </div>

        {/* Bottom Tagline */}
        <p className="home-tagline">Take a photo and let AI do the rest</p>
      </div>
    </div>
  );
};

export default Home;
