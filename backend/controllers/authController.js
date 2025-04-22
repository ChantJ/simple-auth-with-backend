const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users } = require('../utils/fakeDB');

const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) return res.status(409).json({ error: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), username, password: hashedPassword, role };
  users.push(newUser);
  res.status(201).json({ message: 'User registered' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = generateToken({ id: user.id, username: user.username, role: user.role });
  res.cookie('token', token, { httpOnly: true });
  res.json({ message: 'Login successful' });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

exports.getCurrentUser = (req, res) => {
  res.json({ user: req.user });
};
