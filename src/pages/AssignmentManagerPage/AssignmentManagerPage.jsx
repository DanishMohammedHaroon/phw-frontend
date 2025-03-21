import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import HistoryModal from "../../components/HistoryModal/HistoryModal";
import "./AssignmentManagerPage.scss";

const AssignmentManagerPage = () => {
  const { user } = useAuth();
  const physiotherapistId = user?.id;
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [workoutList, setWorkoutList] = useState([]);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [exercises, setExercises] = useState([]);

  // Fetch the list of exercises for the dropdown
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/exercises");
        setExercises(response.data);
      } catch (err) {
        console.error("Error fetching exercises:", err.response?.data?.message);
      }
    };
    fetchExercises();
  }, []);

  // Fetch only clients using the new endpoint
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/users/clients"
        );
        const assignedClients = response.data.filter(
          (u) => String(u.physiotherapistId) === String(physiotherapistId)
        );
        setClients(assignedClients);
      } catch (err) {
        console.error("Error fetching clients:", err.response?.data?.message);
      }
    };

    if (physiotherapistId) {
      fetchClients();
    }
  }, [physiotherapistId]);

  const handleAddExercise = () => {
    if (!selectedExercise || !sets || !reps) {
      setError("Please select an exercise and provide sets and reps.");
      return;
    }
    setError("");
    const exerciseItem = {
      exerciseId: selectedExercise, // using exercise_id from the database
      sets: parseInt(sets, 10),
      reps: parseInt(reps, 10),
      completedSets: 0,
    };
    setWorkoutList((prev) => [...prev, exerciseItem]);
    setSelectedExercise("");
    setSets("");
    setReps("");
  };

  const handlePostWorkout = async () => {
    if (!selectedClient) {
      setError("Please select a client.");
      return;
    }
    if (workoutList.length === 0) {
      setError("Workout list is empty.");
      return;
    }
    setError("");
    try {
      for (const exercise of workoutList) {
        const payload = {
          physiotherapistId,
          patientId: selectedClient,
          exerciseId: exercise.exerciseId,
          repetitions: exercise.reps,
          sets: exercise.sets,
          difficulty: "N/A",
          instructions: "",
        };
        await axios.post("http://localhost:5050/api/assignments", payload);
      }
      setSuccessMsg("Workout posted successfully!");
      setWorkoutList([]);
    } catch (err) {
      console.error("Error posting workout:", err.response?.data || err);
      setError("Failed to post workout.");
    }
  };

  return (
    <div className="assignment-manager">
      <h2 className="assignment-manager__title">Workout Assignment Manager</h2>

      <div className="assignment-manager__client-select">
        <label>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            <option value="">--Select Client--</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <hr className="assignment-manager__divider" />

      <h3 className="assignment-manager__section-title">Add Exercise</h3>
      <div className="assignment-manager__add-exercise">
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
          >
            <option value="">--Select an Exercise--</option>
            {exercises.map((ex) => (
              <option key={ex.exercise_id} value={ex.exercise_id}>
                {ex.title}
              </option>
            ))}
          </select>
        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        <button onClick={handleAddExercise}>Add Exercise</button>
      </div>

      {error && <p className="assignment-manager__error">{error}</p>}
      {successMsg && (
        <p className="assignment-manager__success">{successMsg}</p>
      )}

      <hr className="assignment-manager__divider" />

      <h3 className="assignment-manager__section-title">Workout List</h3>
      {workoutList.length === 0 ? (
        <p className="assignment-manager__empty-list">
          No exercises added yet.
        </p>
      ) : (
        <ul className="assignment-manager__workout-list">
          {workoutList.map((item, index) => (
            <li key={index} className="assignment-manager__workout-item">
              <strong>Exercise:</strong> {item.exerciseId} |{" "}
              <strong>Sets:</strong> {item.sets} | <strong>Reps:</strong>{" "}
              {item.reps}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handlePostWorkout}
        className="assignment-manager__post-button"
      >
        Post Workout
      </button>
      <button
        onClick={() => setModalIsOpen(true)}
        className="assignment-manager__history-button"
      >
        Show History
      </button>
      <HistoryModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        physiotherapistId={physiotherapistId}
      />
    </div>
  );
};

export default AssignmentManagerPage;
