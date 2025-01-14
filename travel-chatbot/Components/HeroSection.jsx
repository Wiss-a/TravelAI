import React, { useState, useEffect } from 'react';
import SplineScene from './SplineScene';
import '../Styles/HeroSection.css';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX: x, clientY: y } = event;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavigation = (path) => {
    setIsNavigating(true); // Trigger animation
    setTimeout(() => navigate(path), 1000); // Delay navigation
  };

  return (
    <div
      className={`homepage ${isNavigating ? 'fade-out' : ''}`}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      }}
    >
      <nav className="navbar">
        <div className="logo">MyTravelBuddy</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#features">Chat</a>
          <a href="#contact">Plans</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        {/* Animated Plane */}
        <div className="plane-icon">
          ✈️
        </div>

        <div className="hero-content">
          <h1>Welcome to your TravelBuddy</h1>
          <p>
            Plan your trip from A to Z without any worry, your TravelBuddy is here to assist you along your travels!
          </p>
          <div className="cta-buttons">
            <button className="btn" onClick={() => handleNavigation('/chat')}>
              Start Chatting
            </button>
            <button className="btn secondary" onClick={() => handleNavigation('/learn')}>
              Learn More
            </button>
          </div>
        </div>

        {/* Spline Interactive Model */}
        <div className="spline-container">
          <SplineScene />
        </div>
      </header>

      {/* Interactive Background */}
      <div id="particle-container"></div>
    </div>
  );
};

export default HeroSection;


 
