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
                    <Wrench v-if="item.isPractice" :size="16" class="inline-block mr-1" />
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
        <div v-if="isLoading" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[500px] flex items-center justify-center">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p class="text-gray-600">Loading lesson...</p>
          </div>
        </div>
        
        <div v-else-if="currentLesson" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[500px]">
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ currentLesson.text }}</h1>
            <div class="flex items-center space-x-4 text-sm text-gray-500">
              <span v-if="currentLesson.isPractice" class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                Practice Task
              </span>
              <span v-if="currentLesson.estimatedTime">
                Time to read: {{ currentLesson.estimatedTime }} min
              </span>
              <span v-else>Time to read: 5 min</span>
            </div>
          </div>
          
          <div class="prose prose-lg max-w-none text-gray-600">
            <div v-if="currentLesson.content" v-html="formatContent(currentLesson.content)"></div>
            <div v-else>
              <p>
                This is the content for the lesson <strong>{{ currentLesson.text }}</strong>.
              </p>
              <p class="mt-4">
                Detailed content will be available soon. Check back later for updates.
              </p>
            </div>
            
            <div v-if="currentLesson.children && currentLesson.children.length > 0" class="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
              <h3 class="text-blue-900 font-bold text-lg mb-2">Topics Covered</h3>
              <ul class="list-disc list-inside text-blue-800 space-y-1">
                <li v-for="(child, index) in currentLesson.children" :key="index">{{ child.title || child }}</li>
              </ul>
            </div>
          </div>
          
          <!-- Navigation Buttons -->
          <div class="mt-12 flex justify-between pt-8 border-t border-gray-100">
            <button 
              v-if="navigation.previous"
              @click="goToLesson(navigation.previous)"
              class="text-gray-500 hover:text-black font-medium flex items-center transition-colors"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous Lesson
            </button>
            <span v-else class="text-gray-300">No previous lesson</span>
            
            <button 
              v-if="navigation.next"
              @click="goToLesson(navigation.next)"
              class="btn-primary flex items-center"
            >
              Next Lesson
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span v-else class="text-gray-300">No next lesson</span>
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
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCourseData } from '../composables/useCourseData'
import Navigation from '../components/Navigation.vue'
import { Wrench } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { getModule, getLesson, getLessonNavigation } = useCourseData()

const courseId = computed(() => route.params.courseId)
const currentLessonId = computed(() => route.params.lessonId)
const currentLesson = ref(null)
const isLoading = ref(false)
const navigation = ref({ previous: null, next: null })

const modules = computed(() => getModule(courseId.value))

const courseTitle = computed(() => {
  return courseId.value === 'vue' ? 'Vue.js Mastery' : 'React Ecosystem'
})

// Load lesson content
async function loadLesson() {
  isLoading.value = true
  try {
    const lesson = await getLesson(courseId.value, currentLessonId.value)
    currentLesson.value = lesson
    
    // Update navigation
    const nav = getLessonNavigation(courseId.value, currentLessonId.value)
    navigation.value = nav
  } catch (error) {
    console.error('Error loading lesson:', error)
    currentLesson.value = null
  } finally {
    isLoading.value = false
  }
}

// Navigate to lesson
function goToLesson(lesson) {
  if (lesson) {
    router.push(`/${courseId.value}/lesson/${lesson.slug}`)
  }
}

// Watch for route changes
watch([courseId, currentLessonId], () => {
  loadLesson()
})

onMounted(() => {
  loadLesson()
})

// Format markdown-like content (simple implementation)
const formatContent = (content) => {
  if (!content) return ''
  
  // Split by lines and process
  const lines = content.split('\n')
  let html = ''
  let inCodeBlock = false
  let codeBlockContent = ''
  let codeBlockLang = ''
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        html += `<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>${codeBlockContent.trim()}</code></pre>`
        codeBlockContent = ''
        codeBlockLang = ''
        inCodeBlock = false
      } else {
        // Start code block
        codeBlockLang = line.replace('```', '').trim()
        inCodeBlock = true
      }
      continue
    }
    
    if (inCodeBlock) {
      codeBlockContent += line + '\n'
      continue
    }
    
    // Headers
    if (line.startsWith('# ')) {
      html += `<h1 class="text-3xl font-bold mt-8 mb-4">${line.replace('# ', '')}</h1>`
    } else if (line.startsWith('## ')) {
      html += `<h2 class="text-2xl font-bold mt-6 mb-3">${line.replace('## ', '')}</h2>`
    } else if (line.startsWith('### ')) {
      html += `<h3 class="text-xl font-semibold mt-4 mb-2">${line.replace('### ', '')}</h3>`
    } else if (line.trim() === '') {
      html += '<br>'
    } else {
      // Regular paragraph with inline formatting
      let para = line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
      html += `<p class="mb-4 leading-relaxed">${para}</p>`
    }
  }
  
  return html
}

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
