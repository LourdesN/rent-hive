import React from "react";
import "../../src/Assets/CSS/About.css"; 

const About = () => {
  return (
    <div className="responsive-container-block bigContainer" id="about">
      <div className="responsive-container-block Container">
        {/* Left Side */}
        <div className="responsive-container-block leftSide">
          <p className="text-blk heading">Rent Hive</p>
          <p className="text-blk subHeading">
            Your Premium Solution for property management!  &#128578; 
            <br />
            We strive to simplify and streamline the complexities of property management through innovative technology.
            Our mission is to provide property owners and tenants with a seamless, efficient, and transparent platform
            for managing all aspects of rental properties. With our user-friendly interface and robust features,
            we are committed to enhancing the rental experience for all our clients. Join the Rent Hive community
            and let us help you manage your properties with ease.
          </p>
          
          {/* Contact Button */}
          <button className="button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
            </svg>
            <a href="tel:+254745416760" className="contact-link">Contact Us</a>
          </button>
        </div>

        {/* Right Side - Images */}
        <div className="responsive-container-block rightSide">
          <img className="number1img" src="https://i.pinimg.com/736x/fa/cf/3a/facf3a22c166279dce0ed3e75d8ef3e3.jpg" alt="1" />
          <img className="number2img" src="https://i.pinimg.com/474x/99/57/50/9957506f5315d50b96b2c7ceda79295c.jpg" alt="2" />
          <img className="number3img" src="https://i.pinimg.com/474x/8f/d6/8c/8fd68c23897e8cf97649c09b0499a78c.jpg" alt="3" />
          <img className="number5img" src="https://i.pinimg.com/474x/3a/1e/97/3a1e97fff437486bec8367080ccf3333.jpg" alt="4" />
          <img className="number7img" src="https://i.pinimg.com/474x/e4/d4/e9/e4d4e9d3ffdd1d6d6447164cd84e0fc3.jpg" alt="5" />
          <img className="number6img" src="https://i.pinimg.com/474x/ed/56/1f/ed561f5112f7abff77c03e447cf228d5.jpg" alt="6" />
        </div>
      </div>
    </div>
  );
};

export default About;
