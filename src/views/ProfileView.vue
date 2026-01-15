<template>
  <div class="min-h-screen bg-gray-50">
    <Navigation />
    
    <div class="pt-16 pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Profile Header -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div class="flex items-center space-x-6">
            <div class="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {{ userInitials }}
            </div>
            <div class="flex-1">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ userDisplayName }}</h1>
              <p class="text-gray-600">{{ authStore.user?.email }}</p>
              <p class="text-sm text-gray-500 mt-1">Member since {{ memberSince }}</p>
            </div>
            <button 
              @click="handleLogout"
              class="btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>

        <!-- Profile Sections -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Account Settings -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <User :size="24" class="mr-2" />
              Account Settings
            </h2>
            
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  v-model="profileForm.name"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  v-model="profileForm.email"
                  type="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="your@email.com"
                  disabled
                />
                <p class="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              
              <button 
                @click="updateProfile"
                class="btn-primary w-full"
                :disabled="isSaving"
              >
                {{ isSaving ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </div>

          <!-- Learning Progress -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp :size="24" class="mr-2" />
              Learning Progress
            </h2>
            
            <div class="space-y-6">
              <!-- Vue Progress -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-gray-700">Vue.js Course</span>
                  <span class="text-sm text-gray-600">{{ vueProgress }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: vueProgress + '%' }"
                  ></div>
                </div>
              </div>
              
              <!-- React Progress -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-gray-700">React Course</span>
                  <span class="text-sm text-gray-600">{{ reactProgress }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: reactProgress + '%' }"
                  ></div>
                </div>
              </div>
              
              <div class="pt-4 border-t border-gray-200">
                <div class="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div class="text-2xl font-bold text-gray-900">{{ completedLessons }}</div>
                    <div class="text-sm text-gray-600">Lessons Completed</div>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-gray-900">{{ totalLessons }}</div>
                    <div class="text-sm text-gray-600">Total Lessons</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:col-span-2">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock :size="24" class="mr-2" />
              Recent Activity
            </h2>
            
            <div v-if="recentActivity.length > 0" class="space-y-4">
              <div 
                v-for="(activity, index) in recentActivity" 
                :key="index"
                class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen :size="20" class="text-blue-600" />
                </div>
                <div class="flex-1">
                  <p class="font-medium text-gray-900">{{ activity.title }}</p>
                  <p class="text-sm text-gray-600">{{ activity.course }}</p>
                </div>
                <div class="text-sm text-gray-500">{{ activity.date }}</div>
              </div>
            </div>
            <div v-else class="text-center py-12 text-gray-500">
              <BookOpen :size="48" class="mx-auto mb-4 text-gray-300" />
              <p>No recent activity</p>
              <p class="text-sm mt-2">Start learning to see your progress here!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Navigation from '../components/Navigation.vue'
import { User, TrendingUp, Clock, BookOpen } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const profileForm = ref({
  name: '',
  email: ''
})

const isSaving = ref(false)
const vueProgress = ref(0)
const reactProgress = ref(0)
const completedLessons = ref(0)
const totalLessons = ref(0)
const recentActivity = ref([])

const userDisplayName = computed(() => {
  return profileForm.value.name || authStore.user?.name || authStore.user?.email?.split('@')[0] || 'User'
})

const userInitials = computed(() => {
  const name = userDisplayName.value
  const parts = name.split(' ')
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
})

const memberSince = computed(() => {
  // Get from localStorage or use current date
  const stored = localStorage.getItem('auth')
  if (stored) {
    try {
      const auth = JSON.parse(stored)
      if (auth.createdAt) {
        return new Date(auth.createdAt).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        })
      }
    } catch (e) {
      console.error('Error parsing auth data', e)
    }
  }
  return new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  })
})

function updateProfile() {
  isSaving.value = true
  // Simulate API call
  setTimeout(() => {
    // Update auth store
    if (authStore.user) {
      authStore.user.name = profileForm.value.name
      // Update localStorage
      const stored = localStorage.getItem('auth')
      if (stored) {
        try {
          const auth = JSON.parse(stored)
          auth.user.name = profileForm.value.name
          localStorage.setItem('auth', JSON.stringify(auth))
        } catch (e) {
          console.error('Error updating profile', e)
        }
      }
    }
    isSaving.value = false
    alert('Profile updated successfully!')
  }, 500)
}

function handleLogout() {
  authStore.logout()
  router.push('/')
}

function loadProgress() {
  // Calculate progress from localStorage or API
  // For now, simulate some progress
  vueProgress.value = 15
  reactProgress.value = 8
  completedLessons.value = 12
  totalLessons.value = 80
  
  // Load recent activity
  recentActivity.value = [
    {
      title: 'Completed: Text interpolation {{ }}',
      course: 'Vue.js Mastery',
      date: '2 days ago'
    },
    {
      title: 'Completed: Directives',
      course: 'Vue.js Mastery',
      date: '3 days ago'
    },
    {
      title: 'Started: Components',
      course: 'React Ecosystem',
      date: '5 days ago'
    }
  ]
}

onMounted(() => {
  if (!authStore.isLoggedIn) {
    router.push('/login')
    return
  }
  
  // Initialize form
  profileForm.value = {
    name: authStore.user?.name || '',
    email: authStore.user?.email || ''
  }
  
  loadProgress()
})
</script>

