// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// import HistoryModal from "../../components/HistoryModal/HistoryModal";

// const AssignmentManagerPage = () => {
//   const { user } = useAuth();
//   const physiotherapistId = user?.id;
//   const [selectedClient, setSelectedClient] = useState("");
//   // Replace the text input with a dropdown: exerciseId state will hold the selected exercise id.
//   const [selectedExercise, setSelectedExercise] = useState("");
//   const [sets, setSets] = useState("");
//   const [reps, setReps] = useState("");
//   const [workoutList, setWorkoutList] = useState([]);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   // Fetch the list of exercises for the dropdown
//   const [exercises, setExercises] = useState([]);
//   useEffect(() => {
//     const fetchExercises = async () => {
//       try {
//         const response = await axios.get("http://localhost:5050/api/exercises");
//         setExercises(response.data);
//       } catch (err) {
//         console.error("Error fetching exercises:", err.response?.data?.message);
//       }
//     };
//     fetchExercises();
//   }, []);

//   const handleAddExercise = () => {
//     if (!selectedExercise || !sets || !reps) {
//       setError("Please select an exercise and provide sets and reps.");
//       return;
//     }
//     setError("");
//     // Use the selectedExercise from the dropdown
//     const exerciseItem = {
//       exerciseId: selectedExercise,
//       sets: parseInt(sets, 10),
//       reps: parseInt(reps, 10),
//       completedSets: 0,
//     };
//     setWorkoutList((prev) => [...prev, exerciseItem]);
//     // Clear the inputs (but keep the selected exercise in the dropdown, if desired, or clear it)
//     // Here we clear it; adjust as needed.
//     setSelectedExercise("");
//     setSets("");
//     setReps("");
//   };

//   const handlePostWorkout = async () => {
//     console.log("Posting workout...", { selectedClient, workoutList });
//     if (!selectedClient) {
//       setError("Please select a client.");
//       return;
//     }
//     if (workoutList.length === 0) {
//       setError("Workout list is empty.");
//       return;
//     }
//     setError("");
//     try {
//       for (const exercise of workoutList) {
//         const payload = {
//           physiotherapistId,
//           patientId: selectedClient,
//           exerciseId: exercise.exerciseId,
//           repetitions: exercise.reps, // ensure this field name matches your backend (it expects 'repetitions')
//           sets: exercise.sets, // ensure this field name matches your backend (it expects 'sets')
//           difficulty: "N/A",
//           instructions: "",
//         };
//         console.log("Posting exercise payload:", payload);
//         await axios.post("http://localhost:5050/api/assignments", payload);
//       }
//       setSuccessMsg("Workout posted successfully!");
//       setWorkoutList([]);
//     } catch (err) {
//       console.error("Error posting workout:", err.response?.data || err);
//       setError("Failed to post workout.");
//     }
//   };
//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Workout Assignment Manager</h2>
//       <div>
//         <label>
//           Select Client:{" "}
//           <select
//             value={selectedClient}
//             onChange={(e) => setSelectedClient(e.target.value)}
//           >
//             <option value="">--Select Client--</option>
//             <option value="3">Miguel Rodriguez</option>
//             <option value="4">Li Wei</option>
//             <option value="5">Fatima Al-Hassan</option>
//             {/* Add more clients as needed */}
//           </select>
//         </label>
//       </div>
//       <hr />
//       <h3>Add Exercise</h3>
//       <div>
//         <label>
//           Exercise:{" "}
//           <select
//             value={selectedExercise}
//             onChange={(e) => setSelectedExercise(e.target.value)}
//           >
//             <option value="">--Select an Exercise--</option>
//             {exercises.map((ex) => (
//               <option key={ex.exercise_id} value={ex.exercise_id}>
//                 {ex.title}
//               </option>
//             ))}
//           </select>
//         </label>
//         <input
//           type="number"
//           placeholder="Sets"
//           value={sets}
//           onChange={(e) => setSets(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Reps"
//           value={reps}
//           onChange={(e) => setReps(e.target.value)}
//         />
//         <button onClick={handleAddExercise}>Add Exercise</button>
//       </div>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
//       <hr />
//       <h3>Workout List</h3>
//       {workoutList.length === 0 ? (
//         <p>No exercises added yet.</p>
//       ) : (
//         <ul>
//           {workoutList.map((item, index) => (
//             <li key={index}>
//               <strong>Exercise:</strong> {item.exerciseId} |{" "}
//               <strong>Sets:</strong> {item.sets} | <strong>Reps:</strong>{" "}
//               {item.reps}
//             </li>
//           ))}
//         </ul>
//       )}
//       <button onClick={handlePostWorkout}>Post Workout</button>
//       <button onClick={() => setModalIsOpen(true)}>Show History</button>
//       <HistoryModal
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)}
//         physiotherapistId={physiotherapistId}
//       />
//     </div>
//   );
// };

// export default AssignmentManagerPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import HistoryModal from "../../components/HistoryModal/HistoryModal";

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

  // Fetch the list of exercises for the dropdown
  const [exercises, setExercises] = useState([]);
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
        // Further filter if needed by physiotherapistId if your backend doesn't already do that:
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
    <div style={{ padding: "2rem" }}>
      <h2>Workout Assignment Manager</h2>
      <div>
        <label>
          Select Client:{" "}
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
      <hr />
      <h3>Add Exercise</h3>
      <div>
        <label>
          Exercise:{" "}
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
        </label>
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
      <hr />
      <h3>Workout List</h3>
      {workoutList.length === 0 ? (
        <p>No exercises added yet.</p>
      ) : (
        <ul>
          {workoutList.map((item, index) => (
            <li key={index}>
              <strong>Exercise:</strong> {item.exerciseId} |{" "}
              <strong>Sets:</strong> {item.sets} | <strong>Reps:</strong>{" "}
              {item.reps}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handlePostWorkout}>Post Workout</button>
      <button onClick={() => setModalIsOpen(true)}>Show History</button>
      <HistoryModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        physiotherapistId={physiotherapistId}
      />
    </div>
  );
};

export default AssignmentManagerPage;