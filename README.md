# 🔐 Full-Stack Secure Authentication Flow with Role-Based Access

This project demonstrates a full-stack authentication system built with **Express.js** (Node.js) for the backend and **React** for the frontend. It features secure user login, registration, and role-based access control (RBAC), with HTTP-only cookies used to safely store authentication tokens.

---

## 📌 Features

- User registration and login
- Password hashing with **bcrypt**
- JWT-based authentication
- Token storage in **HTTP-only cookies**
- Role-based protected routes (e.g., admin, user)
- Frontend using **React** + **Axios**
- Secure token handling and session persistence

---

## 🏗️ Project Structure

```
backend/
│
├── controllers/
├── routes/
├── middleware/
├── services/
├── utils/
├── app.js
└── server.js

frontend/
│
├── src/
│   ├── components/
│   ├── api/
│   ├── pages/
│   ├── App.jsx
│   └── index.js
└── public/
```

---

## 🧪 Demo Users

| Email               | Password   | Role  |
|--------------------|------------|-------|
| admin@test.com     | admin123   | admin |
| user@test.com      | user123    | user  |

> These are mock users for demonstration purposes.

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (18+ recommended)
- npm or yarn
- React (v18+)

### 🔒 Backend Setup (Express.js)

1. Navigate to the `backend/` folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the `.env.example` to `.env` and fill in values:
   ```
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1d
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### 💻 Frontend Setup (React)

1. Navigate to the `frontend/` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env`:
   ```
   REACT_APP_API_URL=http://localhost:3000
   ```

4. Start the React app:
   ```bash
   npm start
   ```

---

## 📡 API Endpoints

| Method | Endpoint        | Description                 | Auth Required |
|--------|------------------|-----------------------------|----------------|
| POST   | `/auth/register` | Register new user           | ❌             |
| POST   | `/auth/login`    | Log in and get JWT cookie   | ❌             |
| GET    | `/auth/me`       | Get current user            | ✅             |
| GET    | `/dashboard`     | Protected route (all users) | ✅             |
| GET    | `/admin`         | Admin-only route            | ✅ (admin only)|
| POST   | `/auth/logout`   | Clear cookie                | ✅             |

---

## 🧪 Testing

You can test routes using:

- **Postman** (with cookie support)
- **Frontend UI** (React with Axios + Context)
- Inspect cookies via browser dev tools (Application → Cookies)

---

## 👮 Roles & Access

| Route      | Role Required |
|------------|----------------|
| /dashboard | user or admin  |
| /admin     | admin only     |

Roles are embedded in the JWT and validated via middleware.

---

## 🧰 Technologies Used

- **Backend:** Express.js, bcrypt, JWT, cookie-parser, dotenv
- **Frontend:** React, Axios, React Router, Context API
- **Security:** HTTP-only cookies, hashed passwords, RBAC

---

## 📁 Environment Variables

### Backend (`backend/.env`)

```
PORT=5001
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

### Frontend (`frontend/.env`)

```
REACT_APP_API_URL=http://localhost:3000
```

---

## 📄 Assumptions & Notes

- The backend uses an in-memory user store (or simple array) for demo purposes. You can swap this with MongoDB or PostgreSQL.
- No frontend state persistence beyond page reload (no refresh token or session).
- JWT expiration is handled via cookie expiry.

---

## ✅ Validation Checklist

- [x] Register and login flow works
- [x] HTTP-only cookie used for token
- [x] Protected route requires valid token
- [x] Admin-only route blocks unauthorized roles
- [x] Logout removes token cookie
- [x] All routes return proper HTTP codes

---


