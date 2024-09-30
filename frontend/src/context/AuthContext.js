// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import AuthService from '../services/AuthenticationService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = async (email, password) => {
    const response = await AuthService.login(email, password);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    setToken(response.data.token);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = () => {
    return !!user; // Returns true if user is not null
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
