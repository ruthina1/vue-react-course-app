# Vue.js Concepts Quick Reference

This file provides a quick reference for Vue.js concepts used in this project. For detailed explanations, see the component files themselves - each includes comprehensive comments.

## 📋 Table of Contents

1. [Single File Components](#single-file-components)
2. [Reactivity](#reactivity)
3. [Template Directives](#template-directives)
4. [Component Communication](#component-communication)
5. [Lifecycle Hooks](#lifecycle-hooks)
6. [Common Patterns](#common-patterns)

## 🧩 Single File Components

Vue components use `.vue` files with three sections:

```vue
<template>
  <!-- HTML with Vue directives -->
  <div>{{ message }}</div>
</template>

<script setup>
  // JavaScript logic
  import { ref } from 'vue'
  const message = ref('Hello Vue!')
</script>

<style scoped>
  /* Component-specific CSS */
  div {
    color: blue;
  }
</style>
```

**Key Points:**
- `<template>`: Where you write HTML
- `<script setup>`: Modern Vue 3 syntax (Composition API)
- `<style scoped>`: CSS that only applies to this component

## ⚡ Reactivity

### ref() - Reactive References

Creates reactive data that triggers re-renders when changed:

```javascript
import { ref } from 'vue'

const count = ref(0)        // Create reactive value
count.value = 1             // Modify in script (use .value)
```

```vue
<template>
  <div>{{ count }}</div>    <!-- Use in template (no .value) -->
</template>
```

**When to use:**
- Primitive values (string, number, boolean)
- Simple reactive state
- Values that change over time

### reactive() - Reactive Objects

For objects and arrays:

```javascript
import { reactive } from 'vue'

const state = reactive({
  name: 'Vue',
  version: 3
})

state.name = 'Vue.js'  // No .value needed
```

**When to use:**
- Objects or arrays
- Multiple related values
- Complex state structures

## 🎯 Template Directives

### v-if / v-else / v-else-if

Conditionally render elements:

```vue
<div v-if="isVisible">Visible</div>
<div v-else>Hidden</div>
```

**Note:** Elements are removed from DOM when false (use `v-show` if you want to hide but keep in DOM).

### v-for

Loop through arrays or objects:

```vue
<!-- Array -->
<div v-for="item in items" :key="item.id">
  {{ item.name }}
</div>

<!-- Object -->
<div v-for="(value, key) in object" :key="key">
  {{ key }}: {{ value }}
</div>

<!-- With index -->
<div v-for="(item, index) in items" :key="index">
  {{ index }}: {{ item.name }}
</div>
```

**Important:** Always use `:key` for performance and correct rendering.

### v-bind (:)

Bind attributes dynamically:

```vue
<img :src="imageUrl" :alt="imageAlt" />
<div :class="{ active: isActive }">Content</div>
<div :style="{ color: textColor }">Text</div>
```

Shorthand: `:` instead of `v-bind:`

### v-on (@)

Listen to events:

```vue
<button @click="handleClick">Click</button>
<input @input="handleInput" @keyup.enter="submit" />
```

Shorthand: `@` instead of `v-on:`

### v-model

Two-way data binding for form inputs:

```vue
<input v-model="message" />
<!-- Equivalent to: -->
<input :value="message" @input="message = $event.target.value" />
```

## 🔄 Component Communication

### Props (Parent → Child)

Pass data from parent to child:

```vue
<!-- Parent -->
<ChildComponent :title="pageTitle" :count="5" />

<!-- Child -->
<script setup>
defineProps({
  title: String,
  count: Number
})
</script>

<template>
  <h1>{{ title }}</h1>
  <p>Count: {{ count }}</p>
</template>
```

### Emits (Child → Parent)

Send events from child to parent:

```vue
<!-- Child -->
<script setup>
const emit = defineEmits(['update', 'delete'])

function handleClick() {
  emit('update', { id: 1, name: 'Updated' })
}
</script>

<template>
  <button @click="handleClick">Update</button>
</template>

<!-- Parent -->
<ChildComponent @update="handleUpdate" />

<script setup>
function handleUpdate(data) {
  console.log('Received:', data)
}
</script>
```

## 🎣 Lifecycle Hooks

Vue components have lifecycle hooks:

```javascript
import { onMounted, onUnmounted, onUpdated } from 'vue'

onMounted(() => {
  // Component mounted to DOM
  console.log('Component mounted')
})

onUpdated(() => {
  // Component updated
  console.log('Component updated')
})

onUnmounted(() => {
  // Component removed from DOM
  console.log('Component unmounted')
})
```

**Common Lifecycle Hooks:**
- `onMounted`: After component is added to DOM
- `onUnmounted`: Before component is removed
- `onUpdated`: After component updates
- `onBeforeMount`: Before mounting
- `onBeforeUnmount`: Before unmounting

## 💡 Common Patterns

### Computed Properties

Derived values that update automatically:

```javascript
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})
```

**Use when:** You need a value derived from other reactive data.

### Watchers

React to data changes:

```javascript
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})
```

**Use when:** You need to perform side effects when data changes.

### Template Refs

Access DOM elements:

```vue
<template>
  <input ref="inputRef" />
</template>

<script setup>
import { ref, onMounted } from 'vue'

const inputRef = ref(null)

onMounted(() => {
  inputRef.value.focus()  // Focus the input
})
</script>
```

## 🎨 Styling with Tailwind CSS

This project uses Tailwind CSS for styling:

```vue
<template>
  <!-- Utility classes -->
  <div class="flex items-center justify-between p-4 bg-white rounded-lg">
    <h1 class="text-2xl font-bold text-black">Title</h1>
    <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Click
    </button>
  </div>
</template>
```

**Common Tailwind Classes:**
- Layout: `flex`, `grid`, `block`, `inline`
- Spacing: `p-4` (padding), `m-4` (margin)
- Typography: `text-xl`, `font-bold`, `text-center`
- Colors: `bg-white`, `text-black`, `border-gray-200`
- Responsive: `md:`, `lg:`, `xl:` prefixes

## 🚀 Next Steps

1. **Read the component files** - Each has detailed comments
2. **Experiment** - Modify values and see what happens
3. **Build something** - Create your own components
4. **Read Vue docs** - [vuejs.org](https://vuejs.org)

## 📚 Resources

- [Vue.js Official Docs](https://vuejs.org)
- [Vue Router Docs](https://router.vuejs.org)
- [Pinia Docs](https://pinia.vuejs.org)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Vite Docs](https://vitejs.dev)

---

**Remember:** The best way to learn is by doing. Open the component files, read the comments, and experiment!

