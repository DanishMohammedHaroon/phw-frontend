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
        // Default completedSets to 0 if missing
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
          // Assuming ex.exercise_id exists; fallback to ex.id if needed
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
   // Find the assignment from local state
   const assignment = assignments.find((a) => a.id === assignmentId);
   if (!assignment) return;

   const newCompleted = Math.min(assignment.completedSets + 1, assignment.sets);

   try {
     // Send a PUT request to update the progress in the backend
     await axios.put(
       `http://localhost:5050/api/assignments/${assignmentId}/progress`,
       {
         newCompleted, // The new progress count
       }
     );
     // If successful, update local state
     setAssignments((prev) =>
       prev.map((a) =>
         a.id === assignmentId ? { ...a, completedSets: newCompleted } : a
       )
     );
   } catch (err) {
     console.error("Error updating progress:", err.response?.data || err);
     // Optionally, display an error message to the user
   }
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
                  {/* Display exercise title using the mapping */}
                  <h4>
                    {exerciseMapping[assignment.exerciseId] ||
                      assignment.exerciseId}
                  </h4>
                  <p>
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

      <hr />

      {/* Feedback Section */}
      <FeedbackComponent
        physiotherapistName={physioName} // Pass the physio name for display in the component
      />
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
    <svg width="50" height="50" onClick={onClick} style={{ cursor: "pointer" }}>
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
