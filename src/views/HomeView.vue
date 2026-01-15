<!--
  HOMEVIEW.VUE - Home Page Component
  ===================================
  
  This is the main landing page component. It will contain:
  - Navigation header
  - Hero section
  - Resource cards
  - Showcase section
  - Footer
  
  Component Composition:
  We break the page into smaller, reusable components. This makes code:
  - More maintainable
  - Easier to test
  - Reusable across pages
-->

<template>
  <div class="min-h-screen">
    <!-- Navigation Component -->
    <Navigation />
    
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Vue Course Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-block px-3 py-1 bg-black/5 rounded-full mb-6 text-xs font-medium text-gray-700">
            PART OF THE MEMBERSHIP
          </div>
          <h2 class="text-5xl md:text-6xl font-light text-black mb-6 tracking-tight">Vue.js Mastery</h2>
          <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Master Vue.js 3 with Composition API. Build specific components, learn state management with Pinia, and create scalable applications.
          </p>
          <router-link 
            to="/vue" 
            class="inline-block mt-8 btn-primary"
          >
            Start Vue Course →
          </router-link>
        </div>
        <CourseRoadmap 
          title=""
          description=""
          :modules="vueModules.slice(0, 3)"
          courseId="vue"
        />
      </div>
    </section>
    
    <!-- React Course Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-block px-3 py-1 bg-black/5 rounded-full mb-6 text-xs font-medium text-gray-700">
            PART OF THE MEMBERSHIP
          </div>
          <h2 class="text-5xl md:text-6xl font-light text-black mb-6 tracking-tight">React Ecosystem</h2>
          <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Deep dive into React 18, Hooks, Context, and Redux. Build modern, interactive web applications with the most popular library.
          </p>
          <router-link 
            to="/react" 
            class="inline-block mt-8 btn-primary"
          >
            Start React Course →
          </router-link>
        </div>
        <CourseRoadmap 
          title=""
          description=""
          :modules="reactModules.slice(0, 3)"
          courseId="react"
        />
      </div>
    </section>
    
    <!-- Feature Highlights Section -->
    <FeatureHighlights />
    
    <!-- Resources Section - Only visible when logged in -->
    <ResourcesSection v-if="authStore.isLoggedIn" />
    
    <!-- Showcase Section - Only visible when logged in -->
    <ShowcaseSection v-if="authStore.isLoggedIn" />
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
/*
  IMPORTING COMPONENTS
  ====================
  
  In Vue, you import components and then use them in your template.
  Components must be imported before they can be used.
  
  Component naming convention:
  - PascalCase for component names (Navigation, HeroSection)
  - Components are automatically available in template when imported
*/

import { onMounted } from 'vue'
import Navigation from '../components/Navigation.vue'
import HeroSection from '../components/HeroSection.vue'
import FeatureHighlights from '../components/FeatureHighlights.vue'
import ResourcesSection from '../components/ResourcesSection.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import Footer from '../components/Footer.vue'
import CourseRoadmap from '../components/CourseRoadmap.vue'
import { useAuthStore } from '../stores/auth'
import { useCourseData } from '../composables/useCourseData'

const authStore = useAuthStore()
const { vueModules, reactModules } = useCourseData()

// Initialize auth on mount
onMounted(() => {
  authStore.initializeAuth()
})
</script>

<style scoped>
/* Component-specific styles if needed */
</style>

