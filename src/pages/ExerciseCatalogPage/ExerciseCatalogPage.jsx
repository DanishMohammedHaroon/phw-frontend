import React from "react";
import { Link } from "react-router-dom";
import "./ExerciseCatalogPage.scss";

// Sample data for exercises
const sampleExercises = [
  {
    id: 1,
    name: "Incline Hammer Curls",
    muscle: "Biceps",
    difficulty: "Beginner",
    instructions: "Sit on an incline bench with a dumbbell in each hand.",
  },
  {
    id: 2,
    name: "Wide-Grip Barbell Curl",
    muscle: "Biceps",
    difficulty: "Beginner",
    instructions:
      "Stand with your feet shoulder-width apart and curl the barbell.",
  },
  {
    id: 3,
    name: "Triceps Dip",
    muscle: "Triceps",
    difficulty: "Intermediate",
    instructions: "Use parallel bars or a bench to perform dips.",
  },
];

const ExerciseCatalog = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Exercise Catalog</h2>
      <p>Browse our list of exercises below:</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {sampleExercises.map((exercise) => (
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

export default ExerciseCatalog;
