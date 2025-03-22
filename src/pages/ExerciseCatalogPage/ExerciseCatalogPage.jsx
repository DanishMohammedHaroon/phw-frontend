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
    return <p className="exercise-catalog__loading">Loading exercises...</p>;
  }

  if (error) {
    return <p className="exercise-catalog__error">{error}</p>;
  }

  return (
    <div className="exercise-catalog">
      <h2 className="exercise-catalog__title">Exercise Catalog</h2>
      <ul className="exercise-catalog__list">
        {exercises.map((exercise) => (
          <li key={exercise.exercise_id} className="exercise-catalog__item">
            <h3 className="exercise-catalog__item-title">{exercise.title}</h3>
            <p className="exercise-catalog__item-description">
              {exercise.description}
            </p>
            <Link
              to={`/exercise/${exercise.exercise_id}`}
              className="exercise-catalog__item-link"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseCatalog;
