import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedbackComponent = () => {
  const [selectedPhysio, setSelectedPhysio] = useState("");
  const [feedback, setFeedback] = useState("");
  const [physios, setPhysios] = useState([]);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch physiotherapists (if available via an endpoint) or use a static list
  useEffect(() => {
    const fetchPhysios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/physiotherapists"
        );
        setPhysios(response.data);
      } catch (err) {
        // Fallback static list if endpoint is not available
        setPhysios([
          { id: 15, name: "Aisha Khan" },
          { id: 16, name: "Raj Patel" },
        ]);
      }
    };
    fetchPhysios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPhysio || !feedback.trim()) {
      setError("Please select a physiotherapist and enter your feedback.");
      return;
    }
    setError("");
    try {
      // Replace with actual patientId if available from auth context
      await axios.post("http://localhost:5050/api/feedback", {
        patientId: 1,
        assignmentId: null, // or a specific assignment id if feedback is assignment-specific
        status: "completed",
        comments: feedback.trim(),
      });
      setSuccessMsg("Feedback submitted successfully!");
      setFeedback("");
    } catch (err) {
      console.error(err);
      setError("Failed to submit feedback.");
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Submit Feedback</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Select Physiotherapist:{" "}
          <select
            value={selectedPhysio}
            onChange={(e) => setSelectedPhysio(e.target.value)}
          >
            <option value="">--Select Physiotherapist--</option>
            {physios.map((physio) => (
              <option key={physio.id} value={physio.id}>
                {physio.name}
              </option>
            ))}
          </select>
        </label>
        <br />
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
