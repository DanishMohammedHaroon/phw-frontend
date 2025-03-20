import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ExerciseDetailsPage.scss";

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

  if (loading)
    return (
      <p className="exercise-detail__loading">Loading exercise details...</p>
    );
  if (error) return <p className="exercise-detail__error">{error}</p>;
  if (!exercise)
    return <p className="exercise-detail__not-found">Exercise not found.</p>;

  return (
    <div className="exercise-detail">
      <h2 className="exercise-detail__title">{exercise.title}</h2>
      <p className="exercise-detail__description">
        <strong>Description:</strong> {exercise.description}
      </p>
      <p className="exercise-detail__difficulty">
        <strong>Difficulty (Level):</strong> {exercise.level}
      </p>
      {exercise.body_parts && (
        <div className="exercise-detail__body-parts">
          <p className="exercise-detail__primary">
            <strong>Primary Muscle Group:</strong>{" "}
            {Array.isArray(exercise.body_parts.primary)
              ? exercise.body_parts.primary.join(", ")
              : exercise.body_parts.primary}
          </p>
          {exercise.body_parts.secondary && (
            <p className="exercise-detail__secondary">
              <strong>Secondary Muscle Group:</strong>{" "}
              {Array.isArray(exercise.body_parts.secondary)
                ? exercise.body_parts.secondary.join(", ")
                : exercise.body_parts.secondary}
            </p>
          )}
        </div>
      )}
      {exercise.exercise_details && (
        <div className="exercise-detail__details">
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
      <p className="exercise-detail__category">
        <strong>Category:</strong> {exercise.category}
      </p>
      {exercise.images && exercise.images.length > 0 && (
        <div className="exercise-detail__images">
          <h3 className="exercise-detail__images-title">Images</h3>
          {exercise.images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:5050/images/${img}`}
              alt={exercise.title}
              className="exercise-detail__image"
            />
          ))}
        </div>
      )}
      <Link to="/exercises" className="exercise-detail__back-link">
        Back to Exercise Catalog
      </Link>
    </div>
  );
};

export default ExerciseDetail;
