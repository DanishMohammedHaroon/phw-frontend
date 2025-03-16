import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.scss"

const LandingPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to PHW</h1>
      <p>Your physiotherapy solution for remote care.</p>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  );
};

export default LandingPage;
