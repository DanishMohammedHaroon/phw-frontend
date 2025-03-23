import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./HistoryModal.scss";

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
  
      const response = await axios.get("http://localhost:5050/api/assignments");
      let assignments = response.data;

      assignments = assignments.filter(
        (assignment) =>
          String(assignment.physiotherapistId) === String(physiotherapistId)
      );

      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

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

  // GET exercises to build a mapping from exercise_id to title
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

  //GET clients to build a mapping from client id to name
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/users/clients"
        );
        const mapping = {};
        response.data.forEach((client) => {
          mapping[client.id] = client.name;
        });
        setClientMapping(mapping);
      } catch (err) {
        console.error(
          "Error fetching clients for mapping:",
          err.response?.data?.message
        );
      }
    };
    fetchClients();
  }, []);

  // Helper to calculate progress percentage
  const getProgressPercentage = (assignment) => {
    const totalSets = assignment.sets;
    const completedSets = assignment.completedSets || 0;
    return totalSets ? Math.round((completedSets / totalSets) * 100) : 0;
  };

  // Handler to DELETE an assignment
  const handleDelete = async (assignmentId) => {
    try {
      await axios.delete(
        `http://localhost:5050/api/assignments/${assignmentId}`
      );

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
      className="history-modal"
      overlayClassName="history-modal__overlay"
    >
      <h2 className="history-modal__title">
        Assignment History (Last 2 Weeks)
      </h2>
      <button onClick={onRequestClose} className="history-modal__close-btn">
        Close
      </button>
      {loading ? (
        <p className="history-modal__loading">Loading history...</p>
      ) : error ? (
        <p className="history-modal__error">{error}</p>
      ) : history.length === 0 ? (
        <p className="history-modal__no-history">No history found.</p>
      ) : (
        history.map(([clientId, assignments]) => (
          <div key={clientId} className="history-modal__client-group">
            <h3 className="history-modal__client-title">
              Client: {clientMapping[clientId] || clientId}
            </h3>
            <ul className="history-modal__assignment-list">
              {assignments
                .sort(
                  (a, b) =>
                    new Date(b.created_at || b.updated_at) -
                    new Date(a.created_at || a.updated_at)
                )
                .map((assignment) => (
                  <li
                    key={assignment.id}
                    className="history-modal__assignment-item"
                  >
                    <div className="history-modal__assignment-info">
                      <strong>Exercise:</strong>{" "}
                      {exerciseMapping[assignment.exerciseId] ||
                        assignment.exerciseId}{" "}
                      | <strong>Sets:</strong> {assignment.sets} |{" "}
                      <strong>Reps:</strong> {assignment.repetitions}
                    </div>
                    <div className="history-modal__progress-section">
                      <strong>Progress:</strong>{" "}
                      {getProgressPercentage(assignment)}%
                      <div className="history-modal__progress-bar">
                        <div
                          className="history-modal__progress"
                          style={{
                            width: `${getProgressPercentage(assignment)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(assignment.id)}
                      className="history-modal__delete-btn"
                      title="Delete assignment"
                    >
                      &times;
                    </button>
                    <div className="history-modal__timestamp">
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
