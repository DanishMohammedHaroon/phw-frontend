import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./FeedbackComponent.scss";

const FeedbackComponent = () => {
  const { user } = useAuth();
  // Get the assigned physiotherapist's id from the client record
  const assignedPhysioId = user?.physiotherapistId;
  const [physioName, setPhysioName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch physiotherapist's name based on assignedPhysioId
  useEffect(() => {
    const fetchPhysioName = async () => {
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
        // Fallback: display the ID if fetching fails
        setPhysioName(assignedPhysioId);
      }
    };
    fetchPhysioName();
  }, [assignedPhysioId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!assignedPhysioId) {
      setError("You are not assigned to a physiotherapist.");
      return;
    }
    if (!feedback.trim()) {
      setError("Please enter your feedback.");
      return;
    }
    setError("");
    try {
      await axios.post("http://localhost:5050/api/feedback", {
        patientId: user.id,
        physiotherapistId: assignedPhysioId,
        status: "completed",
        comments: feedback.trim(),
      });
      setSuccessMsg("Feedback submitted successfully!");
      setFeedback("");
    } catch (err) {
      console.error("Error submitting feedback:", err.response?.data?.message);
      setError("Failed to submit feedback.");
    }
  };

  return (
    <div className="feedback">
      <h3 className="feedback__title">Submit Feedback</h3>
      <p className="feedback__description">
        Your feedback will be sent to:{" "}
        <strong>{physioName || assignedPhysioId}</strong>
      </p>
      <form className="feedback__form" onSubmit={handleSubmit}>
        <textarea
          className="feedback__textarea"
          placeholder="Enter your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="4"
          cols="50"
        />
        <button type="submit" className="feedback__button">
          Submit Feedback
        </button>
      </form>
      {error && <p className="feedback__error">{error}</p>}
      {successMsg && <p className="feedback__success">{successMsg}</p>}
    </div>
  );
};

export default FeedbackComponent;
