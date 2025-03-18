import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const ClientWorkoutPage = () => {
  const { user } = useAuth();
  const clientId = user?.id;
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // For demonstration, fetch assignments for the client from your backend
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/assignments",
          {
            params: { patientId: clientId },
          }
        );
        setAssignments(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load assignments.");
      } finally {
        setLoading(false);
      }
    };
    if (clientId) fetchAssignments();
  }, [clientId]);

  // Handler to mark a set as complete
  const handleCompleteSet = (assignmentId) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) => {
        if (assignment.id === assignmentId) {
          // Increase completedSets, but ensure it doesn't exceed total sets
          const newCompletedSets = (assignment.completedSets || 0) + 1;
          return {
            ...assignment,
            completedSets: Math.min(newCompletedSets, assignment.sets),
          };
        }
        return assignment;
      })
    );
  };

  if (loading) return <p>Loading your workout...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (assignments.length === 0) return <p>No workouts assigned yet.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Assigned Workout</h2>
      <ul>
        {assignments.map((assignment) => {
          const totalSets = assignment.sets;
          const completedSets = assignment.completedSets || 0;
          const progressPercent = Math.round((completedSets / totalSets) * 100);
          return (
            <li
              key={assignment.id}
              style={{
                marginBottom: "1rem",
                border: "1px solid #ccc",
                padding: "1rem",
              }}
            >
              <p>
                <strong>Exercise ID:</strong> {assignment.exerciseId}
              </p>
              <p>
                <strong>Sets:</strong> {completedSets} / {totalSets}
              </p>
              <div
                style={{
                  backgroundColor: "#e0e0e0",
                  width: "100%",
                  height: "20px",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: "100%",
                    backgroundColor: "#76c7c0",
                    borderRadius: "10px",
                  }}
                ></div>
              </div>
              <button onClick={() => handleCompleteSet(assignment.id)}>
                Mark Set as Complete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClientWorkoutPage;
