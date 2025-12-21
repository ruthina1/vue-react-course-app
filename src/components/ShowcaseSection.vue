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
            <!-- Project Screenshot Mockup -->
            <div class="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
              <!-- Browser/App Mockup Frame -->
              <div class="absolute inset-0 flex items-center justify-center p-4">
                <div class="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden" :class="project.mockupClass">
                  <!-- Mockup Content -->
                  <div class="h-full flex flex-col">
                    <!-- Browser Bar (for web apps) -->
                    <div v-if="project.type === 'web'" class="bg-gray-100 px-3 py-2 flex items-center gap-2 border-b border-gray-200">
                      <div class="flex gap-1.5">
                        <div class="w-3 h-3 rounded-full bg-red-400"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div class="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div class="flex-1 bg-white rounded px-2 py-1 text-xs text-gray-500 ml-2">
                        {{ project.url }}
                      </div>
                    </div>
                    <!-- Mobile Frame (for mobile apps) -->
                    <div v-if="project.type === 'mobile'" class="flex-1 p-2">
                      <div class="h-full bg-gray-50 rounded-lg p-3">
                        <div class="space-y-2">
                          <div class="h-3 bg-gray-200 rounded w-3/4"></div>
                          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                    <!-- App Content -->
                    <div class="flex-1 p-4" :class="project.contentClass">
                      <component :is="project.iconComponent" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <div class="space-y-2">
                        <div v-for="i in 3" :key="i" class="h-2 bg-gray-200 rounded" :style="{ width: project.barWidths[i-1] }"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

// Icon Components
const ShoppingCartIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
    </svg>
  `
}

const ChartBarIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
    </svg>
  `
}

const DeviceMobileIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
    </svg>
  `
}

const PaletteIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
    </svg>
  `
}

const CheckCircleIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  `
}

const MusicNoteIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
    </svg>
  `
}

// Projects showcase data
const projects = ref([
  {
    id: 1,
    name: 'E-Commerce Platform',
    description: 'Full-featured shopping experience built with Vue 3',
    resourcesUsed: 8,
    iconComponent: ShoppingCartIcon,
    type: 'web',
    url: 'shop.example.com',
    mockupClass: 'ecommerce-mockup',
    contentClass: 'bg-white',
    barWidths: ['80%', '60%', '75%']
  },
  {
    id: 2,
    name: 'Dashboard App',
    description: 'Modern admin dashboard with React and TypeScript',
    resourcesUsed: 12,
    iconComponent: ChartBarIcon,
    type: 'web',
    url: 'dashboard.example.com',
    mockupClass: 'dashboard-mockup',
    contentClass: 'bg-gray-50',
    barWidths: ['90%', '70%', '85%', '65%']
  },
  {
    id: 3,
    name: 'Social Media Feed',
    description: 'Real-time feed built with Vue Composition API',
    resourcesUsed: 5,
    iconComponent: DeviceMobileIcon,
    type: 'mobile',
    url: '',
    mockupClass: 'mobile-mockup',
    contentClass: 'bg-white',
    barWidths: ['85%', '70%', '90%']
  },
  {
    id: 4,
    name: 'Portfolio Website',
    description: 'Stunning portfolio with React and Framer Motion',
    resourcesUsed: 7,
    iconComponent: PaletteIcon,
    type: 'web',
    url: 'portfolio.example.com',
    mockupClass: 'portfolio-mockup',
    contentClass: 'bg-gradient-to-br from-purple-50 to-pink-50',
    barWidths: ['75%', '55%', '80%']
  },
  {
    id: 5,
    name: 'Task Manager',
    description: 'Productivity app with Vue 3 and Pinia',
    resourcesUsed: 6,
    iconComponent: CheckCircleIcon,
    type: 'web',
    url: 'tasks.example.com',
    mockupClass: 'task-mockup',
    contentClass: 'bg-white',
    barWidths: ['70%', '90%', '65%', '80%']
  },
  {
    id: 6,
    name: 'Music Player',
    description: 'Beautiful music player UI with React hooks',
    resourcesUsed: 4,
    iconComponent: MusicNoteIcon,
    type: 'mobile',
    url: '',
    mockupClass: 'music-mockup',
    contentClass: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    barWidths: ['60%', '75%', '50%']
  }
])
</script>

<style scoped>
/* Mockup Styles */
.ecommerce-mockup .flex-1 {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
}

.dashboard-mockup .flex-1 {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
}

.portfolio-mockup .flex-1 {
  background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
}

.task-mockup .flex-1 {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
}

.music-mockup .flex-1 {
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
}

.mobile-mockup .flex-1 {
  background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
}

/* Screenshot content animations */
.project-card:hover .aspect-video > div > div {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}

.aspect-video > div > div {
  transition: transform 0.3s ease;
}
</style>

