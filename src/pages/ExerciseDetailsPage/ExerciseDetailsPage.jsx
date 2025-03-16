import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ExerciseDetail = () => {
  const { id } = useParams(); // Extract exercise id from URL
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/api/exercises/${id}`
        );
        setExercise(response.data);
      } catch (err) {
        console.error("Error fetching exercise:", err);
        setError("Failed to load exercise details.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  if (loading) return <p>Loading exercise details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!exercise) return <p>Exercise not found.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{exercise.name}</h2>
      <p>
        <strong>Target Muscle:</strong> {exercise.muscle}
      </p>
      <p>
        <strong>Difficulty:</strong> {exercise.difficulty}
      </p>
      <p>
        <strong>Instructions:</strong> {exercise.instructions}
      </p>
      <Link to="/exercises">Back to Exercise Catalog</Link>
    </div>
  );
};

export default ExerciseDetail;
