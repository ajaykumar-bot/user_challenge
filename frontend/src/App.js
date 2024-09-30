// src/App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header'; // Import the Header component
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ChallengeForm from './components/ChallengeForm';
import ChallengeList from './components/ChallengeList';
import ProgressTracker from './components/ProgressTracker';
import Notification from './components/Notification';
import EditChallenge from './components/EditChallenge';
import { useAuth } from './context/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="d-flex">
      {isAuthenticated() && <Sidebar />} {/* Show sidebar only if logged in */}
      <div className="flex-grow-1">
        {/* <Header /> Include Header for all pages */}
        <Routes>
          {!isAuthenticated() ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />{' '}
              {/* Add Register route */}
            </>
          ) : (
            // Show other routes if authenticated
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/challenges/new" element={<ChallengeForm />} />
              <Route path="/challenges" element={<ChallengeList />} />
              <Route path="/progress" element={<ProgressTracker />} />
              <Route path="/notifications" element={<Notification />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />{' '}
              {/* Redirect unknown routes to dashboard */}
            </>
          )}
          {/* Redirect to login if trying to access non-authenticated routes */}
          {!isAuthenticated() && (
            <Route path="*" element={<Navigate to="/login" />} />
          )}

          <Route path="/challenges/:id/edit" element={<EditChallenge />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
