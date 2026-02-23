import pool from '../database/connection.js';

export class Course {
  static async findAll() {
    const [rows] = await pool.execute(
      'SELECT * FROM courses ORDER BY id'
    );
    return rows;
  }

  static async findByCourseId(courseId) {
    const [rows] = await pool.execute(
      'SELECT * FROM courses WHERE course_id = ?',
      [courseId]
    );
    return rows[0] || null;
  }

  static async getModulesWithLessons(courseId) {
    const course = await this.findByCourseId(courseId);
    if (!course) return null;

    // Get modules
    const [modules] = await pool.execute(
      `SELECT * FROM modules WHERE course_id = ? ORDER BY order_index`,
      [course.id]
    );

    // Get lessons for each module
    const resultMap = new Map(); // key -> title, value -> module object (merged)
    const order = [];
    for (const module of modules) {
      const [lessons] = await pool.execute(
        `SELECT * FROM lessons WHERE module_id = ? ORDER BY order_index`,
        [module.id]
      );

      // Get children for each lesson
      const items = [];
      for (const lesson of lessons) {
        const [subItems] = await pool.execute(
          `SELECT title FROM lesson_subitems WHERE lesson_id = ? ORDER BY order_index`,
          [lesson.id]
        );

        items.push({
          id: lesson.id,
          text: lesson.title,
          slug: lesson.slug,
          content: lesson.content,
          isPractice: lesson.is_practice === 1,
          estimatedTime: lesson.estimated_time,
          children: subItems.map(sub => sub.title)
        });
      }

      // Merge modules with the same title (protect against duplicate module rows)
      const key = module.title || String(module.id);
      if (resultMap.has(key)) {
        const existing = resultMap.get(key);
        existing.items = existing.items.concat(items);
        if (!existing.orderIndex && module.order_index) existing.orderIndex = module.order_index;
      } else {
        const entry = {
          id: module.id,
          title: module.title,
          description: module.description,
          orderIndex: module.order_index,
          items: items
        };
        resultMap.set(key, entry);
        order.push(key);
      }
    }

    // Preserve original order of first occurrences
    const merged = order.map(k => resultMap.get(k));
    return merged;
  }

  // Getting lessons
  static async getLesson(courseId, lessonSlug) {
    const course = await this.findByCourseId(courseId);
    if (!course) return null;

    const [rows] = await pool.execute(
      `SELECT l.*, m.title as module_title, m.course_id
      FROM lessons l
      JOIN modules m ON l.module_id = m.id
      WHERE m.course_id = ? AND l.slug = ?`,
      [course.id, lessonSlug]
    );

    if (rows.length === 0) return null;

    const lesson = rows[0];

    // Get sub-items
    const [subItems] = await pool.execute(
      'SELECT title, order_index FROM lesson_subitems WHERE lesson_id = ? ORDER BY order_index',
      [lesson.id]
    );

    return {
      id: lesson.id,
      text: lesson.title,
      slug: lesson.slug,
      content: lesson.content,
      isPractice: lesson.is_practice === 1,
      estimatedTime: lesson.estimated_time,
      moduleTitle: lesson.module_title,
      children: subItems.map(item => item.title)
    };
  }
}
