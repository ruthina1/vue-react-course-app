<template>
  <div class="min-h-screen flex">
    <!-- Left Panel - Illustration -->
    <div class="hidden lg:flex lg:w-1/2 bg-yellow-50 items-center justify-center p-8">
      <div class="text-center">
        <h1 class="text-5xl font-bold text-purple-600 mb-6">Welcome back to BrainBite!</h1>
        <div class="mt-8">
          <!-- Placeholder for illustration - you can add actual images here -->
          <div class="mb-4">
            <GraduationCap :size="64" class="text-gray-800 mx-auto" />
          </div>
          <p class="text-xl text-gray-700">We're here to help you get back on track!</p>
        </div>
      </div>
    </div>

    <!-- Right Panel - Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center bg-white px-4 py-12">
      <div class="max-w-md w-full">
        <!-- Logo -->
        <div class="flex items-center mb-8">
          <div class="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
            <Brain :size="24" class="text-white" />
          </div>
          <span class="text-2xl font-bold text-gray-900">BrainBite</span>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-2">Forgot your password?</h2>
        <p class="text-gray-600 mb-6">Enter the email address associated with your account.</p>

        <form @submit.prevent="handlePasswordRecover" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              :class="[
                'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent',
                error ? 'border-red-500' : 'border-gray-300'
              ]"
              placeholder="your@email.com"
            />
            <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
            <p v-if="success" class="mt-2 text-sm text-green-600">{{ success }}</p>
          </div>

          <button
            type="submit"
            class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600">
            Remember your password?
            <router-link to="/login" class="text-purple-600 font-medium hover:underline">
              Login
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { GraduationCap, Brain } from 'lucide-vue-next'

const authStore = useAuthStore()
const email = ref('')
const error = ref('')
const success = ref('')
const isLoading = ref(false)

function handlePasswordRecover() {
  error.value = ''
  success.value = ''
  isLoading.value = true

  // Check if email exists using the auth store method
  setTimeout(() => {
    if (authStore.checkEmailExists(email.value)) {
      // Email found - simulate sending reset link
      success.value = 'Password reset link has been sent to your email address.'
      email.value = ''
    } else {
      error.value = 'No account found with this email address. Please check your email or create a new account.'
    }
    isLoading.value = false
  }, 500)
}
</script>

