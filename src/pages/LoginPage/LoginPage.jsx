import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5050/api/auth/login",
        {
          email,
          password,
        }
      );
      login(response.data.user, response.data.token);
      navigate("/dashboard");
    } catch (err) {
      const errMsg =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errMsg);
    }
  };

  return (
    <div className="login-page">
      <h2 className="login-page__title">Login</h2>
      <form onSubmit={handleLogin} className="login-page__form">
        <div className="login-page__form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-page__input"
          />
        </div>
        <div className="login-page__form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-page__input"
          />
        </div>
        <button type="submit" className="login-page__button">
          Login
        </button>
      </form>
      {error && <p className="login-page__error">{error}</p>}
    </div>
  );
};

export default LoginPage;
