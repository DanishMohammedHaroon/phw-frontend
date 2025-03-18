import "./App.scss";
import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import LoginPage from "./pages/LoginPage/LoginPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import FeedbackPage from "./pages/FeedbackPage/FeedbackPage";
import ClientWorkoutPage from "./pages//ClientWorkoutPage/ClientWorkoutPage";
import MessagingPage from "./pages/MessagingPage/MessagingPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import PhysioDashboard from "./components/PhysioDashboard/PhysioDashboard";
import ClientDashboard from "./components/ClientDashboard/ClientDashboard";
import AssignmentManagerPage from "./pages/AssignmentManagerPage/AssignmentManagerPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExerciseCatalogPage from "./pages/ExerciseCatalogPage/ExerciseCatalogPage";
import ExerciseDetailsPage from "./pages/ExerciseDetailsPage/ExerciseDetailsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/physio-dashboard" element={<PhysioDashboard />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route
          path="/exercises"
          element={
            <ErrorBoundary>
              <ExerciseCatalogPage />
            </ErrorBoundary>
          }
        />
        <Route path="/exercise/:id" element={<ExerciseDetailsPage />} />
        <Route path="/assignment-manager" element={<AssignmentManagerPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/client-workout" element={<ClientWorkoutPage />} />
        <Route path="/messaging" element={<MessagingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
