import React, { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  // You can initialize state based on localStorage or defaults
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Function to log in a user
  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    // Optionally, save to localStorage for persistence:
    // localStorage.setItem("user", JSON.stringify(userData));
    // localStorage.setItem("token", tokenData);
  };

  // Function to log out a user
  const logout = () => {
    setUser(null);
    setToken(null);
    // localStorage.removeItem("user");
    // localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};
