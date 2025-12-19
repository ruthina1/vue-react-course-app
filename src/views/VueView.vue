<!--
  VUEVIEW.VUE - Vue Course Page
  =============================
  
  This view displays the Vue-specific content.
-->

<template>
  <div class="min-h-screen">
    <!-- Navigation Component -->
    <Navigation />
    
    <!-- Hero Section -->
    <HeroSection 
      badgeText="🎓 Learn Vue.js"
      title="Vue.js Mastery"
      subtitle="The Progressive Framework"
      description="Master Vue.js 3 with Composition API. Build specific components, learn state management with Pinia, and create scalable applications."
      :stats="vueStats"
    />
    
    <!-- Roadmap Section -->
    <CourseRoadmap 
      title="Vue.js Learning Roadmap"
      description="A comprehensive guide to mastering Vue.js, from fundamentals to advanced topics."
      :modules="vueModules"
    />
    
    <!-- Resources Section -->
    <ResourcesSection topic="vue" />
    
    <!-- Showcase Section -->
    <ShowcaseSection />
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navigation from '../components/Navigation.vue'
import HeroSection from '../components/HeroSection.vue'
import ResourcesSection from '../components/ResourcesSection.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import Footer from '../components/Footer.vue'
import CourseRoadmap from '../components/CourseRoadmap.vue'

const vueStats = ref([
  { value: '30+', label: 'Components' },
  { value: '60+', label: 'Lessons' },
  { value: '500+', label: 'Students' }
])

