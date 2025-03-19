import "./App.scss";
import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import LoginPage from "./pages/LoginPage/LoginPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ClientWorkoutSetupPage from "./pages//ClientWorkoutSetupPage/ClientWorkoutSetupPage";
import MessagingPage from "./pages/MessagingPage/MessagingPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import PhysioDashboard from "./components/PhysioDashboard/PhysioDashboard";
import ClientDashboard from "./components/ClientDashboard/ClientDashboard";
import AssignmentManagerPage from "./pages/AssignmentManagerPage/AssignmentManagerPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExerciseCatalogPage from "./pages/ExerciseCatalogPage/ExerciseCatalogPage";
import ExerciseDetailsPage from "./pages/ExerciseDetailsPage/ExerciseDetailsPage";
import PhysiotherapistFeedbackPage from "./pages/PhysiotherapistFeedbackPage/PhysiotherapistFeedbackPage"

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
        <Route path="/client-workout" element={<ClientWorkoutSetupPage />} />
        <Route path="/messaging" element={<MessagingPage />} />
        <Route path="/physio-feedback" element={<PhysiotherapistFeedbackPage />} />
      </Routes>
    </Router>
  );
};

export default App;
