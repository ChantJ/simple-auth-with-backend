const express = require('express');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/dashboard', requireAuth, (req, res) => {
  res.json({ message: 'Welcome to the dashboard!', user: req.user });
});

router.get('/admin', requireAuth, requireRole('admin'), (req, res) => {
  res.json({ message: 'Welcome to the admin area!', user: req.user });
});

module.exports = router;
