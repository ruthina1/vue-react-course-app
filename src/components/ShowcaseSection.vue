<!--
  SHOWCASESECTION.VUE - Showcase/Projects Component
  ==================================================
  
  This component demonstrates:
  - Nested v-for loops
  - Conditional rendering
  - More complex data structures
  - Image handling (placeholder for now)
-->

<template>
  <section id="showcase" class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-black mb-4">
          Made with Vue & React
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          See what you can build with the skills you'll learn
        </p>
      </div>

      <!-- Showcase Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="project in projects"
          :key="project.id"
          class="group cursor-pointer"
        >
          <!-- Project Card -->
          <div class="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-black transition-colors">
            <!-- Project Image Placeholder -->
            <div class="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <span class="text-4xl">{{ project.emoji }}</span>
            </div>

            <!-- Project Info -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-black mb-2">{{ project.name }}</h3>
              <p class="text-gray-600 mb-4">{{ project.description }}</p>

              <!-- Resources Used -->
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-500">{{ project.resourcesUsed }} Resources Used</span>
                </div>
                <a href="#" class="text-black font-medium hover:underline">
                  View →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="mt-20 text-center">
        <p class="text-xl text-gray-600 mb-6">These folks are talented</p>
        <button class="btn-secondary">
          Explore Showcase
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Projects showcase data
const projects = ref([
  {
    id: 1,
    name: 'E-Commerce Platform',
    description: 'Full-featured shopping experience built with Vue 3',
    resourcesUsed: 8,
    emoji: '🛒'
  },
  {
    id: 2,
    name: 'Dashboard App',
    description: 'Modern admin dashboard with React and TypeScript',
    resourcesUsed: 12,
    emoji: '📊'
  },
  {
    id: 3,
    name: 'Social Media Feed',
    description: 'Real-time feed built with Vue Composition API',
    resourcesUsed: 5,
    emoji: '📱'
  },
  {
    id: 4,
    name: 'Portfolio Website',
    description: 'Stunning portfolio with React and Framer Motion',
    resourcesUsed: 7,
    emoji: '🎨'
  },
  {
    id: 5,
    name: 'Task Manager',
    description: 'Productivity app with Vue 3 and Pinia',
    resourcesUsed: 6,
    emoji: '✅'
  },
  {
    id: 6,
    name: 'Music Player',
    description: 'Beautiful music player UI with React hooks',
    resourcesUsed: 4,
    emoji: '🎵'
  }
])
</script>

<style scoped>
/* Component-specific styles */
</style>

