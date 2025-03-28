import React from "react";
import { Link } from "react-router-dom";
import "../../Css/contact.css"; // Specific styles for Contact page

const Contact = () => {
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
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-subtitle">We’d Love to Hear From You</p>
          <p className="hero-description">
            Have questions or suggestions? Reach out to us anytime!
          </p>
        </div>
        <div className="scroll-indicator">
          <p>Scroll down</p>
          <div className="arrow"></div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-container contact-section">
        <div className="content-left">
          <h2>Contact Us</h2>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit" className="section-btn">
              Send Message
            </button>
          </form>
        </div>
        <div className="content-right">
          <h2>Our Details</h2>
          <p>Email: support@traveldiary.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Travel Lane, Wanderlust City</p>
          <div className="map-placeholder">
            <p>[Map Placeholder - Replace with Google Maps Embed]</p>
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

export default Contact;