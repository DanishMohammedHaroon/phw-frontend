import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./PhysiotherapistFeedbackPage.scss";

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
    <div className="physio-feedback">
      <h2 className="physio-feedback__title">Feedback for Your Clients</h2>
      {loading ? (
        <p className="physio-feedback__loading">Loading...</p>
      ) : error ? (
        <p className="physio-feedback__error">{error}</p>
      ) : (
        <div className="physio-feedback__container">
          {/* Client List */}
          <div className="physio-feedback__clients">
            <h3 className="physio-feedback__clients-title">Your Clients</h3>
            <ul className="physio-feedback__client-list">
              {clients.map((client) => (
                <li
                  key={client.id}
                  className={`physio-feedback__client-item ${
                    selectedClientId === client.id
                      ? "physio-feedback__client-item--selected"
                      : ""
                  }`}
                  onClick={() => setSelectedClientId(client.id)}
                >
                  {client.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Feedback Display */}
          <div className="physio-feedback__display">
            <h3 className="physio-feedback__display-title">
              Feedback for{" "}
              {selectedClientId
                ? clients.find((c) => c.id === selectedClientId)?.name
                : "Select a client"}
            </h3>
            {selectedClientId ? (
              selectedClientFeedback.length > 0 ? (
                <ul className="physio-feedback__feedback-list">
                  {selectedClientFeedback.map((feedback) => (
                    <li
                      key={feedback.id}
                      className="physio-feedback__feedback-item"
                    >
                      <p>
                        <strong>Status:</strong> {feedback.status}
                      </p>
                      <p>{feedback.comments}</p>
                      <p className="physio-feedback__timestamp">
                        Posted on:{" "}
                        {new Date(feedback.timestamp).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="physio-feedback__no-feedback">
                  No feedback available for this client.
                </p>
              )
            ) : (
              <p className="physio-feedback__select-client">
                Please select a client to view their feedback.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhysiotherapistFeedbackPage;
