import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import FeedbackComponent from "../../components/FeedbackComponent/FeedbackComponent";
import "./ClientWorkoutSetupPage.scss";

const ClientWorkoutSetupPage = () => {
  const { user } = useAuth();
  const clientId = user?.id;
  const assignedPhysioId = user?.physiotherapistId;

  const [selectedDays, setSelectedDays] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [exerciseMapping, setExerciseMapping] = useState({});
  const [physioName, setPhysioName] = useState("");
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
        const data = response.data.map((assignment) => ({
          ...assignment,
          completedSets: assignment.completedSets || 0,
        }));
        setAssignments(data);
      } catch (err) {
        setError("Failed to load assignments.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [clientId]);

  // Fetch exercises to build a mapping (exercise id -> title)
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/exercises");
        const mapping = {};
        response.data.forEach((ex) => {
          mapping[ex.exercise_id || ex.id] = ex.title;
        });
        setExerciseMapping(mapping);
      } catch (err) {
        console.error("Error fetching exercises:", err.response?.data?.message);
      }
    };
    fetchExercises();
  }, []);

  // Fetch physiotherapist info to get the name
  useEffect(() => {
    const fetchPhysio = async () => {
      if (!assignedPhysioId) return;
      try {
        const response = await axios.get(
          `http://localhost:5050/api/physiotherapists/${assignedPhysioId}`
        );
        setPhysioName(response.data.name);
      } catch (err) {
        console.error(
          "Error fetching physiotherapist info:",
          err.response?.data?.message
        );
        setPhysioName(assignedPhysioId);
      }
    };
    fetchPhysio();
  }, [assignedPhysioId]);

  // Handler for toggling workout days
  const handleDayToggle = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleCompleteSet = async (assignmentId) => {
    const assignment = assignments.find((a) => a.id === assignmentId);
    if (!assignment) return;
    const newCompleted = Math.min(
      assignment.completedSets + 1,
      assignment.sets
    );
    try {
      await axios.put(
        `http://localhost:5050/api/assignments/${assignmentId}/progress`,
        { newCompleted }
      );
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === assignmentId ? { ...a, completedSets: newCompleted } : a
        )
      );
    } catch (err) {
      console.error("Error updating progress:", err.response?.data || err);
    }
  };

  return (
    <div className="client-workout-setup">
      <h2 className="client-workout-setup__title">Your Workout Setup</h2>

      <hr className="client-workout-setup__divider" />

      {/* Workout List */}
      <div className="client-workout-setup__workout-container">
        <h3 className="client-workout-setup__workout-title">
          Your Assigned Workout
        </h3>
        {loading ? (
          <p className="client-workout-setup__loading">
            Loading your workout...
          </p>
        ) : error ? (
          <p className="client-workout-setup__error">{error}</p>
        ) : assignments.length === 0 ? (
          <p className="client-workout-setup__empty">
            No workouts assigned yet.
          </p>
        ) : (
          <ul className="client-workout-setup__workout-list">
            {assignments.map((assignment) => (
              <li
                key={assignment.id}
                className="client-workout-setup__workout-item"
              >
                <div className="client-workout-setup__workout-info">
                  <h4 className="client-workout-setup__workout-exercise">
                    {exerciseMapping[assignment.exerciseId] ||
                      assignment.exerciseId}
                  </h4>
                  <p className="client-workout-setup__workout-details">
                    Sets: {assignment.completedSets} / {assignment.sets} | Reps:{" "}
                    {assignment.repetitions}
                  </p>
                </div>
                <RoundProgressTracker
                  totalSets={assignment.sets}
                  completedSets={assignment.completedSets}
                  onClick={() => handleCompleteSet(assignment.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <hr className="client-workout-setup__divider" />

      {/* Feedback Section */}
      <FeedbackComponent physiotherapistName={physioName} />
    </div>
  );
};

// A simple round progress tracker using an SVG circle with an onClick handler
const RoundProgressTracker = ({ totalSets, completedSets, onClick }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = totalSets > 0 ? completedSets / totalSets : 0;
  const offset = circumference - progress * circumference;
  return (
    <svg
      width="50"
      height="50"
      onClick={onClick}
      className="round-progress-tracker"
    >
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
