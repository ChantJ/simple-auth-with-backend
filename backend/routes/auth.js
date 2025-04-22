const express = require('express');
const { register, login, logout, getCurrentUser } = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware'); 
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', requireAuth, getCurrentUser);

module.exports = router;