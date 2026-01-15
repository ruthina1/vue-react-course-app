<!--
  REACTVIEW.VUE - React Course Page
  =================================
  
  This view displays the React-specific content.
-->

<template>
  <div class="min-h-screen">
    <!-- Navigation Component -->
    <Navigation />
    
    <!-- Roadmap Section - Direct to Course -->
    <CourseRoadmap 
      title="React Learning Roadmap"
      description="Master React through practical, hands-on modules."
      :modules="reactModules"
      courseId="react"
    />
    
    <!-- Resources Section -->
    <ResourcesSection topic="react" />
    
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

const { reactModules } = useCourseData()
</script>
