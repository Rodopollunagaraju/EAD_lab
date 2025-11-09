import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

// In-memory users array for the lab
// Each user: { id, name, email, passwordHash }
const users = [];
let idCounter = 1;

function makeToken(user) {
  // Standard claims: sub (subject), email, iat, exp (set by sign options)
  const payload = { sub: user.id, email: user.email, name: user.name };
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

// @route   POST /api/auth/register
// @body    { name, email, password }
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password are required' });

    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = { id: idCounter++, name, email, passwordHash };
    users.push(user);

    const token = makeToken(user);
    res.status(201).json({
      message: 'Registered successfully',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @body    { email, password }
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = makeToken(user);
    res.json({
      message: 'Logged in',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/auth/profile (protected)
router.get('/profile', verifyToken, (req, res) => {
  // req.user was set by verifyToken
  const user = users.find(u => u.id === req.user.sub);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, name: user.name, email: user.email });
});

export default router;
