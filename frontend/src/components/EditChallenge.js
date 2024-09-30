// src/components/EditChallenge.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChallengeForm from './ChallengeForm'; // Import ChallengeForm
import { Container, Spinner } from 'react-bootstrap';

const EditChallenge = () => {
  const { id } = useParams(); // Get the challenge ID from the URL
  const { token } = useAuth();
  const [challenge, setChallenge] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    const fetchChallengeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/challenges/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChallenge(response.data);
      } catch (error) {
        setError('Failed to fetch challenge details');
      }
    };

    fetchChallengeDetails();
  }, [id, token]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!challenge) {
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

  return <ChallengeForm challenge={challenge} />; // Pass challenge data to ChallengeForm
};

export default EditChallenge;
