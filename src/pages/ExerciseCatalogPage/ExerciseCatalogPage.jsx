import "./ExerciseCatalogPage.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ExerciseCatalog = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/exercises");
        setExercises(response.data);
      } catch (err) {
        setError("Failed to load exercises.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (loading) {
    return <p>Loading exercises...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Exercise Catalog</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.exercise_id}>
            <h3>{exercise.title}</h3>
            <p>{exercise.description}</p>
            <Link to={`/exercise/${exercise.exercise_id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseCatalog;
