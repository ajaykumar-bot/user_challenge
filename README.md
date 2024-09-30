# Challenge Tracker Application

## Overview

The Challenge Tracker Application is a full-stack application built with **Laravel** for the backend and **React** for the frontend. This application allows users to create challenges, track their progress, and receive notifications to keep them engaged.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Backend**: Laravel (PHP)
- **Frontend**: React.js
- **Database**: MySQL
- **State Management**: Context API
- **CSS Framework**: Bootstrap
- **API**: RESTful API

## Features

- User authentication (login/logout)
- Create, read, update, and delete challenges
- Track challenge progress
- Receive notifications to remind users to update their progress
- Responsive design using Bootstrap

## Getting Started

### Backend Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/challenge-tracker.git
   cd challenge-tracker/backend

   ```

2. **Install Dependency**:
   Use php 8.2 or greater
   ```
   composer install
   ```
3. **Copy .env.example to .env**:
   ```
   cp .env.example .env
   ```
4. **Generate application key**:
   ```
   php artisan key:generate
   ```
5. **Run migrations**:
   ```
   php artisan migrate
   ```
6. **Start the Laravel server**:
   ```
   php artisan serve
   ```

### Fronten Setup

1. **Navigate to Directory**:

   ```
   cd ../frontend
   ```

2. **Install Dependency**:
   use node 20 or greater
   ```
   npm install
   ```
3. **Start the Server**:
   ```
   npm start
   ```
