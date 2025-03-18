import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  // Login function
  const login = async ({ username, password }) => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        username,
        password,
      });

      const { token, user: loggedInUser } = response.data;

      // Save token and user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      // Update user state
      setUser(loggedInUser);
    } catch (error) {
      alert(
        `Login error: ${JSON.stringify(error.response?.data || error.message)}`
      );
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/create",
        userData
      );

      const { token, user: registeredUser } = response.data;

      alert(`✅ User registered:`);

      // Save token and user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(registeredUser));

      // Update user state
      setUser(registeredUser);
    } catch (error) {
      alert(
        `Registration error: ${JSON.stringify(
          error.response?.data || error.message
        )}`
      );
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
