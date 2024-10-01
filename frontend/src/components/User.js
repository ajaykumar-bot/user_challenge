// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import Layout from './Layout'; // Assuming you have a Layout component

const UserList = () => {
  const { token, user } = useAuth(); // Assuming you get the token and user from AuthContext
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [deletingUser, setDeletingUser] = useState(null); // State to track user being deleted

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authorization
          },
        });
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setDeletingUser(id); // Track the user being deleted
      try {
        await axios.delete(`http://localhost:8000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter((user) => user.id !== id)); // Update user list after deletion
      } catch (error) {
        setError('Failed to delete user');
      } finally {
        setDeletingUser(null); // Reset the deleting state
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
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">User Management</h2>
      {users.length === 0 ? (
        <Alert variant="info" className="text-center">
          No users available.
        </Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              {user.role === 1 && <th>Actions</th>}{' '}
              {/* Show actions only for admin */}
            </tr>
          </thead>
          <tbody>
            {users.map((userItem, index) => (
              <tr key={userItem.id}>
                <td>{index + 1}</td>
                <td>{userItem.name}</td>
                <td>{userItem.email}</td>
                {user.role === 1 && (
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(userItem.id)}
                      disabled={deletingUser === userItem.id} // Disable while deleting
                    >
                      {deletingUser === userItem.id ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" />{' '}
                          Deleting...
                        </>
                      ) : (
                        'Delete'
                      )}
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserList;
