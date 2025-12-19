<!--
  FOOTER.VUE - Footer Component
  ==============================
  
  This component demonstrates:
  - Static content
  - Links organization
  - Social media links
  - Footer structure
-->

<template>
  <footer class="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Footer Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <!-- Brand Column -->
        <div>
          <h3 class="text-2xl font-bold mb-4">VueReact Course</h3>
          <p class="text-gray-400 mb-4">
            Learn Vue.js and React by building real projects. Step by step, component by component.
          </p>
        </div>

        <!-- Product Links -->
        <div>
          <h4 class="font-semibold mb-4">Product</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:text-white transition-colors">Resources</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Lessons</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Components</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Showcase</a></li>
          </ul>
        </div>

        <!-- Community Links -->
        <div>
          <h4 class="font-semibold mb-4">Community</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:text-white transition-colors">Discord</a></li>
            <li><a href="#" class="hover:text-white transition-colors">GitHub</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Twitter</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
          </ul>
        </div>

        <!-- Membership Links -->
        <div>
          <h4 class="font-semibold mb-4">Membership</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" class="hover:text-white transition-colors">FAQs</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Support</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Login</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm mb-4 md:mb-0">
          © 2025 VueReact Course. Built to learn Vue.js.
        </p>
        <div class="flex space-x-6 text-sm text-gray-400">
          <a href="#" class="hover:text-white transition-colors">Privacy</a>
          <a href="#" class="hover:text-white transition-colors">Terms</a>
          <a href="#" class="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer doesn't need any reactive state or logic
// It's a presentational component with static content
</script>

<style scoped>
/* Component-specific styles */
</style>

