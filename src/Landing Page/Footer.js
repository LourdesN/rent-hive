import React from "react";
import "../../src/Assets/CSS/About.css";
import { FaWhatsapp, FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa"; 

const Footer = () => {
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className="footer-container">
      {/* Social Media Icons */}
      <div className="social-icons">
        <a href="whatsapp://send?text=Hello I would like to Enquire about managing my properties &phone=+254770909233" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
        </a>
        <a href="mailto:lourdeswairimu@gmail.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.linkedin.com/in/lourdes-nganga-0584a4227/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </div>

      {/* Copyright Text */}
      <p>&copy; {currentYear} Rent Hive. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
