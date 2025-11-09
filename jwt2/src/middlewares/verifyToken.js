import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';

export function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid Authorization format. Use Bearer <token>' });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = payload; // e.g., { sub, email, iat, exp }
    next();
  } catch (err) {
    console.error('JWT verify error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
