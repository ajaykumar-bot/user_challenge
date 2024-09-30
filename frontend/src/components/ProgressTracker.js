// src/components/ProgressTracker.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  Row,
  Col,
  Card,
  ProgressBar,
  Button,
  Alert,
  Container,
  Form,
  Spinner,
} from 'react-bootstrap';
import moment from 'moment';
import Layout from './Layout'; // Import the Layout component

const ProgressTracker = () => {
  const { token } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    if (!token) {
      setError('Unauthorized: Missing token');
      setLoading(false); // Stop loading if there is no token
      return;
    }

    // Fetch all challenges with progress data
    const fetchChallenges = async () => {
      setLoading(true); // Start loading when fetching data

      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/challenges-progress',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChallenges(response.data);
      } catch (error) {
        console.error('Failed to fetch challenges:', error);
        setError('Failed to fetch challenges');
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchChallenges();
  }, [token]);

  // Function to log progress for a specific challenge
  const logProgress = async (challengeId, status, date) => {
    try {
      await axios.post(
        `http://localhost:8000/api/challenges/${challengeId}/progress`,
        {
          progress_date: date,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`Progress for ${date} marked as ${status}`);
    } catch (error) {
      console.error('Error marking progress:', error);
      alert('Error marking progress');
    }
  };

  const renderProgressTracker = (challenge) => {
    const totalParts = challenge.total_parts || 7; // Total days or parts of the challenge
    const completedProgress =
      challenge.progress?.filter((p) => p.status === 'completed').length || 0; // Safely access challenge.progress
    const missedProgress =
      challenge.progress?.filter((p) => p.status === 'missed').length || 0; // Safely access challenge.progress

    return (
      <>
        {/* Progress Bar */}
        <ProgressBar
          now={(completedProgress / totalParts) * 100}
          label={`${Math.round((completedProgress / totalParts) * 100)}%`}
          className="mb-3"
        />

        <div className="mb-2">
          <strong>{completedProgress}</strong> / {totalParts} days completed.
          <br />
          <strong>{missedProgress}</strong> days missed.
        </div>

        {/* Log Progress Buttons (Mark as Completed or Missed) */}
        <Form.Group className="mb-3">
          <Button
            variant="success"
            className="mt-4"
            onClick={() =>
              logProgress(
                challenge.id,
                'completed',
                moment().format('YYYY-MM-DD')
              )
            }>
            Mark as Completed Today
          </Button>
          <Button
            variant="danger"
            className="mt-4 float-end"
            onClick={() =>
              logProgress(challenge.id, 'missed', moment().format('YYYY-MM-DD'))
            }>
            Mark as Missed Today
          </Button>
        </Form.Group>
      </>
    );
  };

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

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Progress Tracker</h2>
      <Row>
        {challenges.map((challenge) => (
          <Col md={6} key={challenge.id} className="mb-4">
            <Card className="p-3 shadow-sm">
              <h4>{challenge.title}</h4>
              <p>{challenge.description}</p>
              {renderProgressTracker(challenge)}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProgressTracker;
