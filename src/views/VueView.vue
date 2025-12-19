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
      courseId="vue"
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
import { useCourseData } from '../composables/useCourseData'

const vueStats = ref([
  { value: '30+', label: 'Components' },
  { value: '60+', label: 'Lessons' },
  { value: '500+', label: 'Students' }
])

const { vueModules } = useCourseData()
</script>
