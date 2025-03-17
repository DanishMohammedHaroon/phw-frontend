import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // our global auth context

const AssignmentForm = ({ onAssignmentCreated }) => {
  // Get the current physiotherapist's details from global state
  const { user } = useAuth();
  
  // Instead of a physiotherapist ID input, we auto-fill it from the logged-in user.
  const physiotherapistId = user?.id || "";

  // Sample clients data for dropdown
  const sampleClients = [
    { id: 101, name: "Alice Smith" },
    { id: 102, name: "Bob Johnson" },
    { id: 103, name: "Charlie Brown" },
  ];

  const [patientId, setPatientId] = useState("");
  const [exerciseId, setExerciseId] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [sets, setSets] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5050/api/assignments", {
        physiotherapistId, // auto-filled from global state
        patientId,
        exerciseId,
        repetitions: parseInt(repetitions, 10),
        sets: parseInt(sets, 10),
        difficulty,
        instructions,
      });
      onAssignmentCreated(response.data.assignment);
      setError("");
      // Clear form fields except physiotherapistId (which comes from context)
      setPatientId("");
      setExerciseId("");
      setRepetitions("");
      setSets("");
      setDifficulty("");
      setInstructions("");
    } catch (err) {
      console.error("Error creating assignment:", err.response?.data?.message);
      setError(err.response?.data?.message || "Failed to create assignment");
    }
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", marginBottom: "1rem" }}>
      <h3>Create Assignment</h3>
      <form onSubmit={handleSubmit}>
        {/* Display physiotherapist's name and ID */}
        <div>
          <label>
            Physiotherapist:
            <strong>{user ? `${user.name} (ID: ${user.id})` : "Not logged in"}</strong>
          </label>
        </div>

        {/* Client selection dropdown */}
        <div>
          <label htmlFor="clientSelect">Select Client:</label>
          <select
            id="clientSelect"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          >
            <option value="">--Select a Client--</option>
            {sampleClients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Exercise ID"
            value={exerciseId}
            onChange={(e) => setExerciseId(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Repetitions"
            value={repetitions}
            onChange={(e) => setRepetitions(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        <button type="submit">Create Assignment</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AssignmentForm;
