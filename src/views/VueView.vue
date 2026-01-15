<!--
  VUEVIEW.VUE - Vue Course Page
  =============================
  
  This view displays the Vue-specific content.
-->

<template>
  <div class="min-h-screen">
    <!-- Navigation Component -->
    <Navigation />
    
    <!-- Roadmap Section - Direct to Course -->
    <CourseRoadmap 
      title="Vue.js Learning Roadmap"
      description="A comprehensive guide to mastering Vue.js, from fundamentals to advanced topics."
      :modules="vueModules"
      courseId="vue"
    />
    
    <!-- Resources Section -->
    <ResourcesSection topic="vue" />
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue'
import ResourcesSection from '../components/ResourcesSection.vue'
import Footer from '../components/Footer.vue'
import CourseRoadmap from '../components/CourseRoadmap.vue'
import { useCourseData } from '../composables/useCourseData'

const { vueModules } = useCourseData()
</script>
