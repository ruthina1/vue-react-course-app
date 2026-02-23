import express from 'express'
import pool from '../database/connection.js'
import { verifyToken } from './auth.js'

const router = express.Router()

// Get current user info (from token)
router.get('/me', verifyToken, async (req, res) => {
  try {
    const userId = req.userId
    const [rows] = await pool.execute(
      'SELECT id, username, email, full_name, created_at FROM users WHERE id = ?',
      [userId]
    )
    const user = rows[0] || null
    res.json({ user })
  } catch (err) {
    console.error('GET /users/me error', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get user progress summary and per-course breakdown
router.get('/:id/progress', verifyToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10)

    // total lessons per course
    const [totals] = await pool.execute(
      `SELECT c.course_id, c.title AS course_title, COUNT(l.id) AS total_lessons
       FROM courses c
       JOIN modules m ON m.course_id = c.id
       JOIN lessons l ON l.module_id = m.id
       GROUP BY c.course_id, c.title`
    )

    // completed lessons per course for this user
    const [completed] = await pool.execute(
      `SELECT c.course_id, COUNT(up.id) AS completed_lessons
       FROM user_progress up
       JOIN lessons l ON up.lesson_id = l.id
       JOIN modules m ON l.module_id = m.id
       JOIN courses c ON m.course_id = c.id
       WHERE up.user_id = ? AND up.completed = 1
       GROUP BY c.course_id`,
      [userId]
    )

    const completedMap = new Map()
    completed.forEach(row => completedMap.set(row.course_id, row.completed_lessons))

    let totalLessons = 0
    let completedLessons = 0
    const courses = totals.map(row => {
      const total = Number(row.total_lessons || 0)
      const comp = Number(completedMap.get(row.course_id) || 0)
      totalLessons += total
      completedLessons += comp
      return {
        courseId: row.course_id,
        title: row.course_title,
        total,
        completed: comp,
        percentage: total > 0 ? Math.round((comp / total) * 100) : 0
      }
    })

    res.json({ totalLessons, completedLessons, courses })
  } catch (err) {
    console.error('GET /users/:id/progress error', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get recent activity for user (recent progress entries)
router.get('/:id/activity', verifyToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10)
    const [rows] = await pool.execute(
      `SELECT up.completed, up.progress_percentage, up.last_accessed, up.completed_at,
              l.title AS lesson_title, c.title AS course_title
       FROM user_progress up
       JOIN lessons l ON up.lesson_id = l.id
       JOIN modules m ON l.module_id = m.id
       JOIN courses c ON m.course_id = c.id
       WHERE up.user_id = ?
       ORDER BY up.last_accessed DESC
       LIMIT 20`,
      [userId]
    )

    const activity = rows.map(r => ({
      title: (r.completed ? 'Completed: ' : 'Started: ') + r.lesson_title,
      course: r.course_title,
      completed: !!r.completed,
      last_accessed: r.last_accessed,
      completed_at: r.completed_at
    }))

    res.json({ activity })
  } catch (err) {
    console.error('GET /users/:id/activity error', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
