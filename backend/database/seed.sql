-- Seed data for Vue & React Course Database
USE vue_react_course;

-- Insert Courses
INSERT INTO courses (course_id, title, description, icon) VALUES
('vue', 'Vue.js Mastery', 'Complete guide to Vue.js from fundamentals to advanced concepts', '⚡'),
('react', 'React Ecosystem', 'Master React and its ecosystem with hands-on projects', '⚛️')
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- Get course IDs
SET @vue_course_id = (SELECT id FROM courses WHERE course_id = 'vue');
SET @react_course_id = (SELECT id FROM courses WHERE course_id = 'react');

-- Vue.js Modules and Lessons
INSERT INTO modules (course_id, title, description, order_index) VALUES
(@vue_course_id, 'Web Fundamentals (Prerequisite)', 'Before diving into Vue.js, ensure you have a solid foundation in web development basics.', 1),
(@vue_course_id, 'Vue Basics', 'Get started with Vue.js fundamentals and project structure.', 2),
(@vue_course_id, 'Template Syntax', 'Learn how to write Vue templates and use directives.', 3),
(@vue_course_id, 'Reactivity System', 'Understand Vue''s powerful reactivity system.', 4),
(@vue_course_id, 'Components', 'Master component-based architecture in Vue.', 5),
(@vue_course_id, 'Forms & User Input', 'Handle user input and form validation effectively.', 6),
(@vue_course_id, 'Vue Router', 'Implement navigation and routing in your Vue applications.', 7),
(@vue_course_id, 'State Management', 'Manage application state with Pinia.', 8),
(@vue_course_id, 'API Integration', 'Connect your Vue app to backend services.', 9),
(@vue_course_id, 'Composables', 'Create reusable composition functions.', 10),
(@vue_course_id, 'Styling & UI', 'Style your Vue applications beautifully.', 11),
(@vue_course_id, 'Testing', 'Ensure code quality with comprehensive testing.', 12),
(@vue_course_id, 'Performance & Optimization', 'Optimize your Vue applications for production.', 13),
(@vue_course_id, 'Build & Deployment', 'Prepare and deploy your Vue applications.', 14),
(@vue_course_id, 'Advanced Topics', 'Explore advanced Vue.js concepts and patterns.', 15),
(@vue_course_id, 'Ecosystem & Tooling', 'Familiarize yourself with Vue''s ecosystem and development tools.', 16),
(@vue_course_id, 'Final Step: Build & Practice', 'The best way to solidify your Vue.js knowledge is through hands-on practice.', 17);

-- React Modules
INSERT INTO modules (course_id, title, description, order_index) VALUES
(@react_course_id, 'Components', 'Learn the building blocks of React applications.', 1),
(@react_course_id, 'State & useState Hook', 'Manage component-level state and handle events.', 2),
(@react_course_id, 'Conditional Rendering', 'Control what gets displayed based on state.', 3),
(@react_course_id, 'useEffect & Fetching Data', 'Handle side effects and connect to APIs.', 4),
(@react_course_id, 'Lifting State Up', 'Share state between components.', 5),
(@react_course_id, 'Context API (Global State)', 'Manage global application state without prop drilling.', 6),
(@react_course_id, 'Custom Hooks', 'Reuse logic across components.', 7),
(@react_course_id, 'Capstone Project', 'Apply your knowledge to build a real application.', 8);

-- Note: Detailed lesson content will be inserted via the seed script in Node.js
-- This SQL file sets up the structure

