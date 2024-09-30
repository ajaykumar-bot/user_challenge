// src/services/AuthenticationService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/'; // Replace with your Laravel backend URL

const login = (email, password) => {
  return axios.post(API_URL + 'login', { email, password });
};

const register = (name, email, password, password_confirmation, role) => {
  return axios.post(API_URL + 'register', {
    name,
    email,
    password,
    password_confirmation,
    role,
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  login,
  register, // Ensure register is exported
  logout,
};
