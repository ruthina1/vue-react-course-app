# Vue & React Course App

A comprehensive learning platform for Vue.js and React with a full-stack implementation.

## Features

- 📚 **Comprehensive Courses**: Learn Vue.js and React from basics to advanced
- 🎯 **Real Course Content**: Detailed lessons with code examples and practice tasks
- 💾 **MySQL Database**: Store user information and course content
- 🔐 **User Authentication**: Register and login functionality
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- ⚡ **Fast Development**: Vite-powered frontend with hot module replacement

## Project Structure

```
vue-react-course-app/
├── src/                    # Frontend Vue.js application
│   ├── components/         # Vue components
│   ├── views/             # Page views
│   ├── composables/       # Composable functions
│   ├── stores/            # Pinia stores
│   └── router/            # Vue Router configuration
├── backend/               # Backend Express.js API
│   ├── database/          # Database schema and seeds
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   └── server.js          # Express server
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env and update with your MySQL credentials
cp .env.example .env

# Create database
mysql -u root -p < database/schema.sql

# Seed initial data
mysql -u root -p vue_react_course < database/seed.sql
node scripts/seed.js

# Start backend server
npm run dev
```

The backend will run on `http://localhost:3001`

### 3. Environment Variables

Create a `.env` file in the `backend` directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=vue_react_course
PORT=3001
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:3000
```

For the frontend, create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:3001/api
```

## Database Schema

The database includes the following tables:

- **users** - User accounts and authentication
- **courses** - Course information (Vue, React)
- **modules** - Course modules/sections
- **lessons** - Individual lessons with content
- **lesson_subitems** - Sub-items within lessons
- **user_progress** - Track user progress through lessons
- **resources** - Learning resources and links

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:courseId` - Get course modules with lessons
- `GET /api/courses/:courseId/lesson/:lessonSlug` - Get specific lesson content

### Health Check
- `GET /api/health` - Check server status

## Development

### Frontend Development

The frontend uses:
- Vue 3 with Composition API
- Vue Router for navigation
- Pinia for state management
- Tailwind CSS for styling
- Vite for build tooling

### Backend Development

The backend uses:
- Express.js for the server
- MySQL2 for database connection
- JWT for authentication
- bcryptjs for password hashing

## Features in Detail

### Course Content

The app includes comprehensive course content for:
- **Vue.js**: 17 modules covering fundamentals to advanced topics
- **React**: 8 modules covering components, hooks, and advanced patterns

Each lesson includes:
- Detailed explanations
- Code examples
- Practice tasks
- Estimated reading time

### User Features

- User registration and authentication
- Progress tracking (coming soon)
- Course bookmarks (coming soon)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
