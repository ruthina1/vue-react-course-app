import pool from '../database/connection.js';
import bcrypt from 'bcryptjs';

export class User {
  static async create(userData) {
    const { username, email, password, full_name } = userData;
    
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);
    
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password_hash, full_name) VALUES (?, ?, ?, ?)',
      [username, email, password_hash, full_name || null]
    );
    
    return this.findById(result.insertId);
  }
  
  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, username, email, full_name, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }
  
  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  }
  
  static async findByUsername(username) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0] || null;
  }
  
  static async verifyPassword(user, password) {
    return await bcrypt.compare(password, user.password_hash);
  }
}

