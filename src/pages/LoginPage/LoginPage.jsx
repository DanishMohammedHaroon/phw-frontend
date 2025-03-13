import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.scss"

const LoginPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Login</h2>
      <form>
        <div>
          <input type="email" placeholder="Email" />
        </div>
        <div>
          <input type="password" placeholder="Password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
