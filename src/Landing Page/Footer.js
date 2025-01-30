import React from "react";
import "../../src/Assets/CSS/About.css";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer>
      &copy; {currentYear} Rent Hive. All rights reserved.
    </footer>
  );
};

export default Footer;
