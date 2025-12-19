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
    <!-- Fixed navigation adds padding-top to account for header height -->
    <Navigation />
    
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Resources Section -->
    <ResourcesSection />
    
    <!-- Showcase Section -->
    <ShowcaseSection />
    
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

import Navigation from '../components/Navigation.vue'
import HeroSection from '../components/HeroSection.vue'
import ResourcesSection from '../components/ResourcesSection.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import Footer from '../components/Footer.vue'
</script>

<style scoped>
/* Component-specific styles if needed */
</style>

