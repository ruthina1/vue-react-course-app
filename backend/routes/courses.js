import express from 'express';
import { Course } from '../models/Course.js';

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get course modules with lessons
router.get('/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const modules = await Course.getModulesWithLessons(courseId);
    
    if (!modules) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(modules);
  } catch (error) {
    console.error('Error fetching course modules:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific lesson
router.get('/:courseId/lesson/:lessonSlug', async (req, res) => {
  try {
    const { courseId, lessonSlug } = req.params;
    const lesson = await Course.getLesson(courseId, lessonSlug);
    
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    
    res.json(lesson);
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

