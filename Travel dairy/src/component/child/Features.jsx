import React from "react";
import { Link } from "react-router-dom";
import travelHistoryImg from "../../assets/travel-history-img.png"; // Replace with actual feature-specific images
import profileImg from "../../assets/profile-img.png";
import communityImg from "../../assets/profile-img.png"; // Add this asset
import "../../Css/features.css"; // Specific styles for Features page

const Features = () => {
  return (
    <div className="page-wrapper">
      {/* Header */}
      <header className="main-header">
        <div className="logo">TravelDiary</div>
        <nav className="nav-links">
          <Link to="/welcome" className={location.pathname === '/welcome' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/features" className={location.pathname === '/features' ? 'active' : ''}>
            Features
          </Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About Us
          </Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            Contact
          </Link>
        </nav>
        <div className="auth-buttons">
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
          <Link to="/signup">
            <button className="signup-button1">Signup</button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Explore Our Features</h1>
          <p className="hero-subtitle">Everything You Need for Your Journey</p>
          <p className="hero-description">
            Discover the tools that make TravelDiary your ultimate travel
            companion.
          </p>
        </div>
        <div className="scroll-indicator">
          <p>Scroll down</p>
          <div className="arrow"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-container features-section">
        <div className="content-center">
          <h2>Why Choose TravelDiary?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <img src={travelHistoryImg} alt="Travel History" />
              <h3>Travel History</h3>
              <p>
                Document every trip with ease and revisit your adventures
                anytime.
              </p>
            </div>
            <div className="feature-card">
              <img src={profileImg} alt="Profile" />
              <h3>Your Profile</h3>
              <p>
                Create a personalized space to showcase your travel stories.
              </p>
            </div>
            <div className="feature-card">
              <img src={communityImg} alt="Community" />
              <h3>Community</h3>
              <p>
                Connect with travelers worldwide and share your experiences.
              </p>
            </div>
          </div>
          <Link to="/signup">
            <button className="section-btn1">Start Exploring</button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>
          All rights reserved by Niraj Bharadva © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Features;