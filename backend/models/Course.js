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
    
    const [modules] = await pool.execute(
      `SELECT m.*, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', l.id,
            'title', l.title,
            'slug', l.slug,
            'content', l.content,
            'isPractice', l.is_practice,
            'estimatedTime', l.estimated_time,
            'orderIndex', l.order_index,
            'children', (
              SELECT JSON_ARRAYAGG(JSON_OBJECT('title', li.title, 'orderIndex', li.order_index))
              FROM lesson_subitems li
              WHERE li.lesson_id = l.id
              ORDER BY li.order_index
            )
          )
        ) as items
      FROM modules m
      LEFT JOIN lessons l ON l.module_id = m.id
      WHERE m.course_id = ?
      GROUP BY m.id
      ORDER BY m.order_index, l.order_index`,
      [course.id]
    );
    
    // Transform the data to match frontend format
    return modules.map(module => {
      // `module.items` comes from JSON_ARRAYAGG and may be returned as a JSON string (or null). Safely parse it to an array.
      let itemsArr = [];
      if (module.items) {
        try {
          itemsArr = typeof module.items === 'string' ? JSON.parse(module.items) : module.items;
        } catch (e) {
          itemsArr = Array.isArray(module.items) ? module.items : [];
        }
      }

      const cleanItems = (itemsArr || []).filter(item => item && item.id !== null).map(item => ({
        id: item.id,
        text: item.title,
        slug: item.slug,
        content: item.content,
        isPractice: item.isPractice === 1 || item.isPractice === true,
        estimatedTime: item.estimatedTime,
        children: item.children || []
      }));

      return {
        id: module.id,
        title: module.title,
        description: module.description,
        orderIndex: module.order_index,
        items: cleanItems
      };
    });
  }
  
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

