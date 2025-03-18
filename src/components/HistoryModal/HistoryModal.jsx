import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#root");

const HistoryModal = ({ isOpen, onRequestClose, physiotherapistId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Extract fetchHistory into a callback so we can call it again after deletion
  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch all assignments from the generic endpoint
      const response = await axios.get("http://localhost:5050/api/assignments");
      let assignments = response.data;

      // Filter assignments belonging to this physiotherapist
      assignments = assignments.filter(
        (assignment) =>
          String(assignment.physiotherapistId) === String(physiotherapistId)
      );

      // Calculate the date two weeks ago
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

      // Filter assignments created in the last two weeks (using created_at or updated_at)
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

      // Convert grouped object to an array for display
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

  // Handler to delete an assignment by id
  const handleDelete = async (assignmentId) => {
    try {
      await axios.delete(
        `http://localhost:5050/api/assignments/${assignmentId}`
      );
      // Re-fetch history after deletion
      fetchHistory();
    } catch (error) {
      console.error("Error deleting assignment:", error);
      setError("Failed to delete assignment.");
    }
  };

  // Helper to calculate progress percentage for an assignment
  const getProgressPercentage = (assignment) => {
    const totalSets = assignment.sets;
    const completedSets = assignment.completedSets || 0;
    return totalSets ? Math.round((completedSets / totalSets) * 100) : 0;
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
            <h3>Client ID: {clientId}</h3>
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
                      <strong>Exercise:</strong> {assignment.exerciseId} |{" "}
                      <strong>Sets:</strong> {assignment.sets} |{" "}
                      <strong>Reps:</strong> {assignment.repetitions}
                    </div>
                    <div>
                      <strong>Progress:</strong>{" "}
                      {getProgressPercentage(assignment)}%
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
                    <div
                      style={{ position: "absolute", top: "4px", right: "4px" }}
                    >
                      <button
                        onClick={() => handleDelete(assignment.id)}
                        style={{
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
                    </div>
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
