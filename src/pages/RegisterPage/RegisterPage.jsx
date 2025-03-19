import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [physioList, setPhysioList] = useState([]);
  const [selectedPhysio, setSelectedPhysio] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  // Fetch physiotherapists only if role is client
  useEffect(() => {
    if (role === "client") {
      const fetchPhysios = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5050/api/physiotherapists"
          );
          setPhysioList(response.data);
        } catch (err) {
          console.error(
            "Error fetching physiotherapists:",
            err.response?.data?.message
          );
          setError("Failed to load physiotherapists.");
        }
      };
      fetchPhysios();
    } else {
      // Clear physiotherapist selection if role is not client
      setPhysioList([]);
      setSelectedPhysio("");
    }
  }, [role]);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic input validation
    if (!name.trim() || !email.trim() || !password.trim() || !role) {
      setError("All fields are required.");
      return;
    }
    // If role is client, ensure a physiotherapist is selected
    if (role === "client" && !selectedPhysio) {
      setError("Please select a physiotherapist.");
      return;
    }

    setError("");
    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        password, // Consider hashing on backend for production
        role,
        // For clients, include the selected physiotherapist's ID; for physios, leave undefined or null.
        physiotherapistId: role === "client" ? Number(selectedPhysio) : null,
      };

      const response = await axios.post(
        "http://localhost:5050/api/auth/register",
        payload
      );
      setSuccessMsg("Registration successful! Redirecting to login...");

      // Optionally clear form fields
      setName("");
      setEmail("");
      setPassword("");
      setRole("client");
      setSelectedPhysio("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err.response?.data);
      const errMsg =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errMsg);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="client">Client</option>
            <option value="physio_therapist">Physiotherapist</option>
          </select>
        </div>
        {role === "client" && (
          <div>
            <label>
              Select Your Physiotherapist:{" "}
              <select
                value={selectedPhysio}
                onChange={(e) => setSelectedPhysio(e.target.value)}
              >
                <option value="">--Select Physiotherapist--</option>
                {physioList.map((physio) => (
                  <option key={physio.id} value={physio.id}>
                    {physio.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      {successMsg && (
        <p style={{ color: "green", marginTop: "1rem" }}>{successMsg}</p>
      )}
    </div>
  );
};

export default RegisterPage;
