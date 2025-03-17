import React, { useState } from "react";
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";

const FeedbackPage = () => {
  // For demo purposes, we hard-code these values.
  // In a real app, you'd get these from your app state or routing parameters.
  const assignmentId = 1;
  const patientId = 1;

  const [feedbacks, setFeedbacks] = useState([]);

  const handleFeedbackSubmitted = (newFeedback) => {
    // Optionally update the feedback list
    setFeedbacks([...feedbacks, newFeedback]);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Assignment Feedback</h2>
      <FeedbackForm
        assignmentId={assignmentId}
        patientId={patientId}
        onFeedbackSubmitted={handleFeedbackSubmitted}
      />
      <h3>Submitted Feedbacks</h3>
      <ul>
        {feedbacks.map((fb) => (
          <li key={fb.id}>
            <strong>Status:</strong> {fb.status} | <strong>Comments:</strong>{" "}
            {fb.comments}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackPage;
