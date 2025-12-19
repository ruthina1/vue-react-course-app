# Vue & React Learning Website

A comprehensive learning platform built with Vue.js 3, designed to teach Vue.js concepts through hands-on development. This project is inspired by [Osmo Supply](https://www.osmo.supply/) and serves as both a learning resource and a practical example.

## 🎯 Project Overview

This website demonstrates modern Vue.js 3 development practices while teaching Vue concepts through detailed code comments and explanations. Every component includes comprehensive documentation explaining Vue.js fundamentals.

## 📚 Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Vue.js Concepts Explained](#vuejs-concepts-explained)
- [Component Breakdown](#component-breakdown)
- [Technologies Used](#technologies-used)
- [Development Guide](#development-guide)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd vue-react-course-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
vue-react-course-app/
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── src/
│   ├── main.js            # Vue app entry point
│   ├── App.vue            # Root component
│   ├── assets/
│   │   └── css/
│   │       └── main.css   # Tailwind CSS imports
│   ├── components/        # Reusable Vue components
│   │   ├── Navigation.vue
│   │   ├── HeroSection.vue
│   │   ├── ResourcesSection.vue
│   │   ├── ShowcaseSection.vue
│   │   └── Footer.vue
│   ├── views/            # Page-level components
│   │   └── HomeView.vue
│   ├── router/           # Vue Router configuration
│   │   └── index.js
│   └── stores/           # Pinia state management (for future use)
└── README.md            # This file
```

## 🎓 Vue.js Concepts Explained

### 1. Single File Components (SFCs)

Vue components are written in `.vue` files with three sections:

```vue
<template>
  <!-- HTML markup with Vue directives -->
</template>

<script setup>
  // JavaScript logic using Composition API
</script>

<style scoped>
  /* Component-specific CSS */
</style>
```

**Why SFCs?**
- Everything related to a component is in one file
- Better organization and maintainability
- Scoped styles prevent CSS conflicts

### 2. Composition API with `<script setup>`

The `<script setup>` syntax is Vue 3's modern approach:

```javascript
import { ref } from 'vue'

const count = ref(0)  // Reactive data

function increment() {
  count.value++  // Modify reactive value
}
```

**Key Benefits:**
- Less boilerplate code
- Better TypeScript support
- Variables automatically available in template
- More intuitive for developers coming from React

### 3. Reactivity with `ref()`

`ref()` creates reactive references that trigger re-renders when changed:

```javascript
import { ref } from 'vue'

const message = ref('Hello')

// In script: use .value
message.value = 'World'

// In template: Vue automatically unwraps
// {{ message }} displays "World"
```

**When to use `ref()`:**
- Primitive values (strings, numbers, booleans)
- Simple reactive state
- Values that change over time

### 4. Template Directives

Vue provides powerful directives for template manipulation:

#### `v-if` - Conditional Rendering
```vue
<div v-if="isVisible">Shown when true</div>
<div v-else>Shown when false</div>
```

#### `v-for` - List Rendering
```vue
<div v-for="item in items" :key="item.id">
  {{ item.name }}
</div>
```

#### `@click` - Event Handling
```vue
<button @click="handleClick">Click me</button>
```

#### `:class` - Dynamic Classes
```vue
<div :class="{ active: isActive }">Content</div>
```

### 5. Vue Router

Vue Router handles navigation between pages:

```javascript
// router/index.js
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
]
```

**Usage in templates:**
```vue
<router-link to="/about">About</router-link>
<router-view />  <!-- Displays current route component -->
```

### 6. Component Communication

#### Props (Parent → Child)
```vue
<!-- Parent -->
<ChildComponent :message="parentMessage" />

<!-- Child -->
<script setup>
defineProps({
  message: String
})
</script>
```

#### Events (Child → Parent)
```vue
<!-- Child -->
<button @click="$emit('custom-event', data)">Click</button>

<!-- Parent -->
<ChildComponent @custom-event="handleEvent" />
```

## 🧩 Component Breakdown

### Navigation.vue

**Purpose:** Fixed header with navigation links and mobile menu

**Vue Concepts Demonstrated:**
- `ref()` for reactive state (`isMobileMenuOpen`)
- `@click` event handlers
- `v-if` for conditional rendering (mobile menu)
- Dynamic class binding

**Key Features:**
- Responsive design (mobile/desktop)
- Smooth transitions
- Accessible menu toggle

### HeroSection.vue

**Purpose:** Main landing section with call-to-action

**Vue Concepts Demonstrated:**
- `ref()` for reactive arrays (`stats`)
- `v-for` for looping through data
- Template interpolation `{{ }}`
- Event handlers for smooth scrolling

**Key Features:**
- Animated background decorations
- Statistics display
- Multiple CTAs

### ResourcesSection.vue

**Purpose:** Grid of resource cards

**Vue Concepts Demonstrated:**
- `v-for` with objects
- Dynamic data rendering
- Component composition

**Key Features:**
- Responsive grid layout
- Hover effects
- Category badges

### ShowcaseSection.vue

**Purpose:** Display example projects

**Vue Concepts Demonstrated:**
- Complex data structures
- Nested component rendering
- List rendering with objects

**Key Features:**
- Project cards with metadata
- Resource count display
- Call-to-action section

### Footer.vue

**Purpose:** Site footer with links

**Vue Concepts Demonstrated:**
- Static component structure
- Link organization
- Presentational component (no logic)

**Key Features:**
- Multi-column layout
- Social links
- Legal links

## 🛠 Technologies Used

### Core Framework
- **Vue.js 3.4+** - Progressive JavaScript framework
- **Vue Router 4** - Official router for Vue.js
- **Pinia 2** - State management (configured, ready for use)

### Build Tools
- **Vite 5** - Next-generation frontend build tool
  - Fast HMR (Hot Module Replacement)
  - Optimized production builds
  - Modern ES modules

### Styling
- **Tailwind CSS 3** - Utility-first CSS framework
  - Responsive design utilities
  - Custom color palette
  - Component classes

### Development
- **PostCSS** - CSS processing
- **Autoprefixer** - Automatic vendor prefixes

## 📖 Development Guide

### Adding a New Component

1. Create a new `.vue` file in `src/components/`:
```vue
<template>
  <div class="my-component">
    <h2>{{ title }}</h2>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('My Component')
</script>

<style scoped>
.my-component {
  /* Component styles */
}
</style>
```

2. Import and use in parent component:
```vue
<script setup>
import MyComponent from '../components/MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

### Adding a New Route

1. Create a view component in `src/views/`:
```vue
<template>
  <div>About Page</div>
</template>
```

2. Add route in `src/router/index.js`:
```javascript
{
  path: '/about',
  name: 'about',
  component: () => import('../views/AboutView.vue')
}
```

3. Add navigation link:
```vue
<router-link to="/about">About</router-link>
```

### Using Tailwind CSS

Tailwind provides utility classes for styling:

```vue
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h1 class="text-2xl font-bold text-black">Title</h1>
  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Click
  </button>
</div>
```

**Common Tailwind Patterns:**
- `flex` - Flexbox layout
- `grid` - CSS Grid layout
- `p-4` - Padding
- `m-4` - Margin
- `text-xl` - Text size
- `font-bold` - Font weight
- `bg-white` - Background color
- `rounded-lg` - Border radius
- `hover:` - Hover states
- `md:` - Responsive breakpoints

### State Management with Pinia

Pinia is configured and ready to use. Create a store:

```javascript
// src/stores/counter.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  
  function increment() {
    count.value++
  }
  
  return { count, increment }
})
```

Use in components:
```vue
<script setup>
import { useCounterStore } from '../stores/counter'

const counter = useCounterStore()
</script>

<template>
  <div>{{ counter.count }}</div>
  <button @click="counter.increment">+</button>
</template>
```

## 🎨 Design Inspiration

This project is inspired by [Osmo Supply](https://www.osmo.supply/), featuring:
- Clean, modern design
- Smooth animations
- Responsive layout
- Professional typography
- Intuitive navigation

## 📝 Learning Path

### Beginner Concepts (Current)
- ✅ Component structure
- ✅ Template syntax
- ✅ Reactive data with `ref()`
- ✅ Event handling
- ✅ Conditional rendering
- ✅ List rendering

### Intermediate Concepts (Next Steps)
- Computed properties
- Watchers
- Props and emits
- Component lifecycle
- Pinia state management
- Form handling

### Advanced Concepts (Future)
- Custom composables
- Teleport
- Suspense
- Advanced routing
- Performance optimization
- Testing

## 🤝 Contributing

This is a learning project. Feel free to:
- Add new components
- Improve documentation
- Fix bugs
- Suggest features

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- Inspired by [Osmo Supply](https://www.osmo.supply/)
- Built with Vue.js and Tailwind CSS
- Designed for learning Vue.js effectively

---

**Happy Learning! 🚀**

Remember: The best way to learn Vue.js is by building. Each component in this project includes detailed comments explaining Vue concepts. Read the code, experiment, and build something amazing!

