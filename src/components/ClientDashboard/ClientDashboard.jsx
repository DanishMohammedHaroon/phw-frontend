import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./ClientDashboard.scss";

const ClientDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="client-dashboard">
      <div className="client-dashboard__card">
        <h2 className="client-dashboard__heading">Client Dashboard</h2>
        {user && (
          <p className="client-dashboard__welcome">
            Welcome, {user.name}! Choose an option below:
          </p>
        )}
        <ul className="client-dashboard__list">
          <li className="client-dashboard__list-item">
            <Link to="/exercises" className="client-dashboard__link">
              Exercise Catalog
            </Link>
          </li>
          <li className="client-dashboard__list-item">
            <Link to="/client-workout" className="client-dashboard__link">
              Workout Setup
            </Link>
          </li>
          <li className="client-dashboard__list-item">
            <Link to="/messaging" className="client-dashboard__link">
              Messaging
            </Link>
          </li>
        </ul>
        <button
          className="client-dashboard__logout-button"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ClientDashboard;