<!--
  HEROSECTION.VUE - Hero/Banner Component
  ========================================
  
  This component demonstrates:
  - Props (passing data from parent)
  - Template interpolation with {{ }}
  - Event handling
  - Styling with Tailwind CSS
  
  Vue Concepts:
  - Props: Data passed from parent component (like function parameters)
  - Template interpolation: {{ }} displays reactive data
  - @click: Event handlers
-->

<template>
  <section 
    ref="heroSection"
    class="relative min-h-screen pt-32 pb-20 overflow-hidden bg-white"
  >

    <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
      <!-- Header Text -->
      <div class="mb-12 pt-8">
        <div class="inline-block px-3 py-1 bg-black/5 rounded-full mb-6 text-xs font-medium text-gray-700">
          PART OF THE MEMBERSHIP
        </div>
        <h1 class="text-7xl md:text-8xl font-light text-black mb-6 tracking-tight leading-none">
          {{ title }}
        </h1>
        <p class="text-lg md:text-xl text-gray-600 max-w-2xl font-light leading-relaxed">
          {{ description }}
        </p>
      </div>

      <!-- Grid -->
      <div 
        ref="gridContainer"
        :class="['grid-container', { 'overlay-open': selectedIndex !== null }]"
      >
        <div
          v-for="(item, index) in gridItems"
          :key="index"
          :ref="el => { if (el) itemRefs[index] = el }"
          :class="['grid-item', 'group', { selected: selectedIndex === index } ]"
          :style="getItemStyle(item, index)"
          @mouseenter="handleItemHover(index)"
          @mouseleave="handleItemLeave(index)"
          @click="openItem(item, index)"
          role="button"
          tabindex="0"
        >
          <div class="item-content">
            <div class="item-icon">
              <component :is="getIconComponent(item.iconName)" :size="48" />
            </div>
            <div class="item-title">{{ item.title }}</div>
            <div class="item-description">{{ item.description }}</div>

            <!-- Hover preview: richer description shown on hover -->
            <div class="absolute left-6 right-6 bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
              <div class="bg-white/95 backdrop-blur-sm p-4 rounded-md border border-gray-100 text-sm text-gray-700 shadow">
                <strong class="block text-sm text-gray-900">{{ item.title }}</strong>
                <div class="mt-2 text-sm text-gray-600">{{ item.longDescription || item.description }}</div>
              </div>
            </div>

            <!-- When this card is selected, show a focused detail panel (the card itself is promoted) -->
            <div v-if="selectedIndex === index" class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="bg-white/0 pointer-events-auto p-6 w-full max-w-full">
                <div class="p-4 rounded">
                  <h4 class="text-base text-gray-500 mb-2">Overview</h4>
                  <div class="text-gray-700 leading-relaxed text-sm max-h-[50vh] overflow-auto">{{ item.longDescription || item.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center mt-16 mb-8">
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link 
            v-if="!authStore.isLoggedIn"
            to="/join" 
            class="btn-primary text-base px-8 py-3 inline-block"
          >
            Get Started
          </router-link>
          <router-link 
            v-if="!authStore.isLoggedIn"
            to="/login" 
            class="btn-secondary text-base px-8 py-3 inline-block"
          >
            Login
          </router-link>
        </div>
      </div>
    </div>
  </section>

  <!-- Backdrop to capture clicks when a card is promoted; clicking closes the selection -->
  <div v-if="selectedIndex !== null" class="hero-backdrop" @click="closeItem"></div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { 
  Zap, Atom, Palette, BookOpen, Wrench, Rocket, 
  Lightbulb, Book, Target 
} from 'lucide-vue-next'

const authStore = useAuthStore()

// Icon mapping
const iconComponents = {
  Zap,
  Atom,
  Palette,
  BookOpen,
  Wrench,
  Rocket,
  Lightbulb,
  Book,
  Target
}

const getIconComponent = (iconName) => {
  return iconComponents[iconName] || BookOpen
}

const props = defineProps({
  title: {
    type: String,
    default: 'Dev Toolkit'
  },
  description: {
    type: String,
    default: 'Platform packed with Vue.js & React resources, components, lessons and interactive examples.'
  }
})

// Refs
const heroSection = ref(null)
const gridContainer = ref(null)
const itemRefs = ref([])

// State
const hoveredIndex = ref(-1)
const initialPositions = ref([])

// Modal / selected item state
const selectedItem = ref(null)
const selectedIndex = ref(null)

function openItem(item, index) {
  // mark which index is selected and keep reference to item
  selectedIndex.value = index
  selectedItem.value = item
}

function closeItem() {
  selectedIndex.value = null
  selectedItem.value = null
}

function handleKey(e) {
  if (e.key === 'Escape') closeItem()
}

// Grid items data - each card has its own speed/delay for staggered effect
const gridItems = ref([
  { iconName: 'Zap', title: 'Vue.js', description: 'Progressive Framework', longDescription: 'Comprehensive Vue.js 3 course: Composition API, components, reactivity, routing, and state management with Pinia.', x: 0, y: 0, speed: 0.08 },
  { iconName: 'Atom', title: 'React', description: 'UI Library', longDescription: 'React 18 fundamentals including hooks, context, performance optimizations, and practical patterns for building UIs.', x: 0, y: 0, speed: 0.10 },
  { iconName: 'Palette', title: 'Components', description: 'Reusable UI', longDescription: 'Design and build reusable component libraries, style systems, and accessible UI primitives with examples.', x: 0, y: 0, speed: 0.12 },
  { iconName: 'BookOpen', title: 'Lessons', description: 'Step by step', longDescription: 'Structured lessons with examples, exercises, and checkpoints to track your learning progress.', x: 0, y: 0, speed: 0.09 },
  { iconName: 'Wrench', title: 'Tools', description: 'Dev utilities', longDescription: 'Tooling tips for Vite, linters, formatters, deployment pipelines, and productivity workflows.', x: 0, y: 0, speed: 0.11 },
  { iconName: 'Rocket', title: 'Projects', description: 'Real examples', longDescription: 'Project-driven learning: build real apps, deploy them, and learn how to structure production code.', x: 0, y: 0, speed: 0.13 },
  { iconName: 'Lightbulb', title: 'Tips', description: 'Best practices', longDescription: 'Practical tips and best practices for writing maintainable and performant front-end code.', x: 0, y: 0, speed: 0.07 },
  { iconName: 'Book', title: 'Docs', description: 'Comprehensive', longDescription: 'Curated documentation and cheat-sheets for quick reference while you code.', x: 0, y: 0, speed: 0.14 },
  { iconName: 'Target', title: 'Practice', description: 'Hands-on learning', longDescription: 'Hands-on exercises and challenges to reinforce concepts and build muscle memory.', x: 0, y: 0, speed: 0.15 },
])

// Initialize grid positions
function recalculateGrid() {
  initializeGridPositions()
}

onMounted(() => {
  authStore.initializeAuth()
  
  // Wait for DOM to be ready
  setTimeout(() => {
    initializeGridPositions()
    
    // Handle window resize
    window.addEventListener('resize', () => {
      setTimeout(recalculateGrid, 100)
    })
    
    // Smooth scroll animation on mount
    requestAnimationFrame(() => {
      if (gridContainer.value) {
        gridContainer.value.style.opacity = '1'
        gridContainer.value.style.transform = 'translateY(0)'
      }
    })
  }, 50)

  // Escape key closes promoted card
  window.addEventListener('keydown', handleKey)

})

onUnmounted(() => {
  window.removeEventListener('resize', recalculateGrid)
  window.removeEventListener('keydown', handleKey)
})
  

function initializeGridPositions() {
  if (!gridContainer.value) return
  
  const cols = 3
  const spacing = 20
  const itemWidth = 320
  const itemHeight = 360
  
  // Get container bounds
  const containerRect = gridContainer.value.getBoundingClientRect()
  const containerWidth = containerRect.width || window.innerWidth
  
  // Calculate grid width and center it
  const gridWidth = cols * itemWidth + (cols - 1) * spacing
  const startX = (containerWidth - gridWidth) / 2
  
  gridItems.value.forEach((item, index) => {
    const col = index % cols
    const row = Math.floor(index / cols)
    const baseX = startX + col * (itemWidth + spacing)
    const baseY = row * (itemHeight + spacing)
    
    // Store initial position
    initialPositions.value[index] = { x: baseX, y: baseY }
    
    // Set item position
    item.x = baseX
    item.y = baseY
  })
}

function getItemStyle(item, index) {
  const hoverOffset = hoveredIndex.value === index ? 10 : 0
  
  return {
    transform: `translate(${item.x}px, ${item.y + hoverOffset}px)`,
    transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
    zIndex: hoveredIndex.value === index ? 10 : 1
  }
}


function handleItemHover(index) {
  hoveredIndex.value = index
}

function handleItemLeave() {
  hoveredIndex.value = -1
}

// Removed scroll-based opacity reduction for normal visibility

function showDetails(item, index) {
  // Promote the item (same behavior as clicking the card)
  openItem(item, index)
}
</script>

<style scoped>
/* Osmo-style landing page */

.grid-container {
  position: relative;
  width: 100%;
  min-height: 800px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s ease-out, transform 1s ease-out;
  padding: 20px 0;
}

.grid-item {
  position: absolute;
  width: 320px;
  height: 360px;
  will-change: transform;
  pointer-events: none;
  transform-origin: center center;
}

.grid-container .grid-item {
  pointer-events: auto;
}

.item-content {
  width: 100%;
  height: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  pointer-events: auto;
  position: relative;
  overflow: hidden;
}

.grid-item:hover .item-content {
  border-color: #000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.item-icon {
  margin-bottom: 24px;
  transition: transform 0.3s ease;
  line-height: 1;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.grid-item:hover .item-icon {
  transform: scale(1.05);
}

/* Selected (promoted) card styles: promote the clicked card itself */
.grid-container.overlay-open .grid-item:not(.selected) {
  filter: blur(3px) grayscale(0.15);
  opacity: 0.45;
  transform: scale(0.98);
  pointer-events: none;
}

.grid-item.selected {
  position: fixed !important;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: min(720px, calc(100% - 48px)) !important;
  height: auto !important;
  z-index: 80 !important;
  box-shadow: 0 30px 80px rgba(0,0,0,0.25);
  transition: transform 0.28s cubic-bezier(.2,.9,.2,1), box-shadow 0.2s;
}

.grid-item.selected .item-content {
  border-radius: 14px;
  padding: 28px;
}

/* Backdrop to capture clicks when a card is promoted */
.hero-backdrop {
  position: fixed;
  inset: 0;
  z-index: 70;
}

.item-title {
  font-size: 22px;
  font-weight: 600;
  color: #000;
  margin-bottom: 8px;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.item-description {
  font-size: 14px;
  color: #6b7280;
  font-weight: 400;
  line-height: 1.5;
}


/* Responsive adjustments */
@media (max-width: 1024px) {
  .grid-item {
    width: calc(50% - 10px);
    max-width: none;
  }
  
  .grid-container {
    min-height: 600px;
  }
}

@media (max-width: 768px) {
  .grid-item {
    width: 100%;
    max-width: 320px;
    position: relative !important;
    transform: none !important;
    left: auto !important;
    top: auto !important;
  }
  
  .grid-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    min-height: auto;
  }
  
  .item-content {
    padding: 32px 24px;
  }
}

/* Smooth scroll reveal animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

/* Modal overlay styles */
.hero-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(6px);
  z-index: 60;
}
.hero-modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 70;
  max-width: 900px;
  width: calc(100% - 48px);
}

.hero-modal .modal-card {
  border-radius: 12px;
  overflow: hidden;
}

