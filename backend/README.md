# Vue & React Course Backend API

Backend server for the Vue & React Course application using Express.js and MySQL.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Database

1. Make sure MySQL is installed and running
2. Create a `.env` file (copy from `.env.example`):
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=vue_react_course
   PORT=3001
   JWT_SECRET=your_super_secret_jwt_key
   ```

### 3. Create Database

Run the SQL schema file to create the database and tables:

```bash
mysql -u root -p < database/schema.sql
```

Or manually:
```sql
mysql -u root -p
source database/schema.sql
```

### 4. Seed Initial Data

```bash
# First, seed the basic structure
mysql -u root -p vue_react_course < database/seed.sql

# Then, seed the detailed course content
node scripts/seed.js
```

### 5. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3001`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Courses

- `GET /api/courses` - Get all courses
- `GET /api/courses/:courseId` - Get course modules with lessons
- `GET /api/courses/:courseId/lesson/:lessonSlug` - Get specific lesson

### Health Check

- `GET /api/health` - Check server status

## Database Structure

- **users** - User accounts
- **courses** - Course information (Vue, React)
- **modules** - Course modules/sections
- **lessons** - Individual lessons
- **lesson_subitems** - Sub-items within lessons
- **user_progress** - Track user progress
- **resources** - Learning resources

## Environment Variables

- `DB_HOST` - MySQL host (default: localhost)
- `DB_USER` - MySQL username (default: root)
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name (default: vue_react_course)
- `PORT` - Server port (default: 3001)
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:3000)

