// src/lib/auth.js
import jwt from 'jsonwebtoken';

const SECRET = "SUPER_SECRET_KEY"; // sposta in variabile ambiente in produzione

export function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '30m' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}
