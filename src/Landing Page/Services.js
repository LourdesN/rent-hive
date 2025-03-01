import React from "react";
import "../../src/Assets/CSS/Services.css"; 

const Services = () => {
  return (
    // Gallery Section
    <section className="py-2">
        <h3>What We Offer...</h3>
    <div className="images-container">
      <div className="image-wrapper">
        <img src="https://i.pinimg.com/474x/48/57/0b/48570bf5eb77efd11d99158fbf1805e2.jpg" alt="Residential"/>
        <div className="image-overlay">Residential</div>
      </div>
      
      <div className="image-wrapper">
        <img src="https://i.pinimg.com/736x/80/57/11/8057117e11457ae6a2bd9015f241bb05.jpg" alt="Commercial"/>
        <div className="image-overlay">Commercial</div>
      </div>
      
      <div className="image-wrapper">
        <img src="https://i.pinimg.com/736x/ed/56/1f/ed561f5112f7abff77c03e447cf228d5.jpg" alt="Apartments"/>
        <div className="image-overlay">Apartments</div>
      </div>
      
      <div className="image-wrapper">
        <img src="https://i.pinimg.com/736x/17/0f/ad/170fad2023f864f27ff2c7a31a57ab1b.jpg" alt="Estates"/>
        <div className="image-overlay">Estates</div>
      </div>
    </div>
    </section>
  );
};

export default Services;