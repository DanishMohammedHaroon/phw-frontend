import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ExerciseDetail = () => {
  const { id } = useParams(); // 'id' corresponds to exercise_id
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
      <h2>{exercise.title}</h2>
      <p>
        <strong>Description:</strong> {exercise.description}
      </p>
      <p>
        <strong>Difficulty (Level):</strong> {exercise.level}
      </p>
      {exercise.body_parts && (
        <div>
          <p>
            <strong>Primary Muscle Group:</strong>{" "}
            {Array.isArray(exercise.body_parts.primary)
              ? exercise.body_parts.primary.join(", ")
              : exercise.body_parts.primary}
          </p>
          {exercise.body_parts.secondary && (
            <p>
              <strong>Secondary Muscle Group:</strong>{" "}
              {Array.isArray(exercise.body_parts.secondary)
                ? exercise.body_parts.secondary.join(", ")
                : exercise.body_parts.secondary}
            </p>
          )}
        </div>
      )}
      {exercise.exercise_details && (
        <div>
          <p>
            <strong>Force:</strong> {exercise.exercise_details.force}
          </p>
          <p>
            <strong>Mechanic:</strong> {exercise.exercise_details.mechanic}
          </p>
          <p>
            <strong>Equipment:</strong> {exercise.exercise_details.equipment}
          </p>
        </div>
      )}
      <p>
        <strong>Category:</strong> {exercise.category}
      </p>
      {exercise.images && exercise.images.length > 0 && (
        <div>
          <h3>Images</h3>
          {exercise.images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:5050/images/${img}`}
              alt={exercise.title}
              style={{ maxWidth: "100%", marginBottom: "1rem" }}
            />
          ))}
        </div>
      )}
      <Link to="/exercises">Back to Exercise Catalog</Link>
    </div>
  );
};

export default ExerciseDetail;
