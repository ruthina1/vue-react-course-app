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
    class="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white cursor-area"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Custom Drag Cursor -->
    <div 
      ref="cursor"
      class="custom-cursor"
      :class="{ 'is-dragging': isDragging }"
      :style="{ left: cursorX + 'px', top: cursorY + 'px', opacity: showCursor ? 1 : 0 }"
    >
      <span class="cursor-text">Drag</span>
    </div>

    <div class="max-w-7xl mx-auto">
      <!-- Header Text -->
      <div class="text-center mb-16 pt-8">
        <h1 class="text-6xl md:text-8xl font-light text-black mb-4 tracking-tight leading-none">
          {{ title }}
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto font-light mt-6">
          {{ description }}
        </p>
      </div>

      <!-- Draggable Grid -->
      <div 
        ref="gridContainer"
        class="grid-container"
        :class="{ 'is-dragging': isDragging }"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
      >
        <div
          v-for="(item, index) in gridItems"
          :key="index"
          :ref="el => { if (el) itemRefs[index] = el }"
          class="grid-item"
          :style="getItemStyle(item, index)"
          @mouseenter="handleItemHover(index)"
          @mouseleave="handleItemLeave(index)"
        >
          <div class="item-content">
            <div class="item-icon">{{ item.icon }}</div>
            <div class="item-title">{{ item.title }}</div>
            <div class="item-description">{{ item.description }}</div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center mt-20">
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link 
            v-if="!authStore.isLoggedIn"
            to="/join" 
            class="btn-primary text-lg px-8 py-4 inline-block"
          >
            Get Started
          </router-link>
          <router-link 
            v-if="!authStore.isLoggedIn"
            to="/login" 
            class="btn-secondary text-lg px-8 py-4 inline-block"
          >
            Login
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

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
const cursor = ref(null)
const itemRefs = ref([])

// State
const cursorX = ref(0)
const cursorY = ref(0)
const showCursor = ref(false)
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const dragOffset = ref({ x: 0, y: 0 })
const hoveredIndex = ref(-1)
const initialPositions = ref([])

// Grid items data
const gridItems = ref([
  { icon: '⚡', title: 'Vue.js', description: 'Progressive Framework', x: 0, y: 0 },
  { icon: '⚛️', title: 'React', description: 'UI Library', x: 0, y: 0 },
  { icon: '🎨', title: 'Components', description: 'Reusable UI', x: 0, y: 0 },
  { icon: '📚', title: 'Lessons', description: 'Step by step', x: 0, y: 0 },
  { icon: '🛠️', title: 'Tools', description: 'Dev utilities', x: 0, y: 0 },
  { icon: '🚀', title: 'Projects', description: 'Real examples', x: 0, y: 0 },
  { icon: '💡', title: 'Tips', description: 'Best practices', x: 0, y: 0 },
  { icon: '📖', title: 'Docs', description: 'Comprehensive', x: 0, y: 0 },
  { icon: '🎯', title: 'Practice', description: 'Hands-on learning', x: 0, y: 0 },
])

// Initialize grid positions
function recalculateGrid() {
  initializeGridPositions()
}

