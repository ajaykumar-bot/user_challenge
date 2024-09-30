// src/components/Layout.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Sidebar from './Sidebar'; // Ensure you have Sidebar component imported

const Layout = ({ children }) => {
  return (
    <Row>
      <Col md={3} className="sidebar">
        <Sidebar /> {/* Sidebar on the left */}
      </Col>
      <Col md={9} className="main-content">
        <Card className="p-4 shadow-sm mt-3">
          {' '}
          {/* Card to wrap the main content */}
          {children}
        </Card>
      </Col>
    </Row>
  );
};

export default Layout;
