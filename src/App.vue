<!--
  APP.VUE - Root Component
  =========================
  
  This is the root component of our Vue application. Every Vue app needs a root component.
  
  Vue Single File Component (SFC) Structure:
  - <template>: HTML markup (with Vue directives)
  - <script setup>: JavaScript logic (using Composition API)
  - <style>: Component-specific CSS
  
  Key Concepts:
  - <template>: Where we write our HTML. Vue directives like v-if, v-for, @click work here
  - <script setup>: Modern Vue 3 syntax. Variables and functions are automatically available in template
  - <router-view>: A special component that displays the current route's component
-->

<template>
  <!-- 
    The root div wraps our entire application
    We use Tailwind classes for styling
  -->
  <div id="app" class="min-h-screen bg-white">
    <!-- 
      RouterView Component
      ====================
      This is a special component from vue-router that displays different components
      based on the current URL route. When you navigate to different pages, router-view
      swaps out the component being displayed.
      
      Example:
      - /home -> shows HomeView component
      - /about -> shows AboutView component
    -->
    <router-view />
  </div>
</template>

<script setup>
/*
  SCRIPT SETUP - Composition API
  ===============================
  
  The <script setup> syntax is Vue 3's modern way to write components.
  
  Benefits:
  - Less boilerplate code
  - Better TypeScript support
  - Variables and functions are automatically exposed to template
  
  In this component, we don't need any logic yet, so the script is empty.
  But this is where you'd define:
  - Reactive data (using ref, reactive)
  - Computed properties (using computed)
  - Methods (regular functions)
  - Lifecycle hooks (onMounted, onUnmounted, etc.)
*/
</script>

<style scoped>
/* 
  SCOPED STYLES
  =============
  
  The "scoped" attribute means these styles only apply to this component.
  Without "scoped", styles would leak to other components (global styles).
  
  For this app, we're using Tailwind CSS, so we don't need much custom CSS here.
*/
</style>

