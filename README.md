# Smart Leads Dashboard

Smart Leads Dashboard is a full-stack Lead Management Dashboard built with the MERN stack and TypeScript.  
It includes authentication, role-based access control, lead CRUD, advanced filtering, debounced search, backend pagination, CSV export, and Docker setup.

---

## Tech Stack

### Frontend
- React.js
- TypeScript
- TailwindCSS
- Axios
- React Router DOM
- Vite

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- cookie-parser
- CORS

### DevOps
- Docker
- Docker Compose

---

## Features

### Authentication
- User signup
- User login
- JWT-based authentication
- HTTP-only cookie token storage
- Protected routes
- Password hashing using bcrypt
- Logout functionality

### Role-Based Access Control
The application supports two roles:

- Admin
- Sales User

Admin users can delete leads.  
Sales users can create, view, and update leads but cannot delete leads.

### Lead Management
- Create lead
- View all leads
- View single lead details
- Update lead
- Delete lead

### Lead Fields
- Name
- Email
- Status
  - New
  - Contacted
  - Qualified
  - Lost
- Source
  - Website
  - Instagram
  - Referral
- Created At
- Created By

### Advanced Filtering and Search
- Filter by status
- Filter by source
- Search by name or email
- Sort by latest
- Sort by oldest
- Multiple filters work together

Example:

```txt
Status = Qualified
Source = Instagram
Search = Rahul
```

### Pagination
- Backend pagination
- 10 records per page
- Pagination metadata in API response

### Frontend UI
- Responsive dashboard
- Reusable components
- Loading states
- Empty states
- Error handling
- Form validation
- Debounced search
- CSV export functionality

### Docker
- Docker setup for backend
- Docker setup for frontend
- MongoDB container
- Docker Compose configuration

---

## Project Structure

```txt
Smart-Lead-Dashboard/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── lead.controller.ts
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── models/
│   │   │   ├── user.model.ts
│   │   │   └── lead.model.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── lead.routes.ts
│   │   ├── utils/
│   │   │   └── sendToken.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── Frontend/
│   └── client/
│       ├── src/
│       │   ├── components/
│       │   │   └── leads/
│       │   │       ├── LeadFilters.tsx
│       │   │       ├── LeadForm.tsx
│       │   │       ├── LeadPagination.tsx
│       │   │       ├── LeadStats.tsx
│       │   │       └── LeadTable.tsx
│       │   ├── pages/
│       │   │   ├── Dashboard.tsx
│       │   │   ├── login.tsx
│       │   │   └── Signup.tsx
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── Dockerfile
│       ├── .dockerignore
│       ├── .env.example
│       ├── package.json
│       └── vite.config.ts
│
├── docker-compose.yml
└── README.md
```

---

## Environment Variables

### Backend Environment Variables

Create a `.env` file inside the `Backend` folder.

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smart-leads-dashboard
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

For Docker, MongoDB URI should be:

```env
MONGO_URI=mongodb://mongo:27017/smart-leads-dashboard
```

---

### Frontend Environment Variables

Create a `.env` file inside the `Frontend/client` folder.

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

# Local Setup Without Docker

## Backend Setup

### 1. Go to Backend folder

```bash
cd Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file inside the `Backend` folder and add:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smart-leads-dashboard
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 4. Run backend

```bash
npm run dev
```

Backend will run on:

```txt
http://localhost:5000
```

---

## Frontend Setup

### 1. Go to frontend client folder

```bash
cd Frontend/client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file inside the `Frontend/client` folder and add:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Run frontend

