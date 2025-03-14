import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Set your API URL here
const backendUrl = "https://trojanrecord-server.onrender.com";

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
      const response = await axios.post("https://trojanrecord-server.onrender.com/api/user/login", { email, password }, { withCredentials: true });
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
  const signup = async (name, email, password) => {
    try {
      const response = await axios.post("https://trojanrecord-server.onrender.com/api/user/register", { name, email, password }, { withCredentials: true });

      const { token } = response.data;

      // Save the token and user data to localStorage or context
      localStorage.setItem('token', token);
      setCurrentUser({ email, name });

      // Optionally save user data as well
      localStorage.setItem('user', JSON.stringify({ email, name }));

      return response.data;
    } catch (error) {
      throw new Error('Error during signup');
    }
  };

  // Handle logout
  const logout = async () => {
    try {
      await axios.post("https://trojanrecord-server.onrender.com/auth/logout", {}, { withCredentials: true });
      setCurrentUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (error) {
      throw new Error('Error during logout');
    }
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