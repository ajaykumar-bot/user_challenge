// src/components/Notification.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/notifications',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    };

    fetchNotifications();
  }, [token]);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3 className="text-center">Notifications</h3>
      {notifications.length === 0 ? (
        <Alert variant="info" className="text-center">
          No notifications available.
        </Alert>
      ) : (
        notifications.map((notification, index) => (
          <Alert key={index} variant="warning">
            {notification.message}
          </Alert>
        ))
      )}
    </Container>
  );
};

export default Notification;