onMounted(() => {
  initializeGridPositions()
  authStore.initializeAuth()
  
  // Handle window resize
  window.addEventListener('resize', recalculateGrid)
  
  // Smooth scroll animation on mount
  requestAnimationFrame(() => {
    if (gridContainer.value) {
      gridContainer.value.style.opacity = '1'
      gridContainer.value.style.transform = 'translateY(0)'
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', recalculateGrid)
})

function initializeGridPositions() {
  const cols = 3
  const spacing = 24
  const itemWidth = 280
  const itemHeight = 320
  
  // Center the grid
  const containerWidth = cols * itemWidth + (cols - 1) * spacing
  const startX = Math.max(0, (window.innerWidth - containerWidth) / 2)
  
  gridItems.value.forEach((item, index) => {
    const col = index % cols
    const row = Math.floor(index / cols)
    const baseX = startX + col * (itemWidth + spacing)
    const baseY = row * (itemHeight + spacing)
    
    // Store initial position if not already set
    if (initialPositions.value[index] === undefined) {
      initialPositions.value[index] = { x: baseX, y: baseY }
    }
    
    // Use stored position or initial position
    item.x = initialPositions.value[index].x
    item.y = initialPositions.value[index].y
  })
}

function getItemStyle(item, index) {
  const baseX = item.x + dragOffset.value.x
  const baseY = item.y + dragOffset.value.y
  const hoverOffset = hoveredIndex.value === index ? 10 : 0
  
  return {
    transform: `translate(${baseX}px, ${baseY + hoverOffset}px)`,
    transition: isDragging.value ? 'none' : 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
    zIndex: hoveredIndex.value === index ? 10 : 1
  }
}

// Mouse move handler for custom cursor
function handleMouseMove(e) {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
  
  // Show cursor when over the grid area
  if (gridContainer.value) {
    const rect = gridContainer.value.getBoundingClientRect()
    const isOverGrid = e.clientX >= rect.left && e.clientX <= rect.right &&
                       e.clientY >= rect.top && e.clientY <= rect.bottom
    showCursor.value = isOverGrid
  } else {
    showCursor.value = true
  }
}

function handleMouseLeave() {
  showCursor.value = false
}

// Drag functionality
function startDrag(e) {
  if (!gridContainer.value) return
  e.preventDefault()
  isDragging.value = true
  dragStart.value = {
    x: e.clientX - dragOffset.value.x,
    y: e.clientY - dragOffset.value.y
  }
  gridContainer.value.style.cursor = 'grabbing'
  document.body.style.userSelect = 'none'
}

function onDrag(e) {
  if (!isDragging.value) return
  e.preventDefault()
  
  // Calculate new offset based on mouse movement
  dragOffset.value = {
    x: e.clientX - dragStart.value.x,
    y: e.clientY - dragStart.value.y
  }
}

function stopDrag() {
  if (isDragging.value) {
    isDragging.value = false
    if (gridContainer.value) {
      gridContainer.value.style.cursor = 'grab'
    }
    document.body.style.userSelect = ''
    
    // Save the new positions permanently
    gridItems.value.forEach((item, index) => {
      if (initialPositions.value[index]) {
        initialPositions.value[index] = {
          x: initialPositions.value[index].x + dragOffset.value.x,
          y: initialPositions.value[index].y + dragOffset.value.y
        }
        item.x = initialPositions.value[index].x
        item.y = initialPositions.value[index].y
      }
    })
    
    // Reset drag offset
    dragOffset.value = { x: 0, y: 0 }
  }
}

function handleItemHover(index) {
  hoveredIndex.value = index
}

function handleItemLeave() {
  hoveredIndex.value = -1
}

// Scroll animations
let scrollY = 0
function handleScroll() {
  scrollY = window.scrollY
  if (gridContainer.value) {
    const opacity = Math.max(0.3, 1 - scrollY / 800)
    gridContainer.value.style.opacity = opacity
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Osmo-style landing page */

.grid-container {
  position: relative;
  width: 100%;
  min-height: 600px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s ease-out, transform 1s ease-out;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
}

.grid-container.is-dragging {
  cursor: grabbing !important;
}

.grid-container:active {
  cursor: grabbing;
}

.grid-item {
  position: absolute;
  width: 280px;
  height: 320px;
  will-change: transform;
  pointer-events: none;
}

.grid-container .grid-item {
  pointer-events: auto;
}

.item-content {
  width: 100%;
  height: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  pointer-events: auto;
}

.grid-item:hover .item-content {
  border-color: #000;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transform: translateY(-8px);
}

.item-icon {
  font-size: 64px;
  margin-bottom: 16px;
  transition: transform 0.3s ease;
}

.grid-item:hover .item-icon {
  transform: scale(1.1) rotate(5deg);
}

.item-title {
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.item-description {
  font-size: 14px;
  color: #6b7280;
  font-weight: 400;
}

/* Custom Drag Cursor */
.cursor-area {
  cursor: none;
}

.custom-cursor {
  position: fixed;
  width: 70px;
  height: 70px;
  border: 2px solid #000;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: opacity 0.15s ease, transform 0.15s cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.custom-cursor.is-dragging {
  transform: translate(-50%, -50%) scale(1.15);
  border-width: 3px;
  background: rgba(255, 255, 255, 1);
}

.cursor-text {
  font-size: 11px;
  font-weight: 600;
  color: #000;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-family: 'Inter', sans-serif;
}

.cursor-area button,
.cursor-area a {
  cursor: pointer;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid-item {
    width: 100%;
    max-width: 280px;
    position: relative !important;
    transform: none !important;
  }
  
  .grid-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    cursor: default;
  }
  
  .custom-cursor {
    display: none;
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

