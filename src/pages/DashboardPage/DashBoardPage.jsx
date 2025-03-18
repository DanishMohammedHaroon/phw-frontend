import {useAuth} from "../../context/AuthContext"
import "./DashboardPage.scss";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If user is not logged in, redirect to login (optional)
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      // Redirect based on the role
      if (user.role === "physio_therapist") {
        navigate("/physio-dashboard");
      } else if (user.role === "client") {
        navigate("/client-dashboard");
      }
    }
  }, [user, navigate]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <p>Redirecting to your dashboard...</p>
    </div>
  );
};

export default Dashboard;
