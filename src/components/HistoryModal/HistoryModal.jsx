import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#root");

const HistoryModal = ({ isOpen, onRequestClose, physiotherapistId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exerciseMapping, setExerciseMapping] = useState({});
  const [clientMapping, setClientMapping] = useState({});

  // Fetch all assignments and filter them on the client
  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch all assignments from the generic endpoint
      const response = await axios.get("http://localhost:5050/api/assignments");
      let assignments = response.data;

      // Filter assignments for the current physiotherapist
      assignments = assignments.filter(
        (assignment) =>
          String(assignment.physiotherapistId) === String(physiotherapistId)
      );

      // Calculate the date two weeks ago
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

      // Filter assignments from the last two weeks
      assignments = assignments.filter((assignment) => {
        const date = assignment.created_at
          ? new Date(assignment.created_at)
          : new Date(assignment.updated_at);
        return date >= twoWeeksAgo;
      });

      // Group assignments by client (patientId)
      const grouped = assignments.reduce((acc, assignment) => {
        const clientId = assignment.patientId;
        if (!acc[clientId]) acc[clientId] = [];
        acc[clientId].push(assignment);
        return acc;
      }, {});
      setHistory(Object.entries(grouped));
      setError("");
    } catch (err) {
      console.error("Error fetching history:", err.response?.data?.message);
      setError("Failed to load history.");
    } finally {
      setLoading(false);
    }
  }, [physiotherapistId]);

  useEffect(() => {
    if (isOpen && physiotherapistId) {
      fetchHistory();
    }
  }, [isOpen, physiotherapistId, fetchHistory]);

  // Fetch exercises to build a mapping from exercise_id to title
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/exercises");
        const mapping = {};
        response.data.forEach((ex) => {
          mapping[ex.exercise_id] = ex.title;
        });
        setExerciseMapping(mapping);
      } catch (err) {
        console.error("Error fetching exercises for mapping:", err);
      }
    };
    fetchExercises();
  }, []);

  // Fetch clients to build a mapping from client id to name
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/users/clients");
        const mapping = {};
        response.data.forEach((client) => {
          mapping[client.id] = client.name;
        });
        setClientMapping(mapping);
      } catch (err) {
        console.error("Error fetching clients for mapping:", err.response?.data?.message);
      }
    };
    fetchClients();
  }, []);

  // Helper to calculate progress percentage (if your assignment tracks completedSets)
  const getProgressPercentage = (assignment) => {
    const totalSets = assignment.sets;
    const completedSets = assignment.completedSets || 0;
    return totalSets ? Math.round((completedSets / totalSets) * 100) : 0;
  };

  // Handler to delete an assignment
  const handleDelete = async (assignmentId) => {
    try {
      await axios.delete(`http://localhost:5050/api/assignments/${assignmentId}`);
      // Re-fetch history after deletion
      fetchHistory();
    } catch (error) {
      console.error("Error deleting assignment:", error);
      setError("Failed to delete assignment.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Assignment History"
      style={{
        content: { maxWidth: "600px", margin: "auto", padding: "2rem" },
      }}
    >
      <h2>Assignment History (Last 2 Weeks)</h2>
      <button onClick={onRequestClose} style={{ float: "right" }}>
        Close
      </button>
      {loading ? (
        <p>Loading history...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        history.map(([clientId, assignments]) => (
          <div key={clientId} style={{ marginBottom: "1rem" }}>
            <h3>Client: {clientMapping[clientId] || clientId}</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {assignments
                .sort(
                  (a, b) =>
                    new Date(b.created_at || b.updated_at) -
                    new Date(a.created_at || a.updated_at)
                )
                .map((assignment) => (
                  <li
                    key={assignment.id}
                    style={{
                      position: "relative",
                      marginBottom: "1rem",
                      padding: "0.5rem",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  >
                    <div>
                      <strong>Exercise:</strong>{" "}
                      {exerciseMapping[assignment.exerciseId] ||
                        assignment.exerciseId}{" "}
                      | <strong>Sets:</strong> {assignment.sets} |{" "}
                      <strong>Reps:</strong> {assignment.repetitions}
                    </div>
                    <div>
                      <strong>Progress:</strong> {getProgressPercentage(assignment)}%
                      <div
                        style={{
                          background: "#e0e0e0",
                          borderRadius: "5px",
                          height: "8px",
                          width: "100%",
                          marginTop: "4px",
                        }}
                      >
                        <div
                          style={{
                            width: `${getProgressPercentage(assignment)}%`,
                            background: "#76c7c0",
                            height: "100%",
                            borderRadius: "5px",
                          }}
                        ></div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(assignment.id)}
                      style={{
                        position: "absolute",
                        top: "4px",
                        right: "4px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        color: "red",
                      }}
                      title="Delete assignment"
                    >
                      &times;
                    </button>
                    <div>
                      <small>
                        Posted on:{" "}
                        {new Date(
                          assignment.created_at || assignment.updated_at
                        ).toLocaleDateString()}
                      </small>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))
      )}
    </Modal>
  );
};

export default HistoryModal;
