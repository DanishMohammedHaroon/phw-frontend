import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const FeedbackComponent = () => {
  const { user } = useAuth();
  // Get the assigned physiotherapist's id from the client's record
  const assignedPhysioId = user?.physiotherapistId;
  const [physioName, setPhysioName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch physiotherapist info (e.g., name) using the assignedPhysioId
  useEffect(() => {
    const fetchPhysioInfo = async () => {
      if (assignedPhysioId) {
        try {
          // Assumes an endpoint exists to fetch a single physiotherapist by id
          const response = await axios.get(
            `http://localhost:5050/api/physiotherapists/${assignedPhysioId}`
          );
          setPhysioName(response.data.name);
        } catch (err) {
          console.error(
            "Error fetching physiotherapist info:",
            err.response?.data?.message
          );
          // Fallback: display the id if fetching fails
          setPhysioName(assignedPhysioId);
        }
      }
    };
    fetchPhysioInfo();
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
      // Use the client's id from AuthContext (assumed to be user.id)
      await axios.post("http://localhost:5050/api/feedback", {
        patientId: user.id,
        physiotherapistId: assignedPhysioId,
        status: "completed", // or another status as needed
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
    <div style={{ marginTop: "2rem" }}>
      <h3>Submit Feedback</h3>
      {assignedPhysioId ? (
        <p>
          Your feedback will be sent to:{" "}
          <strong>{physioName || assignedPhysioId}</strong>
        </p>
      ) : (
        <p style={{ color: "red" }}>
          You are not assigned to any physiotherapist.
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit">Submit Feedback</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
    </div>
  );
};

export default FeedbackComponent;
