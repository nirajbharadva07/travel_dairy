import React from "react";
import { Link } from "react-router-dom";
import aboutImg from "../../assets/profile-img.png"; // Replace with actual image
import "../../Css/about.css"; // Specific styles for About page

const About = () => {
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
          <h1 className="hero-title">About TravelDiary</h1>
          <p className="hero-subtitle">Where Every Journey Finds a Home</p>
          <p className="hero-description">
            We’re passionate about helping travelers preserve their memories
            and connect with a global community of explorers.
          </p>
        </div>
        <div className="scroll-indicator">
          <p>Scroll down</p>
          <div className="arrow"></div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-container mission-section">
        <div className="content-left">
          <h2>Our Mission</h2>
          <p>
            At TravelDiary, we aim to make every trip unforgettable by
            providing a platform to document, share, and relive your
            adventures. Whether it’s a weekend getaway or a cross-continental
            journey, we’re here to inspire and connect travelers worldwide.
          </p>
        </div>
        <div className="image-right">
          <img src={aboutImg} alt="Our Mission" />
        </div>
      </section>

      {/* Team Section */}
      <section className="section-container team-section">
        <div className="content-center">
          <h2>Meet the Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <h3>Niraj Bharadva</h3>
              <p>Founder & Dreamer</p>
            </div>
            <div className="team-member">
              <h3>Niraj Bharadva</h3>
              <p>Designer & Storyteller</p>
            </div>
            <div className="team-member">
              <h3>Niraj Bharadva</h3>
              <p>Tech Wizard</p>
            </div>
          </div>
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

export default About;