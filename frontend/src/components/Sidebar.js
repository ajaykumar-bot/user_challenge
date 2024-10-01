// src/components/Sidebar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav, Dropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page on logout
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: '250px', minHeight: '100vh' }}>
      <h5 to="/dashboard" className="text-center">
        Challenge Tracking App
      </h5>
      <Nav className="flex-column">
        {/* User Profile Dropdown */}
        <Dropdown className="mt-auto">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Profile
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>{user ? user.name : 'Profile'}</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {user && user.role === 1 && (
          <NavLink to="/manage-users" className="nav-link">
            Manage Users
          </NavLink>
        )}

        <NavLink to="/challenges" className="nav-link">
          Challenges List
        </NavLink>
        <NavLink to="/challenges/new" className="nav-link">
          Create Challenge
        </NavLink>
        <NavLink to="/progress" className="nav-link">
          Progress Tracker
        </NavLink>
        <NavLink to="/notifications" className="nav-link">
          Notifications
        </NavLink>
      </Nav>
    </div>
  );
};

export default Sidebar;
