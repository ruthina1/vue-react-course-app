<!--
  HEROSECTION.VUE - Hero/Banner Component
  ========================================
  
  This component demonstrates:
  - Props (passing data from parent)
  - Template interpolation with {{ }}
  - Event handling
  - Styling with Tailwind CSS
  
  Vue Concepts:
  - Props: Data passed from parent component (like function parameters)
  - Template interpolation: {{ }} displays reactive data
  - @click: Event handlers
-->

<template>
  <section class="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
    </div>

    <div class="max-w-7xl mx-auto text-center">
      <!-- Badge -->
      <div class="inline-flex items-center px-4 py-2 bg-black/5 rounded-full mb-8">
        <span class="text-sm font-medium text-gray-700">{{ badgeText }}</span>
      </div>

      <!-- Main Heading -->
      <!-- 
        TEMPLATE INTERPOLATION
        ======================
        {{ }} is used to display reactive data in templates.
        Vue automatically updates the DOM when the data changes.
      -->
      <h1 class="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
        {{ title }}
      </h1>

      <!-- Subheading -->
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">
        {{ subtitle }}
      </h2>

      <!-- Description -->
      <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
        {{ description }}
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <!-- 
          @click EVENT HANDLER
          ====================
          @click is shorthand for v-on:click
          When button is clicked, the handleGetStarted function runs
        -->
        <button @click="handleGetStarted" class="btn-primary text-lg px-8 py-4">
          Get Started
        </button>
        <button @click="handleExplore" class="btn-secondary text-lg px-8 py-4">
          Explore Resources
        </button>
      </div>

      <!-- Stats -->
      <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <!-- 
            v-for DIRECTIVE
            ================
            Loops through an array and renders template for each item.
            :key is required for Vue to track each element efficiently.
            
            Syntax: v-for="item in array" :key="uniqueIdentifier"
          -->
          <div class="text-4xl font-bold text-black mb-2">{{ stat.value }}</div>
          <div class="text-gray-600">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/*
  PROPS DEFINITION
  ================
  
  defineProps() is a compiler macro used to define props in <script setup>.
  It doesn't need to be imported.
*/

const props = defineProps({
  badgeText: {
    type: String,
    default: '🎓 Learn Vue.js & React'
  },
  title: {
    type: String,
    default: 'Dev Toolkit'
  },
  subtitle: {
    type: String,
    default: 'Built to Flex'
  },
  description: {
    type: String,
    default: 'Platform packed with Vue.js & React resources, components, lessons and interactive examples. Learn by building real-world projects step by step.'
  },
  stats: {
    type: Array,
    default: () => [
      { value: '50+', label: 'Components' },
      { value: '100+', label: 'Lessons' },
      { value: '1K+', label: 'Students' }
    ]
  }
})

/*
  EVENT HANDLER FUNCTIONS
  ========================
  
  These functions are called when buttons are clicked.
  In a real app, these might:
  - Navigate to different pages
  - Open modals
  - Scroll to sections
  - Trigger animations
*/

function handleGetStarted() {
  // Scroll to resources section
  const element = document.getElementById('resources')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

function handleExplore() {
  // Scroll to showcase section
  const element = document.getElementById('showcase')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* Component-specific styles */
</style>