const vueModules = ref([
  {
    title: "Web Fundamentals (Prerequisite)",
    description: "Before diving into Vue.js, ensure you have a solid foundation in web development basics.",
    items: [
      { text: "HTML basics", isPractice: false },
      { text: "CSS basics (Flexbox, Grid)", isPractice: false },
      { 
        text: "JavaScript (ES6+)", 
        isPractice: false,
        children: ["let / const", "Arrow functions", "Destructuring", "Modules", "Promises & async/await"]
      }
    ]
  },
  {
    title: "Vue Basics",
    description: "Get started with Vue.js fundamentals and project structure.",
    items: [
      { text: "What is Vue & how it works", isPractice: false },
      { text: "Creating a Vue app", isPractice: false },
      { text: "Vue project structure", isPractice: false },
      { 
        text: "Single File Components (SFC)", 
        isPractice: false,
        children: ["<template>", "<script setup>", "<style>"]
      }
    ]
  },
  {
    title: "Template Syntax",
    description: "Learn how to write Vue templates and use directives.",
    items: [
      { text: "Text interpolation {{ }}", isPractice: false },
      { 
        text: "Directives", 
        isPractice: false,
        children: ["v-if, v-else", "v-for", "v-show"]
      },
      { text: "Event handling @click", isPractice: false },
      { text: "Attribute binding :class, :style", isPractice: false },
      { text: "Two-way binding v-model", isPractice: false }
    ]
  },
  {
    title: "Reactivity System",
    description: "Understand Vue's powerful reactivity system.",
    items: [
      { text: "ref() and reactive()", isPractice: false },
      { text: "Computed properties", isPractice: false },
      { text: "Watchers (watch, watchEffect)", isPractice: false },
      { 
        text: "Lifecycle hooks", 
        isPractice: false,
        children: ["onMounted", "onUpdated", "onUnmounted"]
      }
    ]
  },
  {
    title: "Components",
    description: "Master component-based architecture in Vue.",
    items: [
      { text: "Creating components", isPractice: false },
      { text: "Props", isPractice: false },
      { text: "Emits", isPractice: false },
      { text: "Slots", isPractice: false },
      { text: "Dynamic components", isPractice: false },
      { text: "Component registration", isPractice: false }
    ]
  },
  {
    title: "Forms & User Input",
    description: "Handle user input and form validation effectively.",
    items: [
      { text: "Handling forms", isPractice: false },
      { text: "Input validation", isPractice: false },
      { text: "Custom input components", isPractice: false },
      { text: "v-model with components", isPractice: false }
    ]
  },
  {
    title: "Vue Router",
    description: "Implement navigation and routing in your Vue applications.",
    items: [
      { text: "Routing basics", isPractice: false },
      { text: "Route params & query", isPractice: false },
      { text: "Nested routes", isPractice: false },
      { text: "Navigation guards", isPractice: false },
      { text: "Lazy loading routes", isPractice: false }
    ]
  },
  {
    title: "State Management",
    description: "Manage application state with Pinia.",
    items: [
      { text: "Pinia basics", isPractice: false },
      { text: "Store state", isPractice: false },
      { text: "Getters", isPractice: false },
      { text: "Actions", isPractice: false },
      { text: "Store modules", isPractice: false },
      { text: "Persisting state", isPractice: false }
    ]
  },
  {
    title: "API Integration",
    description: "Connect your Vue app to backend services.",
    items: [
      { text: "Fetch / Axios", isPractice: false },
      { text: "Async data handling", isPractice: false },
      { text: "Loading & error states", isPractice: false },
      { text: "Environment variables", isPractice: false },
      { text: "Authentication basics", isPractice: false }
    ]
  },
  {
    title: "Composables",
    description: "Create reusable composition functions.",
    items: [
      { text: "Creating composables", isPractice: false },
      { text: "Reusing logic", isPractice: false },
      { text: "Separation of concerns", isPractice: false },
      { text: "Best practices", isPractice: false }
    ]
  },
  {
    title: "Styling & UI",
    description: "Style your Vue applications beautifully.",
    items: [
      { text: "Scoped styles", isPractice: false },
      { text: "CSS Modules", isPractice: false },
      { text: "CSS preprocessors (SCSS)", isPractice: false },
      { text: "UI frameworks (Vuetify, Element Plus, Naive UI)", isPractice: false },
      { text: "Responsive design", isPractice: false }
    ]
  },
  {
    title: "Testing",
    description: "Ensure code quality with comprehensive testing.",
    items: [
      { text: "Unit testing with Vitest", isPractice: false },
      { text: "Component testing", isPractice: false },
      { text: "Mocking APIs", isPractice: false },
      { text: "Basic E2E testing (Cypress / Playwright)", isPractice: false }
    ]
  },
  {
    title: "Performance & Optimization",
    description: "Optimize your Vue applications for production.",
    items: [
      { text: "Code splitting", isPractice: false },
      { text: "Lazy loading components", isPractice: false },
      { text: "Memoization", isPractice: false },
      { text: "Devtools usage", isPractice: false }
    ]
  },
  {
    title: "Build & Deployment",
    description: "Prepare and deploy your Vue applications.",
    items: [
      { text: "Vite", isPractice: false },
      { text: "Environment configs", isPractice: false },
      { text: "Production builds", isPractice: false },
      { text: "Deployment (Netlify, Vercel, etc.)", isPractice: false }
    ]
  },
  {
    title: "Advanced Topics",
    description: "Explore advanced Vue.js concepts and patterns.",
    items: [
      { text: "Server-Side Rendering (Nuxt)", isPractice: false },
      { text: "Static Site Generation", isPractice: false },
      { text: "Internationalization (i18n)", isPractice: false },
      { text: "Accessibility (a11y)", isPractice: false },
      { text: "Security best practices", isPractice: false }
    ]
  },
  {
    title: "Ecosystem & Tooling",
    description: "Familiarize yourself with Vue's ecosystem and development tools.",
    items: [
      { text: "Vue Devtools", isPractice: false },
      { text: "ESLint & Prettier", isPractice: false },
      { text: "Git basics", isPractice: false },
      { text: "Project structure conventions", isPractice: false }
    ]
  },
  {
    title: "Final Step: Build & Practice",
    description: "The best way to solidify your Vue.js knowledge is through hands-on practice.",
    items: [
      { text: "Build real projects", isPractice: true },
      { text: "Read open-source Vue code", isPractice: true },
      { text: "Refactor and improve existing apps", isPractice: true }
    ]
  }
])
</script>
