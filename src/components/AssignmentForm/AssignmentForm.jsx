import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // our global auth context

// const AssignmentForm = ({ selectedClient, onAssignmentCreated }) => {
//   // Get the current physiotherapist's details from global state
//   const { user } = useAuth();
//    console.log("AssignmentForm: selectedClient =", selectedClient);
//   // Instead of a physiotherapist ID input auto-fill it from the logged-in user.
//   const physiotherapistId = user?.id || "";

//   const [patientId, setPatientId] = useState(selectedClient);
//   const [exerciseId, setExerciseId] = useState("");
//   const [repetitions, setRepetitions] = useState("");
//   const [sets, setSets] = useState("");
//   const [difficulty, setDifficulty] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [error, setError] = useState("");

//   // Sync the patientId with selectedClient when it changes
//   React.useEffect(() => {
//     setPatientId(selectedClient);
//   }, [selectedClient]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!patientId) {
//       setError("Please select a client first.");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         "http://localhost:5050/api/assignments",
//         {
//           physiotherapistId,
//           patientId,
//           exerciseId,
//           repetitions: parseInt(repetitions, 10),
//           sets: parseInt(sets, 10),
//           difficulty,
//           instructions,
//         }
//       );
//       onAssignmentCreated(response.data.assignment);
//       setError("");
//       // Clear form fields except physiotherapistId and patientId
//       setExerciseId("");
//       setRepetitions("");
//       setSets("");
//       setDifficulty("");
//       setInstructions("");
//     } catch (err) {
//       console.error("Error creating assignment:", err.response?.data?.message);
//       setError(err.response?.data?.message || "Failed to create assignment");
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "1rem",
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//         marginBottom: "1rem",
//       }}
//     >
//       <h3>Create Assignment</h3>
//       <p>
//         Physiotherapist:{" "}
//         <strong>
//           {user ? `${user.name} (ID: ${user.id})` : "Not logged in"}
//         </strong>
//       </p>
//       <p>Selected Client ID: {patientId || "None selected"}</p>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="text"
//             placeholder="Exercise ID"
//             value={exerciseId}
//             onChange={(e) => setExerciseId(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="number"
//             placeholder="Repetitions"
//             value={repetitions}
//             onChange={(e) => setRepetitions(e.target.value)}
//           />
//         </div>
//         <div>
//           <input
//             type="number"
//             placeholder="Sets"
//             value={sets}
//             onChange={(e) => setSets(e.target.value)}
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="Difficulty"
//             value={difficulty}
//             onChange={(e) => setDifficulty(e.target.value)}
//           />
//         </div>
//         <div>
//           <textarea
//             placeholder="Instructions"
//             value={instructions}
//             onChange={(e) => setInstructions(e.target.value)}
//           />
//         </div>
//         <button type="submit">Create Assignment</button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default AssignmentForm;

const AssignmentForm = ({ selectedClient, onAssignmentCreated }) => {
  const { user } = useAuth();
  const physiotherapistId = user?.id || "";

  const [patientId, setPatientId] = useState(selectedClient);
  const [exerciseId, setExerciseId] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [sets, setSets] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");

  // Sync selectedClient changes
  useEffect(() => {
    setPatientId(selectedClient);
  }, [selectedClient]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input Validation
    if (!patientId) {
      setError("Please select a client.");
      return;
    }
    if (!exerciseId || !exerciseId.trim()) {
      setError("Exercise ID is required.");
      return;
    }
    // Validate repetitions: must be provided, numeric, and > 0
    if (!repetitions || isNaN(repetitions) || parseInt(repetitions, 10) <= 0) {
      setError("Repetitions must be a positive number.");
      return;
    }
    // Validate sets: must be provided, numeric, and > 0
    if (!sets || isNaN(sets) || parseInt(sets, 10) <= 0) {
      setError("Sets must be a positive number.");
      return;
    }

    // If validation passes, clear any existing error
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5050/api/assignments",
        {
          physiotherapistId,
          patientId,
          exerciseId: exerciseId.trim(), // Trim whitespace for consistency
          repetitions: parseInt(repetitions, 10),
          sets: parseInt(sets, 10),
          difficulty,
          instructions,
        }
      );
      onAssignmentCreated(response.data.assignment);
      // Clear form fields except physiotherapistId and patientId
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
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "1rem",
      }}
    >
      <h3>Create Assignment</h3>
      <p>
        Physiotherapist:{" "}
        <strong>
          {user ? `${user.name} (ID: ${user.id})` : "Not logged in"}
        </strong>
      </p>
      <p>Selected Client ID: {patientId || "None selected"}</p>
      <form onSubmit={handleSubmit}>
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
