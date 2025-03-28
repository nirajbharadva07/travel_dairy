import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Info,
  Users,
  Code,
  Heart,
  Globe,
  Lock,
  Mail,
  MessageSquare,
  GitBranch,
  Smartphone,
  Award
} from 'lucide-react';
import "../../Css/more.css"; // Import the separate CSS file

export const More = ({ setActiveRoute }) => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  // Set active route name on component mount
  useEffect(() => {
    setActiveRoute("More");
  }, [setActiveRoute]);

  // FAQ Items
  const faqItems = [
    {
      question: "How is my data protected?",
      answer: "We use industry-standard encryption and security protocols to protect your travel data."
    },
    {
      question: "Can I export my travel history?",
      answer: "Yes, you can export your travel history as PDF or CSV from your profile section."
    },
    {
      question: "How do I collaborate with friends?",
      answer: "Use our share feature to invite friends to contribute to shared travel diaries."
    }
  ];

  // Team Members
  const teamMembers = [
    {
      name: "Niraj Bharadva",
      role: "Founder & CEO",
      bio: "Passionate about travel technology",
      social: "@nirajbharadva"
    },
    {
      name: "Niraj Bharadva",
      role: "Lead Developer",
      bio: "Full-stack development enthusiast",
      social: "@nirajbharadva"
    },
    {
      name: "Niraj Bharadva",
      role: "UX Designer",
      bio: "Creating beautiful travel experiences",
      social: "@nirajbharadva"
    }
  ];

  // Feature Cards
  const features = [
    {
      icon: <Globe size={24} />,
      title: "Global Coverage",
      description: "Track travels across 195 countries"
    },
    {
      icon: <Lock size={24} />,
      title: "Secure Storage",
      description: "Military-grade encryption for your memories"
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile First",
      description: "Optimized for mobile experiences"
    },
    {
      icon: <GitBranch size={24} />,
      title: "Open Source",
      description: "Contribute to our GitHub repository"
    },
    {
      icon: <Award size={24} />,
      title: "Award Winning",
      description: "Best Travel App 2025"
    },
    {
      icon: <Heart size={24} />,
      title: "Community Driven",
      description: "Built by travelers for travelers"
    }
  ];

  return (
    <motion.div
      className="more-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="more-hero">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <Info size={48} className="hero-icon" />
          <h1 className="hero-heading">About Travel Diary</h1>
          <p className="hero-subheading">
            Your Ultimate Travel Companion Since 2025
          </p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <section className="features-section">
        <h2 className="section-heading">
          <Code size={28} /> Core Features
        </h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              className="feature-card"
              key={index}
              whileHover={{ scale: 1.05 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2 className="section-heading">
          <Users size={28} /> Our Team
        </h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              className="team-card"
              key={index}
              whileHover={{ scale: 1.03 }}
            >
              {/* Placeholder gradient circle for avatar */}
              <div className="team-avatar" />
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-bio">{member.bio}</p>
              <p className="team-social">{member.social}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2 className="section-heading">
          <MessageSquare size={28} /> FAQ
        </h2>
        <div className="faq-container">
          {faqItems.map((item, index) => (
            <div className="faq-item" key={index}>
              <button
                className="faq-question"
                onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
              >
                {item.question}
                <span
                  className={`faq-arrow ${
                    activeFAQ === index ? "rotated" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {activeFAQ === index && (
                <motion.div
                  className="faq-answer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {item.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2 className="section-heading">
          <Mail size={28} /> Contact Us
        </h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="contact-title">Get in Touch</h3>
            <p className="contact-text">
              Have questions? Reach out to our 24/7 support team.
            </p>
            <div className="contact-details">
              <p>Email: support@traveldiary.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Travel Street, Wanderlust City</p>
            </div>
          </div>
          <div className="contact-form-wrapper">
            <form className="contact-form">
              <input type="email" placeholder="Your email" />
              <textarea placeholder="Your message" rows="5" />
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="more-footer">
        <p>© {new Date().getFullYear()} Travel Diary. All rights reserved.</p>
        <div className="footer-buttons">
          <button>Privacy Policy</button>
          <button>Terms of Service</button>
        </div>
      </footer>
    </motion.div>
  );
};

export default More;
