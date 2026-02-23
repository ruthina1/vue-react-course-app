/*
  ROUTER/INDEX.JS - Vue Router Configuration
  ===========================================
  
  Vue Router handles navigation between different pages/views in your app.
  
  Key Concepts:
  - createRouter(): Creates a router instance
  - createWebHistory(): Uses browser history API (clean URLs like /home instead of /#/home)
  - routes: Array of route objects that map URLs to components
  - Navigation guards: Functions that run before/after route navigation
  
  Route Object Structure:
  {
    path: '/url-path',        // The URL path
    name: 'RouteName',        // Optional: name for programmatic navigation
    component: ComponentName  // The Vue component to display
    meta: { requiresAuth: true } // Route metadata for guards
  }
*/

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import JoinView from '../views/JoinView.vue'
import VueView from '../views/VueView.vue'
import ReactView from '../views/ReactView.vue'
import LessonView from '../views/LessonView.vue'
import PasswordRecoverView from '../views/PasswordRecoverView.vue'
import ProfileView from '../views/ProfileView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import ShowcaseView from '../views/ShowcaseView.vue'

// Define all routes in your application
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/join',
    name: 'join',
    component: JoinView
  },
  {
    path: '/password-recover',
    name: 'password-recover',
    component: PasswordRecoverView
  },
  {
    path: '/en/password-recover',
    name: 'password-recover-en',
    component: PasswordRecoverView
  },
  {
    path: '/vue',
    name: 'vue',
    component: VueView,
    meta: { requiresAuth: true }
  },
  {
    path: '/react',
    name: 'react',
    component: ReactView,
    meta: { requiresAuth: true }
  },
  {
    path: '/:courseId/lesson/:lessonId',
    name: 'lesson',
    component: LessonView,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/resources',
    name: 'resources',
    component: ResourcesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/showcase',
    name: 'showcase',
    component: ShowcaseView,
    meta: { requiresAuth: true }
  }
]

// Create and export the router instance
const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode
  routes, // Pass our routes array
  // Always scroll to top when navigating to a new route
  scrollBehavior(to, from, savedPosition) {
    // If browser provides saved position (back/forward), use it
    if (savedPosition) return savedPosition
    return { left: 0, top: 0 }
  }
})

// Navigation Guard - runs before each route navigation
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Initialize auth from localStorage if not already done
  if (!authStore.isAuthenticated) {
    authStore.initializeAuth()
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // Redirect to login if not authenticated
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    // Allow navigation
    next()
  }
})

export default router

