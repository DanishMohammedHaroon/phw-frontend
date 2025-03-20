import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.scss";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1 className="landing-page__title">Welcome to PHW</h1>
      <p className="landing-page__description">
        Your physiotherapy solution for remote care.
      </p>
      <div className="landing-page__links">
        <Link to="/login" className="landing-page__link">
          Login
        </Link>{" "}
        |{" "}
        <Link to="/register" className="landing-page__link">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
