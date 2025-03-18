import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PhysioDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
      <div style={{ padding: "2rem" }}>
        <h2>Physiotherapist Dashboard</h2>
        <p>Welcome, Physiotherapist! Choose an option below:</p>
        <ul>
          <li>
            <Link to="/exercises">Exercise Catalog</Link>
          </li>
          <li>
            <Link to="/assignments">Manage Assignments</Link>
          </li>
          <li>
            <Link to="/feedback">Submit/Review Feedback</Link>
          </li>
          <li>
            <Link to="/progress">Progress Tracking</Link>
          </li>
          <li>
            <Link to="/messaging">Secure Messaging</Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      <button onClick={handleLogout}>Log Out</button>
      </div>
  );
};

export default PhysioDashboard;
