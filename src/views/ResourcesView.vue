<template>
  <div class="min-h-screen bg-gray-50">
    <Navigation />
    
    <div class="pt-16 pb-20">
      <section class="py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <!-- Section Header -->
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-black mb-6">
              The Platform
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A growing toolkit for creative developers. Access everything with a single membership.
            </p>
          </div>

          <!-- Resources Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="resource in filteredResources"
              :key="resource.id"
              class="resource-card bg-white rounded-xl p-8 shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-gray-300 hover:-translate-y-1 flex flex-col h-full"
            >
              <!-- Category Badge -->
              <div class="inline-block px-3 py-1 bg-black/5 rounded-full mb-6 w-fit">
                <span class="text-xs font-semibold text-gray-700 uppercase tracking-wide">{{ resource.category }}</span>
              </div>

              <!-- Icon -->
              <div class="mb-6 transition-transform duration-300 hover:scale-110 text-gray-800">
                <component :is="getIconComponent(resource.iconName)" :size="48" />
              </div>

              <!-- Title -->
              <h3 class="text-2xl font-bold text-black mb-3 leading-tight">{{ resource.title }}</h3>

              <!-- Description -->
              <p class="text-gray-600 mb-6 leading-relaxed flex-grow">{{ resource.description }}</p>

              <!-- Learn More Link -->
              <div class="mt-auto">
                <a 
                  v-if="resource.link" 
                  :href="resource.link" 
                  target="_blank"
                  class="inline-flex items-center text-black font-semibold hover:gap-2 transition-all duration-200 group"
                >
                  Learn More
                  <svg class="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <span v-else class="text-gray-400 text-sm italic">
                  Content coming soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCourseData } from '../composables/useCourseData'
import Navigation from '../components/Navigation.vue'
import Footer from '../components/Footer.vue'
import { 
  Zap, Target, BookOpen, Database, Compass, Sparkles 
} from 'lucide-vue-next'

const route = useRoute()
const { getResources } = useCourseData()

// Get topic from query params or default to 'all'
const topic = computed(() => route.query.topic || 'all')

// Filter resources based on the topic
const filteredResources = computed(() => getResources(topic.value))

// Icon mapping
const iconComponents = {
  Zap,
  Target,
  BookOpen,
  Database,
  Compass,
  Sparkles
}

const getIconComponent = (iconName) => {
  return iconComponents[iconName] || BookOpen
}
</script>

<style scoped>
/* Component-specific styles */
</style>
