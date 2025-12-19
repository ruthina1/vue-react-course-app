<!--
  COURSEROADMAP.VUE - Course Curriculum/Roadmap Component
  =======================================================
  
  This component renders a structured list of modules/sections for a course.
  It supports nested items and highlights practice tasks.
-->

<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-black mb-4">{{ title }}</h2>
        <p v-if="description" class="text-lg text-gray-600">{{ description }}</p>
      </div>

      <div class="space-y-8">
        <!-- Module/Section Loop -->
        <div v-for="(module, index) in modules" :key="index" class="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
          <!-- Module Header -->
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-100">
            <h3 class="text-xl font-bold text-gray-900 flex items-center">
              <span class="bg-black text-white text-xs px-2 py-1 rounded-md mr-3">Module {{ index + 1 }}</span>
              {{ module.title }}
            </h3>
            <p v-if="module.description" class="text-gray-600 mt-1 text-sm">{{ module.description }}</p>
          </div>

          <!-- Module Content -->
          <div class="px-6 py-4">
            <ul class="space-y-3">
              <li v-for="(item, itemIndex) in module.items" :key="itemIndex" class="flex items-start">
                <!-- Checkbox styling (visual only for now) -->
                <div class="flex-shrink-0 mt-1">
                  <div class="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center">
                    <!-- Checkmark placeholder -->
                  </div>
                </div>
                
                <div class="ml-4 flex-1">
                  <span :class="{'font-bold text-blue-600': item.isPractice, 'text-gray-700': !item.isPractice}">
                    <span v-if="item.isPractice" class="mr-1">🛠️</span>
                    {{ item.text }}
                  </span>

                  <!-- Nested Items -->
                  <ul v-if="item.children && item.children.length" class="mt-2 ml-4 space-y-2">
                    <li v-for="(child, childIndex) in item.children" :key="childIndex" class="flex items-center text-sm text-gray-600">
                      <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      {{ child }}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Course Curriculum'
  },
  description: {
    type: String,
    default: ''
  },
  modules: {
    type: Array,
    required: true,
    // Structure:
    // [
    //   {
    //     title: "Module Name",
    //     description: "Optional description",
    //     items: [
    //       { text: "Topic 1", isPractice: false, children: [] },
    //       { text: "Practice Task", isPractice: true }
    //     ]
    //   }
    // ]
  }
})
</script>
