const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // ✅ Add this
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: 'http://localhost:3001', // frontend URL
  credentials: true, // allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

module.exports = app;
