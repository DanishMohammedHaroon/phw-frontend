import { useAuth } from "../../context/AuthContext";
import "./DashboardPage.scss";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not logged in; otherwise, route based on role
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      if (user.role === "physio_therapist") {
        navigate("/physio-dashboard");
      } else if (user.role === "client") {
        navigate("/client-dashboard");
      }
    }
  }, [user, navigate]);

  return (
    <div className="dashboard">
      <p className="dashboard__message">Redirecting to your dashboard...</p>
    </div>
  );
};

export default Dashboard;
