<!--
  NAVIGATION.VUE - Header/Navigation Component
  ============================================
  
  This component demonstrates:
  - Reactive state with ref()
  - Event handling with @click
  - Conditional rendering with v-if
  - Class binding with :class
  - Computed properties
  
  Vue Concepts Used:
  - ref(): Creates reactive reference (data that can change and trigger re-renders)
  - @click: Event listener shorthand (same as v-on:click)
  - v-if: Conditionally renders element (removes from DOM if false)
  - :class: Dynamic class binding (shorthand for v-bind:class)
-->

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="text-2xl font-bold text-black">
            VueReact Course
          </router-link>
        </div>

        <!-- Desktop Navigation Links -->
        <div v-if="authStore.isLoggedIn" class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/vue" 
            class="transition-colors relative"
            :class="isActive('/vue') ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'"
          >
            Vue Course
            <span v-if="isActive('/vue')" class="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></span>
          </router-link>
          <router-link 
            to="/react" 
            class="transition-colors relative"
            :class="isActive('/react') ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'"
          >
            React Course
            <span v-if="isActive('/react')" class="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></span>
          </router-link>
          <router-link 
            to="/resources" 
            class="transition-colors relative"
            :class="isActive('/resources') ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'"
          >
            Resources
            <span v-if="isActive('/resources')" class="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></span>
          </router-link>
          <router-link 
            to="/showcase" 
            class="transition-colors relative"
            :class="isActive('/showcase') ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'"
          >
            Showcase
            <span v-if="isActive('/showcase')" class="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></span>
          </router-link>
        </div>

        <!-- CTA Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <template v-if="authStore.isLoggedIn">
            <router-link 
              to="/profile" 
              class="transition-colors relative"
              :class="isActive('/profile') ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'"
            >
              {{ authStore.user?.name || 'Profile' }}
              <span v-if="isActive('/profile')" class="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></span>
            </router-link>
            <button @click="handleLogout" class="text-gray-700 hover:text-black transition-colors">
              Logout
            </button>
          </template>
          <template v-else>
            <router-link to="/login" class="text-gray-700 hover:text-black transition-colors">
              Login
            </router-link>
            <router-link to="/join" class="btn-primary">
              Join
            </router-link>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-md text-gray-700 hover:text-black"
          aria-label="Toggle menu"
        >
          <!-- 
            v-if Directive
            ===============
            Conditionally renders the hamburger or X icon based on isMobileMenuOpen state.
            When isMobileMenuOpen is true, show X icon, otherwise show hamburger.
          -->
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <!-- 
        v-if Directive for Mobile Menu
        ===============================
        The mobile menu only appears when isMobileMenuOpen is true.
        Vue removes this element from the DOM when false, improving performance.
      -->
      <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-gray-200">
        <div class="flex flex-col space-y-4">
          <template v-if="authStore.isLoggedIn">
            <router-link 
              to="/vue" 
              class="transition-colors"
              :class="isActive('/vue') ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'"
              @click="toggleMobileMenu"
            >
              Vue Course
            </router-link>
            <router-link 
              to="/react" 
              class="transition-colors"
              :class="isActive('/react') ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'"
              @click="toggleMobileMenu"
            >
              React Course
            </router-link>
            <router-link 
              to="/resources" 
              class="transition-colors"
              :class="isActive('/resources') ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'"
              @click="toggleMobileMenu"
            >
              Resources
            </router-link>
            <router-link 
              to="/showcase" 
              class="transition-colors"
              :class="isActive('/showcase') ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'"
              @click="toggleMobileMenu"
            >
              Showcase
            </router-link>
            <div class="flex flex-col space-y-2 pt-4 border-t border-gray-200">
              <router-link 
                to="/profile" 
                class="text-left transition-colors"
                :class="isActive('/profile') ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'"
                @click="toggleMobileMenu"
              >
                {{ authStore.user?.name || 'Profile' }}
              </router-link>
              <button @click="handleLogout" class="text-left text-gray-700 hover:text-black transition-colors">
                Logout
              </button>
            </div>
          </template>
          <template v-else>
            <div class="flex flex-col space-y-2 pt-4 border-t border-gray-200">
              <router-link to="/login" class="text-left text-gray-700 hover:text-black transition-colors" @click="toggleMobileMenu">
                Login
              </router-link>
              <router-link to="/join" class="btn-primary w-full" @click="toggleMobileMenu">
                Join
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
/*
  REACTIVE STATE WITH ref()
  =========================
  
  ref() creates a reactive reference. When the value changes, Vue automatically
  re-renders any parts of the template that use this value.
  
  Why use ref()?
  - Makes data reactive (changes trigger UI updates)
  - Can be used for primitives (strings, numbers, booleans) or objects
  - Access value with .value in script, but NOT in template
  
  Example:
  const count = ref(0)
  count.value = 1  // In script, use .value
  {{ count }}      // In template, Vue automatically unwraps ref
*/

import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Create reactive state for mobile menu
// Initial value is false (menu is closed)
const isMobileMenuOpen = ref(false)

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Initialize auth on component mount
authStore.initializeAuth()

// Check if route is active
function isActive(path) {
  if (path === '/vue' || path === '/react') {
    return route.path === path || route.path.startsWith(path + '/lesson')
  }
  return route.path === path
}

/*
  METHODS/FUNCTIONS
  ==================
  
  In <script setup>, you define regular JavaScript functions.
  These functions are automatically available in the template.
  
  Functions can:
  - Modify reactive state
  - Perform calculations
  - Call APIs
  - Handle events
*/

// Toggle mobile menu open/closed
function toggleMobileMenu() {
  // Modify reactive state - this triggers re-render
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Handle logout
function handleLogout() {
  authStore.logout()
  router.push('/')
  toggleMobileMenu()
}
</script>

<style scoped>
/* Component-specific styles */
</style>

