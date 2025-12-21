<!--
  COURSEROADMAP.VUE - Course Curriculum/Roadmap Component
  =======================================================
  
  This component renders a structured list of modules/sections for a course.
  It supports nested items and highlights practice tasks.
-->

<template>
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-black mb-6">{{ title }}</h2>
        <p v-if="description" class="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">{{ description }}</p>
      </div>

      <div class="space-y-6">
        <!-- Module/Section Loop -->
        <div v-for="(module, index) in modules" :key="index" class="module-card border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300">
          <!-- Module Header -->
          <div class="bg-gradient-to-r from-gray-50 to-white px-8 py-5 border-b border-gray-200">
            <h3 class="text-2xl font-bold text-gray-900 flex items-center">
              <span class="bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-lg mr-4 uppercase tracking-wide">Module {{ index + 1 }}</span>
              {{ module.title }}
            </h3>
            <p v-if="module.description" class="text-gray-600 mt-2 text-base leading-relaxed">{{ module.description }}</p>
          </div>

          <!-- Module Content -->
          <div class="px-8 py-6 bg-white">
            <ul class="space-y-4">
              <li v-for="(item, itemIndex) in module.items" :key="itemIndex" class="flex items-start group">
                <!-- Checkbox styling (visual only for now) -->
                <div class="flex-shrink-0 mt-1">
                  <div class="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center transition-colors duration-200 group-hover:border-gray-400">
                    <!-- Checkmark placeholder -->
                  </div>
                </div>
                
                <div class="ml-4 flex-1">
                  <!-- Link if courseId is present, otherwise span -->
                  <component 
                    :is="courseId ? 'router-link' : 'span'"
                    :to="courseId ? `/${courseId}/lesson/${item.slug}` : undefined"
                    :class="[
                      {'font-bold text-blue-600': item.isPractice, 'text-gray-700 group-hover:text-gray-900': !item.isPractice},
                      courseId ? 'hover:text-blue-500 cursor-pointer transition-colors block' : '',
                      'text-base leading-relaxed'
                    ]"
                  >
                    <span v-if="item.isPractice" class="mr-1">🛠️</span>
                    {{ item.text }}
                  </component>

                  <!-- Nested Items -->
                  <ul v-if="item.children && item.children.length" class="mt-3 ml-4 space-y-2">
                    <li v-for="(child, childIndex) in item.children" :key="childIndex" class="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors">
                      <span class="w-2 h-2 bg-gray-400 rounded-full mr-3 flex-shrink-0"></span>
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
  courseId: {
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
    //       { text: "Topic 1", isPractice: false, children: [], slug: "topic-1" },
    //       { text: "Practice Task", isPractice: true, slug: "practice-task" }
    //     ]
    //   }
    // ]
  }
})
</script>
