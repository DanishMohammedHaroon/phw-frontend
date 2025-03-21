import "./App.scss";
import React from "react";
import "typeface-lato";
import ErrorBoundary from "./ErrorBoundary";
import LoginPage from "./pages/LoginPage/LoginPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ClientWorkoutSetupPage from "./pages//ClientWorkoutSetupPage/ClientWorkoutSetupPage";
import SecureMessagingPage from "./pages/SecureMessagingPage/SecureMessagingPage";
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
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/physio-dashboard" element={<PhysioDashboard />} />
        <Route
          path="/client-dashboard"
          element={
            <ErrorBoundary>
              <ClientDashboard />
            </ErrorBoundary>
          }
        />
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
        <Route path="/messaging" element={<SecureMessagingPage />} />
        <Route
          path="/physio-feedback"
          element={<PhysiotherapistFeedbackPage />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
