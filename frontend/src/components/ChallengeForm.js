// ChallengeForm.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Card,
} from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; // Import AuthContext

const ChallengeForm = ({ challenge }) => {
  const { token } = useAuth();
  const [title, setTitle] = useState(challenge?.data.title || '');
  const [description, setDescription] = useState(
    challenge?.data.description || ''
  );
  const [startDate, setStartDate] = useState(challenge?.data.start_date || '');
  const [endDate, setEndDate] = useState(challenge?.data.end_date || '');
  const [frequency, setFrequency] = useState(
    challenge?.data.frequency || 'daily'
  );
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleSubmit = async () => {
    const challengeData = {
      title,
      description,
      start_date: startDate,
      end_date: endDate,
      frequency,
    };

    setLoading(true); // Start loading

    let response;

    if (challenge?.data.id) {
      response = await axios.put(
        `http://localhost:8000/api/challenges/${challenge.data.id}`,
        challengeData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the Bearer token in the headers
          },
        }
      );
    } else {
      response = await axios.post(
        'http://localhost:8000/api/challenges',
        challengeData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the Bearer token in the headers
          },
        }
      );
    }
    setLoading(false); // Start loading
    alert(response.data.message || 'Challenge saved successfully.');
  };

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col md={8}>
          <Card className="p-3 shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">
                {challenge ? 'Edit Challenge' : 'Create Challenge'}
              </h2>
              <Form>
                <Form.Group controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter challenge title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formDescription" className="mt-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter challenge description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formStartDate" className="mt-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formEndDate" className="mt-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formFrequency" className="mt-3">
                  <Form.Label>Frequency</Form.Label>
                  <Form.Control
                    as="select"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </Form.Control>
                </Form.Group>
                <Button
                  variant="success"
                  className="mt-4 w-100"
                  onClick={handleSubmit}
                  disabled={loading}>
                  {/* Disable button while loading */}
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      {/* Spinner for loading */}
                      Saving...
                    </>
                  ) : challenge ? (
                    'Update Challenge'
                  ) : (
                    'Create Challenge'
                  )}{' '}
                  {/* Correct ternary operator usage */}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChallengeForm;
