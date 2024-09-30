// src/components/Header.js
import React from 'react';
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import { useLocation, Link } from 'react-router-dom'; // Import useLocation for routing

const Header = () => {
  const { logout, isAuthenticated } = useAuth();
  const location = useLocation(); // Get the current route

  const handleLogout = () => {
    logout(); // Call logout function
  };

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <BootstrapNavbar.Brand href="/">
          Challenge Tracking App
        </BootstrapNavbar.Brand>
        <Nav className="ms-auto">
          {isAuthenticated() &&
            location.pathname !== '/login' && ( // Show logout button only if authenticated and not on login page
              <Nav.Link as={Link} to="/" onClick={handleLogout}>
                Logout
              </Nav.Link>
            )}
          {/* Show Login link only when on the registration page */}
          {location.pathname === '/register' && !isAuthenticated() && (
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )}
          {/* Show Login link only when on the registration page */}
          {location.pathname === '/login' && !isAuthenticated() && (
            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
};

export default Header;
