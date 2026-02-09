# E-Learning Platform Backend

This is the backend for the E-Learning Platform, built with Express, MongoDB, and Passport.js.

## Prerequisites

- Node.js installed
- MongoDB installed and running locally on default port (27017)

## Setup

1.  Navigate to the project directory:
    ```bash
    cd "c:\web Project 22"
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    - A `.env` file has been created with default values.
    - Ensure MongoDB is running.

4.  Start the server:
    ```bash
    npm run dev
    # OR
    node src/app.js
    ```

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user (Student, Teacher, Admin).
- `POST /api/auth/login`: Login.
- `GET /api/auth/logout`: Logout.

### Courses
- `GET /api/courses`: Get all courses.
- `GET /api/courses/:id`: Get a specific course.
- `POST /api/courses`: Create a course (Teacher/Admin only).
- `POST /api/courses/:id/enroll`: Enroll in a course (Student).

### Forums
- `POST /api/forums`: Create a forum topic (Teacher/Admin).
- `GET /api/forums/course/:courseId`: Get forums for a course.
- `POST /api/forums/:id/messages`: Add a message to a forum.

### Quizzes
- `POST /api/quizzes`: Create a quiz (Teacher/Admin).
- `GET /api/quizzes/course/:courseId`: Get quizzes for a course.

### Assignments
- `POST /api/assignments`: Create an assignment (Teacher/Admin).
- `GET /api/assignments/course/:courseId`: Get assignments for a course.
- `POST /api/assignments/:id/submit`: Submit an assignment (Student).

## Folder Structure

- `src/config`: Configuration files (DB, Passport).
- `src/controllers`: Request handlers.
- `src/models`: Mongoose models.
- `src/routes`: API routes.
- `src/middleware`: Middleware functions (Authentication).

