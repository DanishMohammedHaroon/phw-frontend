import React from "react";
import {useAuth} from "../../context/AuthContext"
import "./DashboardPage.scss";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Log Out</button>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Dashboard;