```bash
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

---

# Docker Setup

Make sure Docker Desktop is installed and running.

From the project root folder, run:

```bash
docker compose up --build
```

This command starts:

- MongoDB
- Backend
- Frontend

---

## Docker URLs

```txt
Frontend: http://localhost:5173
Backend: http://localhost:5000
MongoDB: mongodb://localhost:27017
```

---

## Run Docker in Background

```bash
docker compose up --build -d
```

---

## Stop Docker Containers

```bash
docker compose down
```

---

## Stop Containers and Remove MongoDB Volume

```bash
docker compose down -v
```

---

## View Docker Logs

Backend logs:

```bash
docker compose logs -f backend
```

Frontend logs:

```bash
docker compose logs -f frontend
```

MongoDB logs:

```bash
docker compose logs -f mongo
```

---

# API Documentation

Base URL:

```txt
http://localhost:5000/api
```

---

## Authentication APIs

### 1. Signup

```txt
POST /auth/signup
```

Request body:

```json
{
  "name": "Karan",
  "email": "karan@gmail.com",
  "password": "123456"
}
```

Success response:

```json
{
  "success": true,
  "message": "User signup successful",
  "user": {
    "id": "user_id",
    "name": "Karan",
    "email": "karan@gmail.com",
    "role": "user"
  }
}
```

---

### 2. Login

```txt
POST /auth/login
```

Request body:

```json
{
  "email": "karan@gmail.com",
  "password": "123456"
}
```

Success response:

```json
{
  "success": true,
  "message": "user login successful",
  "user": {
    "id": "user_id",
    "name": "Karan",
    "email": "karan@gmail.com",
    "role": "user"
  }
}
```

The JWT token is stored in an HTTP-only cookie.

---

### 3. Get Current User

```txt
GET /auth/me
```

This is a protected route.

Success response:

```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "Karan",
    "email": "karan@gmail.com",
    "role": "user"
  }
}
```

---

### 4. Logout

```txt
POST /auth/logout
```

Success response:

```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## Lead APIs

All lead routes are protected.

---

### 1. Create Lead

```txt
POST /leads
```

Request body:

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "status": "New",
  "source": "Instagram"
}
```

Success response:

```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "_id": "lead_id",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "status": "New",
    "source": "Instagram"
  }
}
```

---

### 2. Get All Leads

```txt
GET /leads
```

Query parameters:

```txt
page=1
limit=10
search=rahul
status=Qualified
source=Instagram
sort=latest
```

Example:

```txt
GET /leads?page=1&limit=10&search=rahul&status=Qualified&source=Instagram&sort=latest
```

Success response:

```json
{
  "success": true,
  "message": "Leads fetched successfully",
  "data": [],
  "pagination": {
    "totalLeads": 0,
    "totalPages": 1,
    "currentPage": 1,
    "limit": 10
  }
}
```

---

### 3. Get Single Lead

```txt
GET /leads/:id
```

Success response:

```json
{
  "success": true,
  "message": "Lead fetched successfully",
  "data": {
    "_id": "lead_id",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "status": "New",
    "source": "Instagram"
  }
}
```

---

### 4. Update Lead

```txt
PUT /leads/:id
```

Request body:

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "status": "Qualified",
  "source": "Instagram"
}
```

Success response:

```json
{
  "success": true,
  "message": "Lead updated successfully"
}
```

---

### 5. Delete Lead

```txt
DELETE /leads/:id
```

Admin only.

Success response:

```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

---

# CSV Export

The dashboard includes CSV export functionality.  
The exported CSV file contains the currently displayed leads.

---

# Debounced Search

Search input is debounced on the frontend.  
The API request is triggered after a short delay when the user stops typing.

---

# Role-Based Access Control

The application supports:

```txt
admin
user
```

Admin can delete leads.  
User can create, view, and update leads but cannot delete leads.

---

# Creating Admin User in Docker

Docker MongoDB starts with a fresh database.

First, create a user from the signup page:

```txt
http://localhost:5173/signup
```

Then open Mongo shell inside the MongoDB container:

```bash
docker exec -it smart-leads-mongo mongosh
```

Switch database:

```js
use smart-leads-dashboard
```

Update user role:

```js
db.users.updateOne(
  { email: "admin@gmail.com" },
  { $set: { role: "admin" } }
)
```

Verify:

```js
db.users.find({ email: "admin@gmail.com" }).pretty()
```

Exit Mongo shell:

```js
exit
```

---

# Useful Commands

## Git Commands

```bash
git add .
git commit -m "your commit message"
git push origin main
```

## Docker Commands

```bash
docker compose up --build
docker compose up --build -d
docker compose down
docker compose down -v
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongo
```

---

# Submission Checklist

- React.js frontend implemented
- Node.js and Express backend implemented
- TypeScript used in frontend and backend
- MongoDB and Mongoose used
- JWT authentication implemented
- HTTP-only cookie token handling implemented
- Protected routes implemented
- Role-based access control implemented
- Lead CRUD implemented
- Search and filters implemented
- Multiple filters work together
- Backend pagination implemented
- CSV export implemented
- Loading and empty states added
- Reusable frontend components added
- Docker setup added
- `.env.example` files added
- `.env` files ignored
- API documentation added
- README added

---

# Author

Mohammad Ismail Alam
