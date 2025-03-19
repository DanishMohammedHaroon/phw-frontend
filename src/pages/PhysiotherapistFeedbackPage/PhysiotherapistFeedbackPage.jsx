import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const PhysiotherapistFeedbackPage = () => {
  const { user } = useAuth();
  const physiotherapistId = user?.id;

  const [feedbacks, setFeedbacks] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch feedback for the physiotherapist
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/feedback/physio",
          {
            params: { physiotherapistId },
          }
        );
        setFeedbacks(response.data);
      } catch (err) {
        setError("Failed to load feedbacks.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (physiotherapistId) {
      fetchFeedbacks();
    }
  }, [physiotherapistId]);

  // Fetch clients assigned to this physiotherapist
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/users/clients"
        );
        // Filter clients by assigned physiotherapist
        const assignedClients = response.data.filter(
          (client) =>
            String(client.physiotherapistId) === String(physiotherapistId)
        );
        setClients(assignedClients);
      } catch (err) {
        setError("Failed to load clients.");
        console.error(err);
      }
    };
    if (physiotherapistId) {
      fetchClients();
    }
  }, [physiotherapistId]);

  // Filter feedback for the selected client
  const selectedClientFeedback = feedbacks.filter(
    (fb) => String(fb.patientId) === String(selectedClientId)
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Feedback for Your Clients</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div style={{ display: "flex", gap: "2rem" }}>
          {/* Client List */}
          <div style={{ flex: "1" }}>
            <h3>Your Clients</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {clients.map((client) => (
                <li
                  key={client.id}
                  style={{
                    marginBottom: "0.5rem",
                    cursor: "pointer",
                    color: selectedClientId === client.id ? "blue" : "inherit",
                  }}
                  onClick={() => setSelectedClientId(client.id)}
                >
                  {client.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Feedback Display */}
          <div style={{ flex: "2" }}>
            <h3>
              Feedback for{" "}
              {selectedClientId
                ? clients.find((c) => c.id === selectedClientId)?.name
                : "Select a client"}
            </h3>
            {selectedClientId ? (
              selectedClientFeedback.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {selectedClientFeedback.map((feedback) => (
                    <li
                      key={feedback.id}
                      style={{
                        borderBottom: "1px solid #ccc",
                        padding: "0.5rem 0",
                      }}
                    >
                      <p>
                        <strong>Status:</strong> {feedback.status}
                      </p>
                      <p>{feedback.comments}</p>
                      <p style={{ fontSize: "0.8rem", color: "#666" }}>
                        Posted on:{" "}
                        {new Date(feedback.timestamp).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No feedback available for this client.</p>
              )
            ) : (
              <p>Please select a client to view their feedback.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhysiotherapistFeedbackPage;
