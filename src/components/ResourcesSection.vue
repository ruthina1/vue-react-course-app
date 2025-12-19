<!--
  RESOURCESSECTION.VUE - Resources Grid Component
  ===============================================
  
  This component demonstrates:
  - v-for with objects
  - Dynamic class binding
  - Component props (if we break cards into separate component)
  - Computed properties
  
  Vue Concepts:
  - v-for: Loop through arrays/objects
  - :class: Dynamic class binding
  - :key: Unique identifier for list items
-->

<template>
  <section id="resources" class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-black mb-4">
          The Platform
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          A growing toolkit for creative developers. Access everything with a single membership.
        </p>
      </div>

      <!-- Resources Grid -->
      <!-- 
        v-for DIRECTIVE WITH OBJECTS
        =============================
        We're looping through the resources array.
        Each resource object has: id, title, description, category, icon
        
        :key="resource.id" ensures Vue can efficiently track each card
        when the list changes (add, remove, reorder).
      -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="resource in filteredResources"
          :key="resource.id"
          class="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
        >
          <!-- Category Badge -->
          <div class="inline-block px-3 py-1 bg-gray-100 rounded-full mb-4">
            <span class="text-xs font-medium text-gray-700">{{ resource.category }}</span>
          </div>

          <!-- Icon/Emoji -->
          <div class="text-4xl mb-4">{{ resource.icon }}</div>

          <!-- Title -->
          <h3 class="text-xl font-bold text-black mb-2">{{ resource.title }}</h3>

          <!-- Description -->
          <p class="text-gray-600 mb-4">{{ resource.description }}</p>

          <!-- Learn More Link -->
          <a 
            v-if="resource.link" 
            :href="resource.link" 
            target="_blank"
            class="text-black font-medium hover:underline inline-flex items-center"
          >
            Learn More
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <span v-else class="text-gray-400 text-sm italic">
            Content coming soon
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/*
  REACTIVE DATA
  =============
  
  We filter resources based on the filtered topic prop using the useCourseData composable.
*/

import { computed } from 'vue'
import { useCourseData } from '../composables/useCourseData'

const props = defineProps({
  topic: {
    type: String,
    default: 'all' // 'all', 'vue', 'react'
  }
})

const { getResources } = useCourseData()

// Filter resources based on the topic prop
const filteredResources = computed(() => getResources(props.topic))
</script>

<style scoped>
/* Component-specific styles */
</style>

