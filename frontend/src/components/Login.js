import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
  Container,
} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard'); // Redirect to dashboard if already logged in
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container>
      <Row
        className="justify-content-center align-items-center"
        style={{ minHeight: '70vh' }}>
        <Col md={6}>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Card>
            <Card.Body>
              <Form>
                <Form.Group as={Row} controlId="formEmail">
                  <Form.Label column sm={4}>
                    Email Address
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="email"
                      placeholder="Enter your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPasssword" className="mt-3">
                  <Form.Label column sm={4}>
                    Password
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Button
                  variant="primary"
                  className="mt-4 float-end"
                  onClick={handleLogin}>
                  Login
                </Button>
              </Form>

              <div className="mt-3 text-center">
                <p>
                  Don't have an account?{' '}
                  <Link to="/register">Register here</Link>{' '}
                  {/* Register link */}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
