import React, { useState, useEffect } from "react";

const ImageSlider = ({ images }) => 
{
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => 
  {
    const interval = setInterval(() => {setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);}, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider-container col-md-6">
      {images.map((image, index) => (
        <div key={image.id} className={`slide ${index === currentIndex ? "active" : ""}`}>
          <img src={`https://mobikey-lms.s3.amazonaws.com/${image.image_url}`} alt={`Slide ${image.image_url}`} className="img-fluid rounded shadow-sm"/>
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
