import React, { useState } from "react";
import axios from "axios";

const FeedbackForm = ({ assignmentId, patientId, onFeedbackSubmitted }) => {
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!assignmentId || !patientId || !status) {
      setError("Assignment ID, patient ID, and feedback status are required.");
      return;
    }
    setError("");

    try {
      const response = await axios.post("http://localhost:5050/api/feedback", {
        assignmentId,
        patientId,
        status,
        comments,
      });
      console.log("Feedback submitted:", response.data.feedback);
      onFeedbackSubmitted && onFeedbackSubmitted(response.data.feedback);
      // Clear the form
      setStatus("");
      setComments("");
    } catch (err) {
      console.error("Error submitting feedback:", err.response?.data?.message);
      setError(err.response?.data?.message || "Failed to submit feedback");
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "1rem 0",
      }}
    >
      <h3>Submit Feedback</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">--Select Status--</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
              <option value="needs review">Needs Review</option>
            </select>
          </label>
        </div>
        <div>
          <textarea
            placeholder="Comments (optional)"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FeedbackForm;
