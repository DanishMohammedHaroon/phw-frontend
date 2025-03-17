import React, { useState, useEffect } from "react";
import axios from "axios";

const ProgressPage = () => {
  // For demo purposes, use a hard-coded patientId. In a real app, get this from context or props.
  const patientId = "1";
  const [progressLogs, setProgressLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProgressLogs = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/progress", {
          params: { patientId },
        });
        setProgressLogs(response.data);
      } catch (err) {
        console.error(
          "Error fetching progress logs:",
          err.response?.data?.message
        );
        setError("Failed to load progress logs");
      } finally {
        setLoading(false);
      }
    };

    fetchProgressLogs();
  }, [patientId]);

  if (loading) return <p>Loading progress logs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Progress Logs</h2>
      {progressLogs.length === 0 ? (
        <p>No progress logs found for patient ID {patientId}.</p>
      ) : (
        <ul>
          {progressLogs.map((log) => (
            <li key={log.id}>
              <strong>Date:</strong> {log.logDate} | <strong>Data:</strong>{" "}
              {log.performanceData}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProgressPage;
