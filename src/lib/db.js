// src/lib/db.js
import Database from 'better-sqlite3';

// Inizializza DB SQLite
const db = new Database('database.sqlite');

// Crea tabella utenti se non esiste
db.exec(`
  CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('user', 'admin'))
  );
`);

export default db;
