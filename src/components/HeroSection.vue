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
    class="relative min-h-screen pt-32 pb-20 overflow-hidden bg-white cursor-area"
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
const lastMousePos = ref({ x: 0, y: 0 })
const mouseDelta = ref({ x: 0, y: 0 })
const hoveredIndex = ref(-1)
const initialPositions = ref([])
const cardOffsets = ref([])
const animationFrameId = ref(null)

// Grid items data - each card has its own speed/delay for staggered effect
const gridItems = ref([
  { icon: '⚡', title: 'Vue.js', description: 'Progressive Framework', x: 0, y: 0, speed: 0.08 },
  { icon: '⚛️', title: 'React', description: 'UI Library', x: 0, y: 0, speed: 0.10 },
  { icon: '🎨', title: 'Components', description: 'Reusable UI', x: 0, y: 0, speed: 0.12 },
  { icon: '📚', title: 'Lessons', description: 'Step by step', x: 0, y: 0, speed: 0.09 },
  { icon: '🛠️', title: 'Tools', description: 'Dev utilities', x: 0, y: 0, speed: 0.11 },
  { icon: '🚀', title: 'Projects', description: 'Real examples', x: 0, y: 0, speed: 0.13 },
  { icon: '💡', title: 'Tips', description: 'Best practices', x: 0, y: 0, speed: 0.07 },
  { icon: '📖', title: 'Docs', description: 'Comprehensive', x: 0, y: 0, speed: 0.14 },
  { icon: '🎯', title: 'Practice', description: 'Hands-on learning', x: 0, y: 0, speed: 0.15 },
])

// Initialize grid positions
function recalculateGrid() {
  // Reset offsets when recalculating
  cardOffsets.value.forEach((offset, index) => {
    if (offset) {
      // Save current position to initial before recalculating
      if (gridItems.value[index] && initialPositions.value[index]) {
        initialPositions.value[index] = {
          x: gridItems.value[index].x,
          y: gridItems.value[index].y
        }
      }
      offset.x = 0
      offset.y = 0
    }
  })
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
})

onUnmounted(() => {
  window.removeEventListener('resize', recalculateGrid)
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value)
  }
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
    
    // Store initial position if not already set
    if (initialPositions.value[index] === undefined) {
      initialPositions.value[index] = { x: baseX, y: baseY }
      cardOffsets.value[index] = { x: 0, y: 0 }
    } else {
      // Recalculate base position but keep offset
      initialPositions.value[index] = { x: baseX, y: baseY }
    }
    
    // Use stored position or initial position
    item.x = initialPositions.value[index].x
    item.y = initialPositions.value[index].y
  })
}

function getItemStyle(item, index) {
  const hoverOffset = hoveredIndex.value === index ? 10 : 0
  const offset = cardOffsets.value[index] || { x: 0, y: 0 }
  
  return {
    transform: `translate(${item.x + offset.x}px, ${item.y + offset.y + hoverOffset}px)`,
    transition: isDragging.value ? 'none' : 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
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

// Animation loop for smooth card following with inertia
function animateCards() {
  if (!isDragging.value || !gridContainer.value) {
    animationFrameId.value = null
    return
  }
  
  // Update each card offset with individual physics (like driving)
  gridItems.value.forEach((item, index) => {
    if (!initialPositions.value[index] || !cardOffsets.value[index]) return
    
    const speed = item.speed || 0.1
    const damping = 0.90 // friction/inertia - lower = more inertia
    
    // Apply mouse delta to card offset with individual speed (each card moves at different rate)
    cardOffsets.value[index].x += mouseDelta.value.x * speed
    cardOffsets.value[index].y += mouseDelta.value.y * speed
    
    // Apply damping for smooth deceleration (creates the "driving" effect)
    cardOffsets.value[index].x *= damping
    cardOffsets.value[index].y *= damping
  })
  
  // Reset delta after all cards have processed it
  mouseDelta.value = { x: 0, y: 0 }
  
  animationFrameId.value = requestAnimationFrame(animateCards)
}

// Drag functionality
function startDrag(e) {
  if (!gridContainer.value) return
  e.preventDefault()
  isDragging.value = true
  
  lastMousePos.value = {
    x: e.clientX,
    y: e.clientY
  }
  
  mouseDelta.value = { x: 0, y: 0 }
  
  gridContainer.value.style.cursor = 'grabbing'
  document.body.style.userSelect = 'none'
  
  // Start animation loop
  if (!animationFrameId.value) {
    animateCards()
  }
}

function onDrag(e) {
  if (!isDragging.value) return
  e.preventDefault()
  
  // Calculate mouse movement delta
  mouseDelta.value = {
    x: e.clientX - lastMousePos.value.x,
    y: e.clientY - lastMousePos.value.y
  }
  
  // Update last position
  lastMousePos.value = {
    x: e.clientX,
    y: e.clientY
  }
}

function stopDrag() {
  if (isDragging.value) {
    isDragging.value = false
    if (gridContainer.value) {
      gridContainer.value.style.cursor = 'grab'
    }
    document.body.style.userSelect = ''
    
    // Save final positions by updating initial positions with offsets
    gridItems.value.forEach((item, index) => {
      if (initialPositions.value[index] && cardOffsets.value[index]) {
        initialPositions.value[index] = {
          x: initialPositions.value[index].x + cardOffsets.value[index].x,
          y: initialPositions.value[index].y + cardOffsets.value[index].y
        }
        // Reset offsets
        cardOffsets.value[index] = { x: 0, y: 0 }
        // Update item position
        item.x = initialPositions.value[index].x
        item.y = initialPositions.value[index].y
      }
    })
    
    // Stop animation loop
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value)
      animationFrameId.value = null
    }
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
  min-height: 800px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s ease-out, transform 1s ease-out;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  padding: 20px 0;
}

.grid-container.is-dragging {
  cursor: grabbing !important;
}

.grid-container:active {
  cursor: grabbing;
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
  font-size: 48px;
  margin-bottom: 24px;
  transition: transform 0.3s ease;
  line-height: 1;
}

.grid-item:hover .item-icon {
  transform: scale(1.05);
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
    cursor: default;
    min-height: auto;
  }
  
  .custom-cursor {
    display: none;
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

