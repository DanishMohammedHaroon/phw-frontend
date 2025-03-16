import React, { useEffect, useState } from "react";
import axios from "axios";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/assignments"
        );
        setAssignments(response.data);
      } catch (err) {
        console.error(
          "Error fetching assignments:",
          err.response?.data?.message
        );
        setError("Failed to load assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) return <p>Loading assignments...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h3>Assignment List</h3>
      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id}>
              <strong>Assignment ID:</strong> {assignment.id} |
              <strong> Exercise ID:</strong> {assignment.exerciseId} |
              <strong> Reps:</strong> {assignment.repetitions} |
              <strong> Sets:</strong> {assignment.sets}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignmentList;
