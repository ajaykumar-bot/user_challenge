import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  // Handle case where user is not yet loaded (null or undefined)
  if (!user) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Dashboard</h2>
      <Row>
        <Col md={12}>
          <p>Welcome Back, {user.name}!</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
