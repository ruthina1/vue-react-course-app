<!--
  REACTVIEW.VUE - React Course Page
  =================================
  
  This view displays the React-specific content.
-->

<template>
  <div class="min-h-screen">
    <!-- Navigation Component -->
    <Navigation />
    
    <!-- Hero Section -->
    <HeroSection 
      badgeText="🎓 Learn React"
      title="React Ecosystem"
      subtitle="A JavaScript Library for Building UIs"
      description="Deep dive into React 18, Hooks, Context, and Redux. Build modern, interactive web applications with the most popular library."
      :stats="reactStats"
    />
    
    <!-- Resources Section -->
    <ResourcesSection topic="react" />
    
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

const reactStats = ref([
  { value: '40+', label: 'Patterns' },
  { value: '80+', label: 'Lessons' },
  { value: '700+', label: 'Students' }
])
</script>
