import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ClientDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
      <div style={{ padding: "2rem" }}>
        <h2>Client Dashboard</h2>
        {user && <p>Welcome, {user.name}! Choose an option below:</p>}
        <ul>
          <li>
            <Link to="/exercises">Exercise Catalog</Link>
          </li>
          <li>
            <Link to="/client-workout">View Progress</Link>
          </li>
          <li>
            <Link to="/messaging">Messaging</Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      <button onClick={handleLogout}>Log Out</button>
      </div>
  );
};

export default ClientDashboard;
