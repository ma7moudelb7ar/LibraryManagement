# LibraryManagement

##API Documentation : https://documenter.getpostman.com/view/45502181/2sB3BEpB4z

## Features
- User registration and login with JWT authentication.
- Role-based access control (admin, member).
- CRUD operations for books.
- Borrow and return books with transaction tracking.
- Input validation with Joi.
- Password hashing with Bcrypt.
- Input sanitization to prevent MongoDB injection.
- Bonus features:
  - Advanced search with pagination.
  - Rate limiting on login endpoint.
  - Admin view of all transactions with filters and sorting.

---

## Setup Instructions

### Prerequisites
- Node.js installed (v14+ recommended)
- MongoDB running locally or accessible via URI
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone   https://github.com/ma7moudelb7ar/LibraryManagement.git

2. Install dependencies : npm i

3.Create .env file in the root folder and add your environment variables (see .env.example):
PORT=3000
DB_URL=mongodb://localhost:27017/LibraryManagement
SIGNATURE_GenretToken=yourSecretToken
SIGNATURE_GenretToken_member=memberSecretToken
SIGNATURE_GenretToken_admin=adminSecretToken
...
4.Start the server: npm run dev
## Error Handling
Uses standard HTTP status codes (400, 401, 403, 404, 500).

Returns JSON responses with error messages.

## Testing
All routes tested with Postman (exported collection included).

Ensure to provide JWT token in Authorization header for protected routes.

## Bonus Tasks Implemented
Advanced book search with pagination.

Role-based access control.

Rate limiting on login endpoint.

Input sanitization to prevent MongoDB injection.

## Contact
For any questions, contact:
Email: ma7moudelb7ar@gmail.com
