import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="https://www.facebook.com/danish.m.haroon/">
          <img src="src/assets/Images/facebook.svg" alt="Facebook Logo" />
        </a>
        <a href="https://www.linkedin.com/in/danish-haroon/">
          <img src="src/assets/Images/linkedIn.svg" alt="LinkedIn Logo" />
        </a>
        <a
          href="https://www.buymeacoffee.com/danishharoon">
          <img src="src/assets/Images/coffee.svg" alt="Buy Me A Coffee" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
