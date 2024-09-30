// src/components/ChallengeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  Alert,
  Card,
  Container,
  Button,
  Spinner,
  Row,
  Col,
  Form,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout'; // Import Layout component

const ChallengeList = () => {
  const { token } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    const fetchChallenges = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/challenges?filter=${filter}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChallenges(response.data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch challenges:', error);
        setError('Failed to fetch challenges');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [filter, token]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      try {
        await axios.delete(`http://localhost:8000/api/challenges/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChallenges(challenges.filter((challenge) => challenge.id !== id));
      } catch (error) {
        setError('Failed to delete challenge');
      }
    }
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
      <h2 className="text-center mb-4">Challenges</h2>

      {/* Filter Dropdown */}
      <Form className="mb-4">
        <Row className="justify-content-center">
          <Col md={6}>
            <Form.Group controlId="filter">
              <Form.Control
                as="select"
                value={filter}
                onChange={handleFilterChange}>
                <option value="">All Challenges</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="missed">Missed</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* Display Challenges as Cards */}
      <Row>
        {challenges.length > 0 ? (
          challenges.map((challenge) => (
            <Col md={4} key={challenge.id} className="mb-4">
              <Card className="p-3 shadow-sm">
                <Card.Body>
                  <Card.Title>{challenge.title}</Card.Title>
                  <Card.Text>{challenge.description}</Card.Text>
                  <Card.Text>
                    <strong>Status:</strong> {challenge.status}
                  </Card.Text>
                  <Card.Text>
                    <strong>Frequency:</strong> {challenge.frequency}
                  </Card.Text>
                  <Link to={`/challenges/${challenge.id}/edit`}>
                    <Button variant="primary" className="me-2">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(challenge.id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info" className="text-center">
              No challenges found
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ChallengeList;
