<!--
  LESSONVIEW.VUE - Dynamic Lesson Page
  ====================================
  
  This component renders the individual lesson content.
  It uses the route params to determine which course and lesson to show.
-->

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navigation />
    
    <div class="flex-1 flex pt-16">
      <!-- Sidebar / Roadmap -->
      <aside 
        class="w-80 bg-white border-r border-gray-200 hidden lg:block overflow-y-auto h-[calc(100vh-64px)] fixed left-0 top-16 z-10"
      >
        <div class="p-6">
          <router-link :to="`/${courseId}`" class="text-gray-500 hover:text-black mb-6 inline-flex items-center text-sm font-medium">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Course
          </router-link>
          
          <h3 class="font-bold text-lg mb-4">{{ courseTitle }}</h3>
          
          <!-- Roadmap in Sidebar -->
          <div class="space-y-6">
            <div v-for="(module, index) in modules" :key="index">
              <h4 class="font-medium text-gray-900 mb-2 text-sm uppercase tracking-wider">Module {{ index + 1 }}</h4>
              <ul class="space-y-1">
                <li v-for="(item, itemIndex) in module.items" :key="itemIndex">
                  <router-link 
                    :to="`/${courseId}/lesson/${item.slug || generateSlug(item.text)}`"
                    class="block px-3 py-2 rounded-md text-sm transition-colors"
                    :class="[
                      currentLessonId === (item.slug || generateSlug(item.text)) 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    ]"
                  >
                    <span v-if="item.isPractice" class="mr-1">🛠️</span>
                    {{ item.text }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 lg:ml-80 p-8 max-w-4xl mx-auto w-full">
        <div v-if="currentLesson" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[500px]">
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ currentLesson.text }}</h1>
            <div class="flex items-center space-x-4 text-sm text-gray-500">
              <span v-if="currentLesson.isPractice" class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                Practice Task
              </span>
              <span>time to read: 5 min</span>
            </div>
          </div>
          
          <div class="prose prose-lg max-w-none text-gray-600">
            <p>
              This is the content for the lesson <strong>{{ currentLesson.text }}</strong>.
            </p>
            <p class="mt-4">
              In a real application, this content would be fetched from a database or a markdown file.
              For now, we are displaying this placeholder text.
            </p>
            
            <div class="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
              <h3 class="text-blue-900 font-bold text-lg mb-2">Key Takeaways</h3>
              <ul class="list-disc list-inside text-blue-800 space-y-1">
                <li>Concept 1 related to {{ currentLesson.text }}</li>
                <li>Concept 2 related to {{ currentLesson.text }}</li>
                <li>Practical application example</li>
              </ul>
            </div>
          </div>
          
          <!-- Navigation Buttons -->
          <div class="mt-12 flex justify-between pt-8 border-t border-gray-100">
            <button class="text-gray-500 hover:text-black font-medium">
              &larr; Previous Lesson
            </button>
            <button class="btn-primary">
              Next Lesson &rarr;
            </button>
          </div>
        </div>
        
        <div v-else class="text-center py-20">
          <h2 class="text-2xl font-bold text-gray-900">Lesson Not Found</h2>
          <p class="text-gray-600 mt-2">The lesson you are looking for does not exist.</p>
          <router-link :to="`/${courseId}`" class="text-blue-600 hover:underline mt-4 inline-block">
            Return to Course
          </router-link>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCourseData } from '../composables/useCourseData'
import Navigation from '../components/Navigation.vue'

const route = useRoute()
const { getModule, getLesson } = useCourseData()

const courseId = computed(() => route.params.courseId)
const currentLessonId = computed(() => route.params.lessonId)

const modules = computed(() => getModule(courseId.value))
const currentLesson = computed(() => getLesson(courseId.value, currentLessonId.value))

const courseTitle = computed(() => {
  return courseId.value === 'vue' ? 'Vue.js Mastery' : 'React Ecosystem'
})

// Helper if slug is missing in data (safety fallback)
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}
</script>
