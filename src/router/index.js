/*
  ROUTER/INDEX.JS - Vue Router Configuration
  ===========================================
  
  Vue Router handles navigation between different pages/views in your app.
  
  Key Concepts:
  - createRouter(): Creates a router instance
  - createWebHistory(): Uses browser history API (clean URLs like /home instead of /#/home)
  - routes: Array of route objects that map URLs to components
  
  Route Object Structure:
  {
    path: '/url-path',        // The URL path
    name: 'RouteName',        // Optional: name for programmatic navigation
    component: ComponentName  // The Vue component to display
  }
*/

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VueView from '../views/VueView.vue'
import ReactView from '../views/ReactView.vue'
import LessonView from '../views/LessonView.vue'

// Define all routes in your application
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/vue',
    name: 'vue',
    component: VueView
  },
  {
    path: '/react',
    name: 'react',
    component: ReactView
  },
  {
    path: '/:courseId/lesson/:lessonId',
    name: 'lesson',
    component: LessonView,
    props: true
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import('../views/AboutView.vue') // Lazy loading
  // }
]

// Create and export the router instance
const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode
  routes // Pass our routes array
})

export default router

