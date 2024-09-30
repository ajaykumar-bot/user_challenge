// src/components/Register.js
import React, { useState } from 'react';
import { Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import AuthService from '../services/AuthenticationService';
import { useNavigate } from 'react-router-dom';
// import './App.css'; // Ensure you import your CSS

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setCofirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await AuthService.register(name, email, password, confirmPassword, role);
      alert('Registration successful! You can now log in.');
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Row
      className="justify-content-center align-items-center"
      style={{ minHeight: '70vh' }}>
      <Col md={6}>
        <h2 className="text-center mb-4">Register</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Card>
          <Card.Body>
            <Form className="align-items-center">
              <Form.Group as={Row} controlId="formName">
                <Form.Label column sm={4}>
                  Name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formEmail" className="mt-3">
                <Form.Label column sm={4}>
                  Email address
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPassword" className="mt-3">
                <Form.Label column sm={4}>
                  Password
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formConfirmPassword"
                className="mt-3">
                <Form.Label column sm={4}>
                  Confirm Password
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="password"
                    placeholder="Cofirm Password"
                    value={confirmPassword}
                    onChange={(e) => setCofirmPassword(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formRole" className="mt-3">
                <Form.Label column sm={4}>
                  Role
                </Form.Label>
                <Col sm={8}>
                  <Form.Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select Role</option>{' '}
                    {/* Placeholder option */}
                    <option value="0">Normal User</option> {/* Role Option 0 */}
                    <option value="1">Admin User</option> {/* Role Option 1 */}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Button
                variant="success"
                className="mt-4 float-end"
                onClick={handleRegister}>
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
