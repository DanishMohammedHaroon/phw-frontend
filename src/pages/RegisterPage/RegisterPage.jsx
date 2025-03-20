import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./RegisterPage.scss";

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
  const { login } = useAuth();

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
    <div className="register-page">
      <h2 className="register-page__title">Register</h2>
      <form onSubmit={handleRegister} className="register-page__form">
        <div className="register-page__form-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="register-page__input"
          />
        </div>
        <div className="register-page__form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-page__input"
          />
        </div>
        <div className="register-page__form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-page__input"
          />
        </div>
        <div className="register-page__form-group">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="register-page__select"
          >
            <option value="client">Client</option>
            <option value="physio_therapist">Physiotherapist</option>
          </select>
        </div>
        {role === "client" && (
          <div className="register-page__form-group">
            <label className="register-page__label">
              Select Your Physiotherapist:{" "}
            </label>
            <select
              value={selectedPhysio}
              onChange={(e) => setSelectedPhysio(e.target.value)}
              className="register-page__select"
            >
              <option value="">--Select Physiotherapist--</option>
              {physioList.map((physio) => (
                <option key={physio.id} value={physio.id}>
                  {physio.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" className="register-page__button">
          Register
        </button>
      </form>
      {error && <p className="register-page__error">{error}</p>}
      {successMsg && <p className="register-page__success">{successMsg}</p>}
    </div>
  );
};

export default RegisterPage;
