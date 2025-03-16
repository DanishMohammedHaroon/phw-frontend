import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ExerciseCatalogPage from "./pages/ExerciseCatalogPage/ExerciseCatalogPage"; 
import ErrorBoundary from "./ErrorBoundary";
import AssignmentsPage from "./pages/AssignmentsPage/AssignmentsPage";
import ExerciseDetailsPage from "./pages/ExerciseDetailsPage/ExerciseDetailsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/exercises"
          element={
            <ErrorBoundary>
              <ExerciseCatalogPage />
            </ErrorBoundary>
          }
        />
        <Route path="/exercise/:id" element={<ExerciseDetailsPage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
