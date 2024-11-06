# API Documentation for Global Harmony Nexus Core

## Base URL

[http://localhost:5000/api](http://localhost:5000/api)


## Authentication

### Register User

- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```

  Response:
  - 201 Created: User registered successfully.
  - 400 Bad Request: Validation errors.

### Login User

- **Endpoint**: /auth/login
- **Method**: POST
- **Request Body**:

  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

Response:
- 200 OK: Returns a JWT token.
- 401 Unauthorized: Invalid credentials.

## Proposals
### Create Proposal
- **Endpoint**: /proposals
- **Method**: POST
- **Headers**:
  - Authorization: Bearer <token>
- **Request Body**:
   ```json
  {
    "title": "string",
    "description": "string"
  }
  ```

Response:
  - 201 Created: Proposal created successfully.
  - 403 Forbidden: User not authorized.

### Get All Proposals
- **Endpoint**: /proposals
- **Method**: GET

Response:
  - 200 OK: Returns an array of proposals.
  - Vote on Proposal
- **Endpoint**: /proposals/:id/vote
- **Method**: POST
- **Headers**:
  - Authorization: Bearer <token>

Response:
  - 200 OK: Vote counted successfully.
  - 404 Not Found: Proposal not found.

## Conclusion
This API documentation provides an overview of the available endpoints for interacting with the Global Harmony Nexus Core backend. For further details, please refer to the source code or contact the development team.
