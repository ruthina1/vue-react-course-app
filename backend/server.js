import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import usersRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// Allow the configured FRONTEND_URL in production, but accept any origin during
// local development so the frontend can run on alternate ports (Vite sometimes
// chooses 3001/3002). For production, set FRONTEND_URL in .env to the exact origin.
const frontendUrl = process.env.FRONTEND_URL;
const corsOptions = process.env.NODE_ENV === 'production'
  ? { origin: frontendUrl || 'http://localhost:3000', credentials: true }
  : { origin: true, credentials: true };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', usersRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Vue & React Course API is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API endpoints available at http://localhost:${PORT}/api`);
});

