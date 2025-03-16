import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ExerciseCatalogPage.scss";

const ExerciseCatalogPage = () => {
// throw new Error("Simulated error in ExerciseCatalogPage");

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch exercises from the backend
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/exercises");
        setExercises(response.data);
      } catch (err) {
        console.error("Error fetching exercises:", err);
        setError("Failed to load exercises");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (loading) {
    return (
      <p style={{ textAlign: "center", padding: "2rem" }}>
        Loading exercises...
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", padding: "2rem", color: "red" }}>
        {error}
      </p>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Exercise Catalog</h2>
      <p>Browse our list of exercises below:</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {exercises.map((exercise) => (
          <li
            key={exercise.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            <h3>{exercise.name}</h3>
            <p>
              <strong>Target Muscle:</strong> {exercise.muscle}
            </p>
            <p>
              <strong>Difficulty:</strong> {exercise.difficulty}
            </p>
            <p>{exercise.instructions}</p>
            <Link to={`/exercise/${exercise.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseCatalogPage;
