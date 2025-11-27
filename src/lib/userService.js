// src/lib/userService.js
import db from './db.js';
import bcrypt from 'bcryptjs';

export function createUser(email, password, role = 'user') {
  const existing = db.prepare('SELECT * FROM User WHERE email = ?').get(email);
  if (existing) return null;

  const hash = bcrypt.hashSync(password, 10);

  const stmt = db.prepare(`
    INSERT INTO User (email, password_hash, role)
    VALUES (?, ?, ?)
  `);

  const result = stmt.run(email, hash, role);

  return { id: result.lastInsertRowid, email, role };
}

export function findUserByEmail(email) {
  return db.prepare('SELECT * FROM User WHERE email = ?').get(email);
}

export function validateUser(email, password) {
  const user = findUserByEmail(email);
  if (!user) return null;

  const ok = bcrypt.compareSync(password, user.password_hash);
  if (!ok) return null;

  return user;
}
