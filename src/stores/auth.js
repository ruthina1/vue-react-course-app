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

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3001/api'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isAuthenticated = ref(false)

  // Getters
  const isLoggedIn = computed(() => isAuthenticated.value && user.value !== null)

  // Actions
  async function login(email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')

      user.value = data.user
      isAuthenticated.value = true
      // Save token + user
      localStorage.setItem('auth', JSON.stringify({ token: data.token, user: data.user }))
      return { ok: true }
    } catch (err) {
      console.error('Login error:', err)
      return { ok: false, error: err.message }
    }
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('auth')
  }

  async function register(username, email, password, full_name) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, full_name })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')

      user.value = data.user
      isAuthenticated.value = true
      localStorage.setItem('auth', JSON.stringify({ token: data.token, user: data.user }))
      return { ok: true }
    } catch (err) {
      console.error('Registration error:', err)
      return { ok: false, error: err.message }
    }
  }

  function initializeAuth() {
    // Check localStorage on app start
    const stored = localStorage.getItem('auth')
    if (stored) {
      try {
        const auth = JSON.parse(stored)
        user.value = auth.user
        isAuthenticated.value = !!auth.token
        // Optionally keep token separately
        // localStorage token is stored as auth.token
      } catch (e) {
        console.error('Failed to parse auth from localStorage', e)
      }
    }
  }

  function checkEmailExists(email) {
    // Normalize email for comparison (case-insensitive, trimmed)
    const normalizedEmail = email?.toLowerCase().trim()
    if (!normalizedEmail) return false

    // Check localStorage for registered email
    const stored = localStorage.getItem('auth')
    if (stored) {
      try {
        const auth = JSON.parse(stored)
        const storedEmail = auth.user?.email?.toLowerCase().trim()
        return storedEmail === normalizedEmail
      } catch (e) {
        console.error('Failed to parse auth from localStorage', e)
        return false
      }
    }
    return false
  }

  return {
    user,
    isAuthenticated,
    isLoggedIn,
    login,
    logout,
    register,
    initializeAuth,
    checkEmailExists
  }
})

