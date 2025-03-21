import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./PhysioDashboard.scss";

const PhysioDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="physio-dashboard">
      <div className="physio-dashboard__card">
      <h2 className="physio-dashboard__title">Physiotherapist Dashboard</h2>
      <p className="physio-dashboard__description">
        Welcome, Physiotherapist! Choose an option below:
      </p>
      <ul className="physio-dashboard__list">
        <li className="physio-dashboard__list-item">
          <Link to="/exercises" className="physio-dashboard__link">
            Exercise Catalog
          </Link>
        </li>
        <li className="physio-dashboard__list-item">
          <Link to="/assignment-manager" className="physio-dashboard__link">
            Manage Assignments
          </Link>
        </li>
        <li className="physio-dashboard__list-item">
          <Link to="/physio-feedback" className="physio-dashboard__link">
            Review Feedback
          </Link>
        </li>
        <li className="physio-dashboard__list-item">
          <Link to="/messaging" className="physio-dashboard__link">
            Secure Messaging
          </Link>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="physio-dashboard__logout-button"
      >
        Log Out
      </button>
      </div>
    </div>
  );
};

export default PhysioDashboard;
