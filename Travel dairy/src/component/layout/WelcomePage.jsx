import React from "react";
import { Link } from "react-router-dom";
import travelHistoryImg from "../../assets/travel-history-img.png";
import profileImg from "../../assets/profile-img.png";
import aboutUsImg from "../../assets/about.png"; // Update with correct asset
import testimonialsImg from "../../assets/about-2.png"; // Update with correct asset
import latestTripsImg from "../../assets/travel-history-img.png"; // Update with correct asset
import "../../Css/welcomepage.css";

const WelcomePage = () => {
  //Smooth scroll to the hero section
  const scrollToHero = (e) => {
    e.preventDefault();
    const heroSection = document.querySelector(".hero-container");
    heroSection.scrollIntoView({ behavior: "smooth" });
  };

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
          <h1 className="hero-title">
            The travel diary <br /> you ever dreamed of.
          </h1>
          <p className="hero-subtitle">Your ultimate travel companion</p>
          <p className="hero-description">
            We made a tool so you can easily keep & share your travel memories.
            <br />
            And so much more awaits!
          </p>
          <Link to="/login">
            <button className="hero-cta">Get Started</button>
          </Link>
        </div>
        <div className="scroll-indicator">
          <p>Scroll down</p>
          <div className="arrow"></div>
        </div>
      </section>

      {/* Travel History Section */}
      <section className="section-container history-section">
        <div className="content-left">
          <h2># Travel History</h2>
          <p>Relive your past adventures and plan for new ones.</p>
          <div className="history-item">
            <h3>Paris, France</h3>
            <p className="date">Jan 2024</p>
            <p className="description">
              A beautiful trip to the Eiffel Tower and the streets of Paris.
            </p>
          </div>
          <div className="history-item">
            <h3>Tokyo, Japan</h3>
            <p className="date">March 2024</p>
            <p className="description">
              Exploring the vibrant streets of Shibuya and ancient temples.
            </p>
          </div>
        </div>
        <div className="image-right">
          <img src={travelHistoryImg} alt="Travel History" />
        </div>
      </section>

      {/* About Us Section */}
      <section className="section-container about-section">
        <div className="image-left">
          <img src={aboutUsImg} alt="About Us" />
        </div>
        <div className="content-right">
          <h2>About Us</h2>
          <p>
            At TravelDiary, we believe every journey deserves to be remembered.
            Our platform connects travelers from around the world to share
            authentic stories and hidden gems.
          </p>
          <Link to="/about">
            <button className="about-cta">Learn More</button>
          </Link>
        </div>
      </section>

      {/* Stats Section (New Feature) */}
      <section className="section-container stats-section">
        <div className="content-center">
          <h2>Our Community in Numbers</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>10,000+</h3>
              <p>Travelers</p>
            </div>
            <div className="stat-item">
              <h3>50,000+</h3>
              <p>Trips Shared</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>Countries Explored</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Highlights Section */}
      <section className="section-container community-section">
        <div className="content-center">
          <h2>Join Our Travel Community</h2>
          <p>
            Connect with like-minded travelers, share experiences, and get
            inspired for your next adventure. Discover hidden gems, plan trips
            with ease, and save memories that last a lifetime.
          </p>
          <button className="community-button">Explore Community</button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-container testimonials-section">
        <div className="content-center">
          <h2>What Our Travelers Say</h2>
          <blockquote>
            “TravelDiary transformed the way I document my trips. The animations
            and design make every visit a delightful experience.” – Alex D.
          </blockquote>
          <blockquote>
            “A beautiful, seamless platform that captures the essence of travel.
            I love sharing my adventures here!” – Maria S.
          </blockquote>
        </div>
        <div className="image-right">
          <img src={testimonialsImg} alt="Testimonials" />
        </div>
      </section>

      {/* Latest Trips Section */}
      <section className="section-container latest-trips-section">
        <div className="content-left">
          <h2>Latest Trips</h2>
          <p>
            Stay updated with the latest trips shared by our community.
            Explore new destinations and travel ideas curated daily.
          </p>
          <Link to="/latest-trips">
            <button className="section-btn">See More</button>
          </Link>
        </div>
        <div className="image-right">
          <img src={latestTripsImg} alt="Latest Trips" />
        </div>
      </section>

      {/* Profile Section */}
      <section className="section-container profile-section">
        <div className="image-left">
          <img src={profileImg} alt="Profile" />
        </div>
        <div className="content-right">
          <h2>Your Travel Profile</h2>
          <p>Manage your travel profile and connect with fellow adventurers.</p>
          <div className="profile-nav">
            <button>Home</button>
            <button>Travel Blog</button>
            <button>Explore</button>
            <button>Search</button>
            <button>Messages</button>
            <button>Create</button>
            <button>Office</button>
          </div>
          <div className="stats">
            <div className="stat-item">
              <h3>12+</h3>
              <p>Countries Visited</p>
            </div>
            <div className="stat-item">
              <h3>24</h3>
              <p>Trips Organized</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>All rights reserved by Niraj Bharadva © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
