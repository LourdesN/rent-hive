import React, { useEffect, useState } from 'react';
import '../../Assets/CSS/Images.css';  


const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); 
      }, 3000); // Change image every 3 seconds
  
      return () => clearInterval(interval);
    }, [images.length]);
  
    return (
      <div className="carousel-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            <img
              src={`https://mobikey-lms.s3.amazonaws.com/${image.image_url}`}
              alt={`Property ${index}`}
              className="carousel-image"
            />
          </div>
        ))}
      </div>
    );
  };
  
export default Carousel;
