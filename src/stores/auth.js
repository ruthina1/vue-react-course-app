/*
  AUTH STORE - Pinia Store for Authentication
  ============================================
  
  Pinia is Vue 3's official state management library.
  Stores hold reactive state that can be shared across components.
  
  Key Concepts:
  - defineStore(): Creates a Pinia store
  - state: Reactive data (like ref)
  - getters: Computed values derived from state
  - actions: Methods that can modify state
*/

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isAuthenticated = ref(false)

  // Getters
  const isLoggedIn = computed(() => isAuthenticated.value && user.value !== null)

  // Actions
  function login(email, password) {
    // In a real app, this would make an API call
    // For now, we'll simulate a login
    user.value = {
      email: email,
      name: email.split('@')[0]
    }
    isAuthenticated.value = true
    // Store in localStorage to persist across page refreshes
    localStorage.setItem('auth', JSON.stringify({ user: user.value, isAuthenticated: true }))
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('auth')
  }

  function register(email, password, name) {
    // In a real app, this would make an API call
    // For now, we'll simulate registration
    user.value = {
      email: email,
      name: name || email.split('@')[0]
    }
    isAuthenticated.value = true
    localStorage.setItem('auth', JSON.stringify({ user: user.value, isAuthenticated: true }))
  }

  function initializeAuth() {
    // Check localStorage on app start
    const stored = localStorage.getItem('auth')
    if (stored) {
      try {
        const auth = JSON.parse(stored)
        user.value = auth.user
        isAuthenticated.value = auth.isAuthenticated
      } catch (e) {
        console.error('Failed to parse auth from localStorage', e)
      }
    }
  }

  return {
    user,
    isAuthenticated,
    isLoggedIn,
    login,
    logout,
    register,
    initializeAuth
  }
})

