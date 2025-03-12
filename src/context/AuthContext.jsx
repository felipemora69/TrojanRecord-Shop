import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Set your API URL here
const backendUrl = "https://trojanrecord-server.vercel.app";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Handle login
  const login = async (email, password) => {
    try {
      const response = await axios.post("https://trojanrecord-server.vercel.app/auth/login", { email, password });
      const { token } = response.data;

      // Save the token and user data to localStorage or context
      localStorage.setItem('token', token);
      setCurrentUser({ email });

      // Optionally save user data as well
      localStorage.setItem('user', JSON.stringify({ email }));

      return response.data;
    } catch (error) {
      throw new Error('Invalid credentials or server error');
    }
  };

  // Handle signup
  const signup = async (email, password) => {
    try {
      const response = await axios.post("https://trojanrecord-server.vercel.app/auth/signup", { email, password });

      const { token } = response.data;

      // Save the token and user data to localStorage or context
      localStorage.setItem('token', token);
      setCurrentUser({ email });

      // Optionally save user data as well
      localStorage.setItem('user', JSON.stringify({ email }));

      return response.data;
    } catch (error) {
      throw new Error('Error during signup');
    }
  };

  // Handle logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};