// src/pages/ClientWorkoutSetupPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import FeedbackComponent from "../../components/FeedbackComponent/FeedbackComponent";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ClientWorkoutSetupPage = () => {
  const { user } = useAuth();
  const clientId = user?.id;
  const [selectedDays, setSelectedDays] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch assigned workouts for this client
  useEffect(() => {
    const fetchAssignments = async () => {
      if (!clientId) return;
      try {
        const response = await axios.get(
          "http://localhost:5050/api/assignments",
          {
            params: { patientId: clientId },
          }
        );
        setAssignments(response.data);
      } catch (err) {
        setError("Failed to load assignments.");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [clientId]);

  const handleDayToggle = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Workout Setup</h2>

      {/* Days Selector */}
      <div>
        <h3>Select Your Workout Days</h3>
        {daysOfWeek.map((day) => (
          <label key={day} style={{ marginRight: "1rem" }}>
            <input
              type="checkbox"
              checked={selectedDays.includes(day)}
              onChange={() => handleDayToggle(day)}
            />
            {day}
          </label>
        ))}
      </div>

      <hr />

      {/* Workout List */}
      <div>
        <h3>Your Assigned Workout</h3>
        {loading ? (
          <p>Loading your workout...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : assignments.length === 0 ? (
          <p>No workouts assigned yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {assignments.map((assignment) => (
              <li
                key={assignment.id}
                style={{
                  marginBottom: "1rem",
                  border: "1px solid #ccc",
                  padding: "1rem",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {/* Show exercise title if available; fallback to exerciseId */}
                  <h4>{assignment.exerciseTitle || assignment.exerciseId}</h4>
                  <p>
                    Sets: {assignment.sets} | Reps: {assignment.repetitions}
                  </p>
                </div>
                <RoundProgressTracker
                  totalSets={assignment.sets}
                  completedSets={assignment.completedSets || 0}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <hr />

      {/* Feedback Component */}
      <FeedbackComponent />
    </div>
  );
};

// A simple round progress tracker using an SVG circle
const RoundProgressTracker = ({ totalSets, completedSets }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = totalSets > 0 ? completedSets / totalSets : 0;
  const offset = circumference - progress * circumference;
  return (
    <svg width="50" height="50">
      <circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth="4"
        r={radius}
        cx="25"
        cy="25"
      />
      <circle
        stroke="#76c7c0"
        fill="transparent"
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx="25"
        cy="25"
      />
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="10">
        {Math.round(progress * 100)}%
      </text>
    </svg>
  );
};

export default ClientWorkoutSetupPage;
