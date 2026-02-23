import pool from './connection.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Real course content data
const vueLessons = [
  {
    moduleTitle: 'Web Fundamentals (Prerequisite)',
    lessons: [
      {
        title: 'HTML basics',
        slug: 'html-basics',
        content: `# HTML Basics

HTML (HyperText Markup Language) is the foundation of web development. It provides the structure for web pages.

## Key Concepts

### Document Structure
Every HTML document follows a basic structure:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
\`\`\`

### Common Elements
- **Headings**: \`<h1>\` to \`<h6>\` for different heading levels
- **Paragraphs**: \`<p>\` for text content
- **Links**: \`<a href="url">\` for navigation
- **Images**: \`<img src="path" alt="description">\`
- **Lists**: \`<ul>\`, \`<ol>\`, \`<li>\` for unordered/ordered lists
- **Divs**: \`<div>\` for grouping elements

### Semantic HTML
Use semantic elements for better structure:
- \`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<article>\`, \`<footer>\`

## Practice
Create a simple HTML page with:
1. A header with your name
2. A navigation menu
3. A main section with an article
4. A footer with copyright info`,
        isPractice: false,
        estimatedTime: 10
      },
      {
        title: 'CSS basics (Flexbox, Grid)',
        slug: 'css-basics-flexbox-grid',
        content: `# CSS Basics: Flexbox & Grid

CSS (Cascading Style Sheets) controls the visual presentation of HTML elements.

## Flexbox

Flexbox is a one-dimensional layout method for arranging items in rows or columns.

### Key Properties

**Container (parent):**
\`\`\`css
.container {
    display: flex;
    flex-direction: row; /* or column */
    justify-content: center; /* main axis alignment */
    align-items: center; /* cross axis alignment */
    gap: 20px;
}
\`\`\`

**Items (children):**
\`\`\`css
.item {
    flex: 1; /* grow and shrink */
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
}
\`\`\`

## CSS Grid

Grid is a two-dimensional layout system for rows and columns.

### Key Properties

\`\`\`css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 20px;
}

.grid-item {
    grid-column: span 1;
    grid-row: span 1;
}
\`\`\`

## When to Use What?

- **Flexbox**: One-dimensional layouts (navigation bars, card rows)
- **Grid**: Two-dimensional layouts (page layouts, complex designs)
- **Both**: Can be combined for powerful layouts

## Practice
Create a responsive card layout using:
1. Grid for the overall layout (3 columns on desktop, 1 on mobile)
2. Flexbox for card internal layout`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'JavaScript (ES6+)',
        slug: 'javascript-es6',
        content: `# JavaScript ES6+

Modern JavaScript features that are essential for Vue.js development.

## let and const

\`\`\`javascript
// let - block-scoped, can be reassigned
let name = 'John';
name = 'Jane'; // OK

// const - block-scoped, cannot be reassigned
const age = 25;
age = 26; // Error!
\`\`\`

## Arrow Functions

\`\`\`javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With single parameter
const square = x => x * x;

// With body
const greet = name => {
    const message = \`Hello, \${name}!\`;
    return message;
};
\`\`\`

## Destructuring

\`\`\`javascript
// Array destructuring
const [first, second] = [1, 2];

// Object destructuring
const { name, age } = { name: 'John', age: 25 };

// Function parameters
function greet({ name, age }) {
    return \`\${name} is \${age} years old\`;
}
\`\`\`

## Modules

\`\`\`javascript
// Export
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default class Calculator { }

// Import
import Calculator, { PI, add } from './math.js';
\`\`\`

## Promises & async/await

\`\`\`javascript
// Promise
fetch('/api/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// async/await
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
\`\`\`

## Practice
Create a function that:
1. Fetches user data from an API
2. Destructures the response
3. Uses async/await syntax`,
        isPractice: false,
        estimatedTime: 20,
        children: ['let / const', 'Arrow functions', 'Destructuring', 'Modules', 'Promises & async/await']
      }
    ]
  },
  {
    moduleTitle: 'Template Syntax',
    lessons: [
      {
        title: 'Text interpolation {{ }}',
        slug: 'text-interpolation',
        content: `# Text Interpolation

Text interpolation is the most basic way to display data in Vue templates.

## Basic Interpolation

Use double curly braces \`{{ }}\` to display reactive data:

\`\`\`vue
<template>
  <div>
    <p>{{ message }}</p>
    <p>Count: {{ count }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue!')
const count = ref(42)
</script>
\`\`\`

## JavaScript Expressions

You can use JavaScript expressions inside interpolation:

\`\`\`vue
<template>
  <div>
    <p>{{ message.toUpperCase() }}</p>
    <p>{{ count + 1 }}</p>
    <p>{{ isActive ? 'Active' : 'Inactive' }}</p>
    <p>{{ user.firstName + ' ' + user.lastName }}</p>
  </div>
</template>
\`\`\`

## Important Notes

- Only **single expressions** are allowed (no statements)
- Vue automatically updates the DOM when data changes
- Use \`.value\` in script, but not in template

## Practice

Create a component that displays:
1. Your name using interpolation
2. Current date/time
3. A calculated value (e.g., price * quantity)`,
        isPractice: false,
        estimatedTime: 10
      },
      {
        title: 'Vue v-bind',
        slug: 'vue-v-bind',
        content: `# Vue v-bind Directive

The \`v-bind\` directive is used to bind an HTML attribute to a Vue data property.

## Basic Syntax

\`\`\`vue
<template>
  <div>
    <img v-bind:src="imageSrc" v-bind:alt="imageAlt" />
    <a v-bind:href="url">Visit Website</a>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const imageSrc = ref('https://example.com/image.jpg')
const imageAlt = ref('Example Image')
const url = ref('https://vuejs.org')
</script>
\`\`\`

## Shorthand Syntax

You can use \`:\` as a shorthand for \`v-bind:\`:

\`\`\`vue
<template>
  <div>
    <img :src="imageSrc" :alt="imageAlt" />
    <a :href="url">Visit Website</a>
  </div>
</template>
\`\`\`

## Binding Multiple Attributes

\`\`\`vue
<template>
  <div>
    <button :disabled="isDisabled" :class="buttonClass">
      Click me
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDisabled = ref(false)
const buttonClass = ref('btn-primary')
</script>
\`\`\`

## Exercise 1: Image Gallery

Create an image gallery component that:
1. Uses v-bind to bind image sources from an array
2. Displays 5 different images
3. Each image has a dynamic alt text

**Solution:**
\`\`\`vue
<template>
  <div class="gallery">
    <img 
      v-for="(image, index) in images" 
      :key="index"
      :src="image.src" 
      :alt="image.alt"
      class="gallery-image"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const images = ref([
  { src: 'https://picsum.photos/200/300?random=1', alt: 'Image 1' },
  { src: 'https://picsum.photos/200/300?random=2', alt: 'Image 2' },
  { src: 'https://picsum.photos/200/300?random=3', alt: 'Image 3' },
  { src: 'https://picsum.photos/200/300?random=4', alt: 'Image 4' },
  { src: 'https://picsum.photos/200/300?random=5', alt: 'Image 5' }
])
</script>
\`\`\`

## Exercise 2: Dynamic Links

Create a navigation component with dynamic links:
1. Use v-bind for href attributes
2. Display 3 navigation links
3. Make one link disabled based on a condition

**Solution:**
\`\`\`vue
<template>
  <nav>
    <a 
      v-for="link in links" 
      :key="link.id"
      :href="link.url" 
      :class="{ disabled: link.disabled }"
    >
      {{ link.text }}
    </a>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const links = ref([
  { id: 1, text: 'Home', url: '/', disabled: false },
  { id: 2, text: 'About', url: '/about', disabled: false },
  { id: 3, text: 'Contact', url: '/contact', disabled: true }
])
</script>
\`\`\``,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Vue v-if',
        slug: 'vue-v-if',
        content: `# Vue v-if Directive

The \`v-if\` directive is used to conditionally render an element.

## Basic Usage

\`\`\`vue
<template>
  <div>
    <p v-if="isVisible">This text is visible</p>
    <p v-if="!isVisible">This text is hidden</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isVisible = ref(true)
</script>
\`\`\`

## v-if, v-else-if, v-else

\`\`\`vue
<template>
  <div>
    <p v-if="score >= 90">Excellent! Grade: A</p>
    <p v-else-if="score >= 80">Great! Grade: B</p>
    <p v-else-if="score >= 70">Good! Grade: C</p>
    <p v-else>Keep practicing! Grade: D</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const score = ref(85)
</script>
\`\`\`

## Using v-if with Template

Use \`<template>\` to conditionally render multiple elements:

\`\`\`vue
<template>
  <div>
    <template v-if="user">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </template>
    <p v-else>Please log in</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({ name: 'John Doe', email: 'john@example.com' })
</script>
\`\`\`

## Exercise 1: Login Status

Create a component that shows different content based on login status:
1. If logged in: Show welcome message with user name
2. If not logged in: Show login button

**Solution:**
\`\`\`vue
<template>
  <div>
    <div v-if="isLoggedIn">
      <h2>Welcome back, {{ userName }}!</h2>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <p>Please log in to continue</p>
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLoggedIn = ref(false)
const userName = ref('John Doe')

function login() {
  isLoggedIn.value = true
}

function logout() {
  isLoggedIn.value = false
}
</script>
\`\`\`

## Exercise 2: Grade Calculator

Create a grade calculator that displays different messages based on score:
1. Score >= 90: "Excellent! You got an A"
2. Score >= 80: "Great! You got a B"
3. Score >= 70: "Good! You got a C"
4. Score < 70: "You need to improve"

**Solution:**
\`\`\`vue
<template>
  <div>
    <input v-model.number="score" type="number" placeholder="Enter score" />
    <div v-if="score >= 90" class="grade-a">Excellent! You got an A</div>
    <div v-else-if="score >= 80" class="grade-b">Great! You got a B</div>
    <div v-else-if="score >= 70" class="grade-c">Good! You got a C</div>
    <div v-else class="grade-f">You need to improve</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const score = ref(0)
</script>
\`\`\``,
        isPractice: false,
        estimatedTime: 18
      },
      {
        title: 'Vue v-show',
        slug: 'vue-v-show',
        content: `# Vue v-show Directive

The \`v-show\` directive toggles the visibility of an element using CSS display property.

## Basic Usage

\`\`\`vue
<template>
  <div>
    <p v-show="isVisible">This can be toggled</p>
    <button @click="toggle">Toggle Visibility</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isVisible = ref(true)

function toggle() {
  isVisible.value = !isVisible.value
}
</script>
\`\`\`

## v-if vs v-show

**v-if:**
- Conditionally renders the element
- Removes/adds element from DOM
- Better for expensive components
- Use when condition rarely changes

**v-show:**
- Always renders the element
- Toggles CSS \`display: none\`
- Better for frequent toggling
- Use when condition changes often

\`\`\`vue
<template>
  <div>
    <!-- v-if: Element removed from DOM -->
    <div v-if="show">v-if example</div>
    
    <!-- v-show: Element stays, CSS toggled -->
    <div v-show="show">v-show example</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>
\`\`\`

## Exercise 1: Toggle Menu

Create a navigation menu that can be toggled:
1. Use v-show to show/hide menu
2. Add a button to toggle visibility
3. Menu should slide in/out smoothly

**Solution:**
\`\`\`vue
<template>
  <div>
    <button @click="toggleMenu">Toggle Menu</button>
    <nav v-show="menuVisible" class="menu">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuVisible = ref(false)

function toggleMenu() {
  menuVisible.value = !menuVisible.value
}
</script>

<style scoped>
.menu {
  transition: opacity 0.3s;
}
</style>
\`\`\`

## Exercise 2: Password Visibility Toggle

Create a password input with show/hide toggle:
1. Use v-show to toggle password visibility
2. Switch between password and text input type
3. Add an eye icon button

**Solution:**
\`\`\`vue
<template>
  <div>
    <input 
      :type="showPassword ? 'text' : 'password'" 
      v-model="password"
      placeholder="Enter password"
    />
    <button @click="showPassword = !showPassword">
      {{ showPassword ? 'Hide' : 'Show' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const password = ref('')
const showPassword = ref(false)
</script>
\`\`\``,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Vue v-for',
        slug: 'vue-v-for',
        content: `# Vue v-for Directive

The \`v-for\` directive is used to render a list of items.

## Basic Usage

\`\`\`vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Orange' }
])
</script>
\`\`\`

## Using Index

\`\`\`vue
<template>
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ index + 1 }}. {{ item.name }}
    </li>
  </ul>
</template>
\`\`\`

## Iterating Over Objects

\`\`\`vue
<template>
  <div>
    <div v-for="(value, key) in user" :key="key">
      {{ key }}: {{ value }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({
  name: 'John Doe',
  age: 30,
  email: 'john@example.com'
})
</script>
\`\`\`

## Using Key Attribute

Always use \`:key\` with v-for for better performance and correct updates:

\`\`\`vue
<template>
  <div>
    <div v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
    </div>
  </div>
</template>
\`\`\`

## Exercise 1: Todo List

Create a todo list component:
1. Display todos using v-for
2. Each todo should have a unique key
3. Show index number for each todo

**Solution:**
\`\`\`vue
<template>
  <div>
    <ul>
      <li v-for="(todo, index) in todos" :key="todo.id">
        {{ index + 1 }}. {{ todo.text }}
        <button @click="removeTodo(todo.id)">Delete</button>
      </li>
    </ul>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add todo" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const todos = ref([
  { id: 1, text: 'Learn Vue' },
  { id: 2, text: 'Build app' },
  { id: 3, text: 'Deploy' }
])

const newTodo = ref('')

function addTodo() {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value
    })
    newTodo.value = ''
  }
}

function removeTodo(id) {
  todos.value = todos.value.filter(todo => todo.id !== id)
}
</script>
\`\`\`

## Exercise 2: Product Grid

Create a product grid component:
1. Display products in a grid layout
2. Show product name, price, and image
3. Use v-for to render products

**Solution:**
\`\`\`vue
<template>
  <div class="product-grid">
    <div v-for="product in products" :key="product.id" class="product-card">
      <img :src="product.image" :alt="product.name" />
      <h3>{{ product.name }}</h3>
      <p>\${{ product.price }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
  { id: 1, name: 'Laptop', price: 999, image: '/images/laptop.jpg' },
  { id: 2, name: 'Phone', price: 699, image: '/images/phone.jpg' },
  { id: 3, name: 'Tablet', price: 399, image: '/images/tablet.jpg' }
])
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
</style>
\`\`\``,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Directives',
        slug: 'directives',
        content: `# Vue Directives Overview

Directives are special attributes that start with \`v-\` prefix. They provide reactive behavior to the DOM.

## Common Directives

- \`v-if\` - Conditionally render elements
- \`v-show\` - Toggle element visibility
- \`v-for\` - Render lists
- \`v-bind\` - Bind attributes
- \`v-on\` - Listen to events
- \`v-model\` - Two-way data binding

## Exercise: Complete Form

Create a complete form using multiple directives:
1. Use v-for for a select dropdown with options
2. Use v-if to show/hide form sections
3. Use v-model for form inputs
4. Use v-show for validation messages

**Solution:**
\`\`\`vue
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Name:</label>
      <input v-model="form.name" type="text" />
      <span v-show="!form.name">Name is required</span>
    </div>
    
    <div>
      <label>Country:</label>
      <select v-model="form.country">
        <option v-for="country in countries" :key="country" :value="country">
          {{ country }}
        </option>
      </select>
    </div>
    
    <div v-if="form.country === 'USA'">
      <label>State:</label>
      <input v-model="form.state" type="text" />
    </div>
    
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  country: '',
  state: ''
})

const countries = ref(['USA', 'Canada', 'UK', 'Australia'])

function handleSubmit() {
  console.log('Form submitted:', form.value)
}
</script>
\`\`\``,
        isPractice: false,
        estimatedTime: 15,
        children: ['v-if, v-else', 'v-for', 'v-show']
      },
      {
        title: 'Vue Events',
        slug: 'vue-events',
        content: `# Vue Events

Vue allows you to listen to DOM events and execute JavaScript when they occur.

## Basic Event Handling

\`\`\`vue
<template>
  <div>
    <button @click="counter++">Count: {{ counter }}</button>
    <button @click="sayHello">Say Hello</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const counter = ref(0)

function sayHello() {
  alert('Hello!')
}
</script>
\`\`\`

## Accessing Event Object

\`\`\`vue
<template>
  <div>
    <button @click="handleClick">Click me</button>
    <input @input="handleInput" />
  </div>
</template>

<script setup>
function handleClick(event) {
  console.log('Button clicked:', event)
  console.log('Target:', event.target)
}

function handleInput(event) {
  console.log('Input value:', event.target.value)
}
</script>
\`\`\`

## Exercise 1: Click Counter

Create a click counter with multiple buttons:
1. Increment button
2. Decrement button
3. Reset button
4. Display current count

**Solution:**
\`\`\`vue
<template>
  <div>
    <h2>Count: {{ count }}</h2>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}

function decrement() {
  count.value--
}

function reset() {
  count.value = 0
}
</script>
\`\`\`

## Exercise 2: Mouse Position Tracker

Create a component that tracks mouse position:
1. Display X and Y coordinates
2. Update on mouse move
3. Show coordinates in real-time

**Solution:**
\`\`\`vue
<template>
  <div @mousemove="updatePosition" class="tracker">
    <p>X: {{ x }}</p>
    <p>Y: {{ y }}</p>
    <p>Move your mouse here</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const x = ref(0)
const y = ref(0)

function updatePosition(event) {
  x.value = event.clientX
  y.value = event.clientY
}
</script>

<style scoped>
.tracker {
  padding: 20px;
  border: 2px solid #ccc;
  min-height: 200px;
}
</style>
\`\`\``,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Vue v-on',
        slug: 'vue-v-on',
        content: `# Vue v-on Directive

The \`v-on\` directive attaches an event listener to an element.

## Syntax

\`\`\`vue
<template>
  <div>
    <!-- Full syntax -->
    <button v-on:click="handleClick">Click me</button>
    
    <!-- Shorthand -->
    <button @click="handleClick">Click me</button>
  </div>
</template>
\`\`\`

## Multiple Events

\`\`\`vue
<template>
  <div>
    <input 
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      @keyup.enter="onEnter"
    />
  </div>
</template>

<script setup>
function onFocus() {
  console.log('Input focused')
}

function onBlur() {
  console.log('Input blurred')
}

function onInput(event) {
  console.log('Input value:', event.target.value)
}

function onEnter() {
  console.log('Enter key pressed')
}
</script>
\`\`\`

## Exercise: Interactive Form

Create an interactive form with multiple event handlers:
1. Show message on focus
2. Validate on blur
3. Submit on Enter key
4. Clear on Escape key

**Solution:**
\`\`\`vue
<template>
  <form @submit.prevent="handleSubmit">
    <input 
      v-model="email"
      @focus="showMessage('Email field focused')"
      @blur="validateEmail"
      @keyup.enter="handleSubmit"
      @keyup.esc="clearForm"
      placeholder="Enter email"
    />
    <p v-if="message">{{ message }}</p>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const message = ref('')

function showMessage(msg) {
  message.value = msg
}

function validateEmail() {
  if (!email.value.includes('@')) {
    message.value = 'Invalid email format'
  } else {
    message.value = ''
  }
}

function handleSubmit() {
  if (email.value) {
    alert('Form submitted: ' + email.value)
  }
}

function clearForm() {
  email.value = ''
  message.value = ''
}
</script>
\`\`\``,
        isPractice: false,
        estimatedTime: 18
      },
      {
        title: 'Vue Methods',
        slug: 'vue-methods',
        content: `# Vue Methods

Methods are functions defined in the component that can be called from templates or other methods.

## Defining Methods

\`\`\`vue
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="changeMessage">Change Message</button>
    <button @click="greet('Hello')">Greet</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Initial message')

function changeMessage() {
  message.value = 'Message changed!'
}

function greet(greeting) {
  alert(greeting + ', ' + message.value)
}
</script>
\`\`\`

## Methods with Parameters

\`\`\`vue
<template>
  <div>
    <button @click="add(5)">Add 5</button>
    <button @click="add(10)">Add 10</button>
    <p>Total: {{ total }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const total = ref(0)

function add(amount) {
  total.value += amount
}
</script>
\`\`\`

## Exercise 1: Calculator

Create a simple calculator:
1. Add, subtract, multiply, divide methods
2. Display result
3. Clear function

**Solution:**
\`\`\`vue
<template>
  <div>
    <input v-model.number="num1" type="number" />
    <input v-model.number="num2" type="number" />
    <div>
      <button @click="add">+</button>
      <button @click="subtract">-</button>
      <button @click="multiply">×</button>
      <button @click="divide">÷</button>
      <button @click="clear">Clear</button>
    </div>
    <p>Result: {{ result }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const num1 = ref(0)
const num2 = ref(0)
const result = ref(0)

function add() {
  result.value = num1.value + num2.value
}

function subtract() {
  result.value = num1.value - num2.value
}

function multiply() {
  result.value = num1.value * num2.value
}

function divide() {
  if (num2.value !== 0) {
    result.value = num1.value / num2.value
  } else {
    alert('Cannot divide by zero')
  }
}

function clear() {
  num1.value = 0
  num2.value = 0
  result.value = 0
}
</script>
\`\`\`

## Exercise 2: Todo Manager

Create a todo manager with methods:
1. Add todo method
2. Remove todo method
3. Toggle complete method
4. Clear all method

**Solution:**
\`\`\`vue
<template>
  <div>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add todo" />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="toggleTodo(todo.id)">Toggle</button>
        <button @click="removeTodo(todo.id)">Delete</button>
      </li>
    </ul>
    <button @click="clearAll">Clear All</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const todos = ref([])
const newTodo = ref('')

function addTodo() {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value,
      completed: false
    })
    newTodo.value = ''
  }
}

function removeTodo(id) {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

function toggleTodo(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

function clearAll() {
  todos.value = []
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
\`\`\``,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Vue Event Modifiers',
        slug: 'vue-event-modifiers',
        content: `# Vue Event Modifiers

Event modifiers are special postfixes denoted by a dot that modify event behavior.

## Common Modifiers

\`\`\`vue
<template>
  <div>
    <!-- .prevent - calls event.preventDefault() -->
    <form @submit.prevent="handleSubmit">
      <button type="submit">Submit</button>
    </form>
    
    <!-- .stop - calls event.stopPropagation() -->
    <div @click="outerClick">
      <button @click.stop="innerClick">Click me</button>
    </div>
    
    <!-- .once - event will trigger at most once -->
    <button @click.once="doSomething">Click once</button>
    
    <!-- .self - only trigger if event.target is the element itself -->
    <div @click.self="handleClick">
      <p>Click here won't trigger</p>
    </div>
  </div>
</template>
\`\`\`

## Key Modifiers

\`\`\`vue
<template>
  <div>
    <!-- Trigger on Enter key -->
    <input @keyup.enter="submit" />
    
    <!-- Trigger on Escape key -->
    <input @keyup.esc="cancel" />
    
    <!-- Chain modifiers -->
    <input @keyup.enter.prevent="submit" />
  </div>
</template>
\`\`\`

## Exercise: Form with Modifiers

Create a form that uses event modifiers:
1. Prevent default form submission
2. Stop propagation on nested clicks
3. Submit on Enter key
4. Cancel on Escape key

**Solution:**
\`\`\`vue
<template>
  <form @submit.prevent="handleSubmit">
    <div @click="outerClick">
      <input 
        v-model="name"
        @keyup.enter.prevent="handleSubmit"
        @keyup.esc="cancel"
        placeholder="Name"
      />
      <button @click.stop="innerClick">Inner Button</button>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')

function handleSubmit() {
  if (name.value) {
    alert('Submitted: ' + name.value)
  }
}

function cancel() {
  name.value = ''
  alert('Cancelled')
}

function outerClick() {
  console.log('Outer clicked')
}

function innerClick() {
  console.log('Inner clicked')
}
</script>
\`\`\``,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Event handling @click',
        slug: 'event-handling-click',
        content: `# Event Handling with @click

The \`@click\` shorthand is the most common way to handle click events in Vue.

## Basic Click Handling

\`\`\`vue
<template>
  <div>
    <button @click="counter++">Count: {{ counter }}</button>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const counter = ref(0)

function increment() {
  counter.value++
}
</script>
\`\`\`

## Exercise: Interactive Counter

Create an interactive counter with multiple click handlers:
1. Increment button
2. Decrement button  
3. Reset button
4. Double click to multiply by 2

**Solution:**
\`\`\`vue
<template>
  <div>
    <h2>Count: {{ count }}</h2>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <button @click="reset">Reset</button>
    <button @dblclick="multiply">Double click to ×2</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}

function decrement() {
  count.value--
}

function reset() {
  count.value = 0
}

function multiply() {
  count.value *= 2
}
</script>
\`\`\``,
        isPractice: false,
        estimatedTime: 10
      },
      {
        title: 'Attribute binding :class, :style',
        slug: 'attribute-binding-class-style',
        content: `# Attribute Binding

Use \`:\` (or \`v-bind:\`) to bind attributes dynamically.

## Class Binding

\`\`\`vue
<template>
  <div>
    <!-- Object syntax -->
    <div :class="{ active: isActive, 'text-danger': hasError }">
      Content
    </div>
    
    <!-- Array syntax -->
    <div :class="[activeClass, errorClass]">
      Content
    </div>
    
    <!-- Computed -->
    <div :class="computedClass">
      Content
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isActive = ref(true)
const hasError = ref(false)
const activeClass = ref('active')
const errorClass = ref('text-danger')

const computedClass = computed(() => ({
  active: isActive.value,
  'text-danger': hasError.value
}))
</script>
\`\`\`

## Style Binding

\`\`\`vue
<template>
  <div>
    <!-- Object syntax -->
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">
      Styled text
    </div>
    
    <!-- Array syntax -->
    <div :style="[baseStyles, overridingStyles]">
      Multiple styles
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeColor = ref('red')
const fontSize = ref(30)

const baseStyles = { color: 'blue', padding: '10px' }
const overridingStyles = { color: 'green' }
</script>
\`\`\`

## Practice

Create a button that:
1. Changes color based on state
2. Adds/removes classes dynamically
3. Updates styles on hover`,
        isPractice: false,
        estimatedTime: 12
      },
      {
        title: 'Vue Forms',
        slug: 'vue-forms',
        content: `# Vue Forms

Vue makes form handling easy with reactive data binding.

## Basic Form

\`\`\`vue
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Name:</label>
      <input v-model="form.name" type="text" />
    </div>
    <div>
      <label>Email:</label>
      <input v-model="form.email" type="email" />
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: ''
})

function handleSubmit() {
  console.log('Form submitted:', form.value)
  alert('Name: ' + form.value.name + ', Email: ' + form.value.email)
}
</script>
\`\`\`

## Exercise: Registration Form

Create a complete registration form:
1. Name, email, password fields
2. Terms checkbox
3. Country select dropdown
4. Submit handler

**Solution:**
\`\`\`vue
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Name:</label>
      <input v-model="form.name" type="text" required />
    </div>
    <div>
      <label>Email:</label>
      <input v-model="form.email" type="email" required />
    </div>
    <div>
      <label>Password:</label>
      <input v-model="form.password" type="password" required />
    </div>
    <div>
      <label>Country:</label>
      <select v-model="form.country" required>
        <option value="">Select country</option>
        <option value="usa">USA</option>
        <option value="uk">UK</option>
        <option value="canada">Canada</option>
      </select>
    </div>
    <div>
      <input type="checkbox" v-model="form.terms" id="terms" />
      <label for="terms">I agree to the terms</label>
    </div>
    <button type="submit" :disabled="!form.terms">Register</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  password: '',
  country: '',
  terms: false
})

function handleSubmit() {
  if (form.value.terms) {
    alert('Registration successful!')
    console.log('Form data:', form.value)
  } else {
    alert('Please accept the terms')
  }
}
</script>
\`\`\``,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Vue v-model',
        slug: 'vue-v-model',
        content: `# Vue v-model Directive

\`v-model\` creates two-way data binding between form inputs and Vue data.

## Text Inputs

\`\`\`vue
<template>
  <div>
    <input v-model="message" placeholder="Type something" />
    <p>You typed: {{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
</script>
\`\`\`

## Textarea

\`\`\`vue
<template>
  <div>
    <textarea v-model="text" placeholder="Enter text"></textarea>
    <p>Character count: {{ text.length }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('')
</script>
\`\`\`

## Select Dropdown

\`\`\`vue
<template>
  <div>
    <select v-model="selected">
      <option disabled value="">Please select</option>
      <option value="vue">Vue</option>
      <option value="react">React</option>
      <option value="angular">Angular</option>
    </select>
    <p>Selected: {{ selected }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref('')
</script>
\`\`\`

## Checkboxes

\`\`\`vue
<template>
  <div>
    <!-- Single checkbox -->
    <input type="checkbox" v-model="checked" id="check1" />
    <label for="check1">I agree</label>
    
    <!-- Multiple checkboxes -->
    <div>
      <input type="checkbox" value="vue" v-model="frameworks" id="vue" />
      <label for="vue">Vue</label>
      <input type="checkbox" value="react" v-model="frameworks" id="react" />
      <label for="react">React</label>
      <input type="checkbox" value="angular" v-model="frameworks" id="angular" />
      <label for="angular">Angular</label>
    </div>
    <p>Selected: {{ frameworks }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
const frameworks = ref([])
</script>
\`\`\`

## Radio Buttons

\`\`\`vue
<template>
  <div>
    <input type="radio" value="male" v-model="gender" id="male" />
    <label for="male">Male</label>
    <input type="radio" value="female" v-model="gender" id="female" />
    <label for="female">Female</label>
    <p>Selected: {{ gender }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const gender = ref('')
</script>
\`\`\`

## v-model Modifiers

\`\`\`vue
<template>
  <div>
    <!-- .lazy - update on change instead of input -->
    <input v-model.lazy="msg" />
    <p>Value updates on blur: {{ msg }}</p>
    
    <!-- .number - convert to number -->
    <input v-model.number="age" type="number" />
    <p>Age type: {{ typeof age }}</p>
    
    <!-- .trim - trim whitespace -->
    <input v-model.trim="message" />
    <p>Trimmed: "{{ message }}"</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const msg = ref('')
const age = ref(0)
const message = ref('')
</script>
\`\`\`

## Exercise: Complete Form with v-model

Create a complete form using v-model:
1. Text input for name
2. Email input
3. Password input
4. Select dropdown for country
5. Checkbox for newsletter
6. Radio buttons for gender
7. Display all values

**Solution:**
\`\`\`vue
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Name:</label>
      <input v-model.trim="form.name" type="text" />
    </div>
    <div>
      <label>Email:</label>
      <input v-model.trim="form.email" type="email" />
    </div>
    <div>
      <label>Password:</label>
      <input v-model="form.password" type="password" />
    </div>
    <div>
      <label>Age:</label>
      <input v-model.number="form.age" type="number" />
    </div>
    <div>
      <label>Country:</label>
      <select v-model="form.country">
        <option value="">Select</option>
        <option value="usa">USA</option>
        <option value="uk">UK</option>
        <option value="canada">Canada</option>
      </select>
    </div>
    <div>
      <label>Gender:</label>
      <input type="radio" value="male" v-model="form.gender" id="male" />
      <label for="male">Male</label>
      <input type="radio" value="female" v-model="form.gender" id="female" />
      <label for="female">Female</label>
    </div>
    <div>
      <input type="checkbox" v-model="form.newsletter" id="newsletter" />
      <label for="newsletter">Subscribe to newsletter</label>
    </div>
    <button type="submit">Submit</button>
  </form>
  
  <div v-if="submitted">
    <h3>Submitted Data:</h3>
    <pre>{{ JSON.stringify(form, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  password: '',
  age: 0,
  country: '',
  gender: '',
  newsletter: false
})

const submitted = ref(false)

function handleSubmit() {
  submitted.value = true
  console.log('Form submitted:', form.value)
}
</script>
\`\`\``,
        isPractice: false,
        estimatedTime: 25
      },
      {
        title: 'Two-way binding v-model',
        slug: 'two-way-binding-v-model',
        content: `# Two-Way Binding with v-model

\`v-model\` creates two-way data binding - changes in the input update the data, and changes in the data update the input.

## How v-model Works

\`v-model\` is syntactic sugar for:
\`\`\`vue
<input :value="text" @input="text = $event.target.value" />
\`\`\`

Which is equivalent to:
\`\`\`vue
<input v-model="text" />
\`\`\`

## Exercise: Real-time Preview

Create a component with real-time preview:
1. Text input for title
2. Textarea for description
3. Display preview below
4. Update preview as you type

**Solution:**
\`\`\`vue
<template>
  <div>
    <div>
      <label>Title:</label>
      <input v-model="title" placeholder="Enter title" />
    </div>
    <div>
      <label>Description:</label>
      <textarea v-model="description" placeholder="Enter description"></textarea>
    </div>
    <div class="preview">
      <h2>{{ title || 'Preview Title' }}</h2>
      <p>{{ description || 'Preview description will appear here...' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('')
const description = ref('')
</script>

<style scoped>
.preview {
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
}
</style>
\`\`\``,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Vue CSS Binding',
        slug: 'vue-css-binding',
        content: `# Vue CSS Binding

Vue allows you to dynamically bind CSS classes and inline styles.

## Class Binding

\`\`\`vue
<template>
  <div>
    <!-- Object syntax -->
    <div :class="{ active: isActive, 'text-danger': hasError }">
      Dynamic classes
    </div>
    
    <!-- Array syntax -->
    <div :class="[activeClass, errorClass]">
      Multiple classes
    </div>
    
    <!-- Mixed -->
    <div :class="[{ active: isActive }, errorClass]">
      Mixed syntax
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isActive = ref(true)
const hasError = ref(false)
const activeClass = ref('active')
const errorClass = ref('text-danger')
</script>
\`\`\`

## Style Binding

\`\`\`vue
<template>
  <div>
    <!-- Object syntax -->
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">
      Styled text
    </div>
    
    <!-- Array syntax -->
    <div :style="[baseStyles, overridingStyles]">
      Multiple styles
    </div>
    
    <!-- CSS variables -->
    <div :style="{ '--main-color': mainColor }">
      CSS variable
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeColor = ref('red')
const fontSize = ref(30)
const mainColor = ref('#42b983')

const baseStyles = { color: 'blue', padding: '10px' }
const overridingStyles = { color: 'green' }
</script>
\`\`\`

## Exercise 1: Dynamic Button Styles

Create buttons with dynamic styles:
1. Change color based on state
2. Add/remove classes on click
3. Toggle between styles

**Solution:**
\`\`\`vue
<template>
  <div>
    <button 
      :class="{ 'btn-primary': isPrimary, 'btn-secondary': !isPrimary }"
      :style="{ 
        backgroundColor: buttonColor, 
        color: textColor,
        padding: '10px 20px'
      }"
      @click="toggleStyle"
    >
      Click to change style
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isPrimary = ref(true)
const buttonColor = ref('#42b983')
const textColor = ref('white')

function toggleStyle() {
  isPrimary.value = !isPrimary.value
  buttonColor.value = isPrimary.value ? '#42b983' : '#6c757d'
}
</script>

<style scoped>
.btn-primary {
  font-weight: bold;
}
.btn-secondary {
  opacity: 0.8;
}
</style>
\`\`\`

## Exercise 2: Progress Bar

Create a dynamic progress bar:
1. Use style binding for width
2. Change color based on progress
3. Update progress on button click

**Solution:**
\`\`\`vue
<template>
  <div>
    <div class="progress-container">
      <div 
        class="progress-bar"
        :style="{ 
          width: progress + '%',
          backgroundColor: progressColor
        }"
      >
        {{ progress }}%
      </div>
    </div>
    <button @click="increaseProgress">Increase</button>
    <button @click="decreaseProgress">Decrease</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const progress = ref(0)

const progressColor = computed(() => {
  if (progress.value < 30) return '#dc3545'
  if (progress.value < 70) return '#ffc107'
  return '#28a745'
})

function increaseProgress() {
  if (progress.value < 100) {
    progress.value += 10
  }
}

function decreaseProgress() {
  if (progress.value > 0) {
    progress.value -= 10
  }
}
</script>

<style scoped>
.progress-container {
  width: 100%;
  height: 30px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  transition: width 0.3s, background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}
</style>
\`\`\``,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Attribute binding :class, :style',
        slug: 'attribute-binding-class-style',
        content: `# Attribute Binding for Classes and Styles

Use \`:\` shorthand for \`v-bind:\` to bind classes and styles dynamically.

## Class Binding Shorthand

\`\`\`vue
<template>
  <div>
    <!-- Instead of v-bind:class -->
    <div :class="classObject">
      Content
    </div>
    
    <!-- Computed class object -->
    <div :class="computedClass">
      Computed classes
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isActive = ref(true)
const hasError = ref(false)

const classObject = ref({
  active: true,
  'text-danger': false
})

const computedClass = computed(() => ({
  active: isActive.value,
  'text-danger': hasError.value
}))
</script>
\`\`\`

## Style Binding Shorthand

\`\`\`vue
<template>
  <div>
    <div :style="styleObject">
      Styled content
    </div>
    
    <!-- Multiple style objects -->
    <div :style="[baseStyles, dynamicStyles]">
      Combined styles
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const styleObject = ref({
  color: 'red',
  fontSize: '20px'
})

const baseStyles = { padding: '10px', margin: '5px' }
const dynamicStyles = ref({ backgroundColor: 'lightblue' })
</script>
\`\`\`

## Exercise: Theme Switcher

Create a theme switcher component:
1. Toggle between light and dark themes
2. Use class binding for theme classes
3. Use style binding for theme colors
4. Update multiple elements

**Solution:**
\`\`\`vue
<template>
  <div :class="{ 'dark-theme': isDark }" :style="themeStyles">
    <h1>Theme Switcher</h1>
    <p>Current theme: {{ isDark ? 'Dark' : 'Light' }}</p>
    <button @click="toggleTheme">Toggle Theme</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isDark = ref(false)

const themeStyles = computed(() => ({
  backgroundColor: isDark.value ? '#1a1a1a' : '#ffffff',
  color: isDark.value ? '#ffffff' : '#000000',
  padding: '20px',
  minHeight: '100vh',
  transition: 'all 0.3s'
}))
</script>

<style scoped>
.dark-theme {
  background-color: #1a1a1a;
  color: #ffffff;
}
</style>
\`\`\``,
        isPractice: false,
        estimatedTime: 18
      },
    ]
  },
  {
    moduleTitle: 'Reactivity System',
    lessons: [
      {
        title: 'ref() and reactive()',
        slug: 'ref-and-reactive',
        content: `# ref() and reactive()

Vue's reactivity system is the core of how Vue tracks and updates the DOM when data changes.

## ref()

\`ref()\` creates a reactive reference for a single value. It's the most commonly used reactive primitive.

\`\`\`vue
<script setup>
import { ref } from 'vue'

// Primitive values
const count = ref(0)
const message = ref('Hello')
const isActive = ref(true)

// Access value with .value in script
console.log(count.value) // 0
count.value++ // Increment

// In template, Vue automatically unwraps ref
// {{ count }} works directly
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>
\`\`\`

## reactive()

\`reactive()\` creates a reactive object. All properties are automatically reactive.

\`\`\`vue
<script setup>
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello',
  user: {
    name: 'John',
    age: 25
  }
})

// No .value needed - direct property access
state.count++
state.user.name = 'Jane'
</script>

<template>
  <div>
    <p>{{ state.count }}</p>
    <p>{{ state.user.name }}</p>
  </div>
</template>
\`\`\`

## When to Use What?

- **ref()**: Use for primitives (string, number, boolean) or when you need a single reactive value
- **reactive()**: Use for objects when you want all properties reactive

## Important Notes

- Always use \`.value\` when accessing \`ref()\` in script
- \`reactive()\` doesn't require \`.value\`
- Both work seamlessly in templates

## Practice

Create a component with:
1. A counter using \`ref()\`
2. A user object using \`reactive()\`
3. Update both values and see the UI update automatically`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Vue Computed Properties',
        slug: 'vue-computed-properties',
        content: `# Vue Computed Properties

Computed properties are reactive values derived from other reactive data. They cache results and only recompute when dependencies change.

## Basic Computed Property

\`\`\`vue
<template>
  <div>
    <input v-model="firstName" placeholder="First name" />
    <input v-model="lastName" placeholder="Last name" />
    <p>Full Name: {{ fullName }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed(() => {
  return firstName.value + ' ' + lastName.value
})
</script>
\`\`\`

## Exercise: Shopping Cart Total

Create a shopping cart with computed total:
1. List of items with prices and quantities
2. Computed property for total price
3. Computed property for item count
4. Display formatted total

**Solution:**
\`\`\`vue
<template>
  <div>
    <div v-for="item in cart" :key="item.id">
      <span>{{ item.name }} - \${{ item.price }} x {{ item.quantity }}</span>
      <button @click="item.quantity++">+</button>
      <button @click="item.quantity--">-</button>
    </div>
    <p>Items: {{ itemCount }}</p>
    <p>Total: \${{ totalPrice.toFixed(2) }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const cart = ref([
  { id: 1, name: 'Apple', price: 1.50, quantity: 3 },
  { id: 2, name: 'Banana', price: 0.75, quantity: 5 },
  { id: 3, name: 'Orange', price: 2.00, quantity: 2 }
])

const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
})

const itemCount = computed(() => {
  return cart.value.reduce((count, item) => {
    return count + item.quantity
  }, 0)
})
</script>
\`\`\``,
        isPractice: false,
        estimatedTime: 25
      },
      {
        title: 'Computed properties',
        slug: 'computed-properties',
        content: `# Computed Properties Overview

Computed properties provide a clean way to derive reactive values from other reactive data.

## When to Use Computed

- **Derived data** that depends on other reactive data
- **Expensive calculations** that should be cached
- **Formatted data** for display

## Exercise: Price Calculator

Create a price calculator with multiple computed properties:
1. Base price input
2. Tax rate input
3. Discount input
4. Computed subtotal, tax amount, discount amount, and final total

**Solution:**
\`\`\`vue
<template>
  <div>
    <div>
      <label>Base Price:</label>
      <input v-model.number="basePrice" type="number" />
    </div>
    <div>
      <label>Tax Rate (%):</label>
      <input v-model.number="taxRate" type="number" />
    </div>
    <div>
      <label>Discount (%):</label>
      <input v-model.number="discount" type="number" />
    </div>
    <div>
      <p>Subtotal: \${{ subtotal.toFixed(2) }}</p>
      <p>Tax: \${{ taxAmount.toFixed(2) }}</p>
      <p>Discount: -\${{ discountAmount.toFixed(2) }}</p>
      <p><strong>Total: \${{ finalTotal.toFixed(2) }}</strong></p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const basePrice = ref(100)
const taxRate = ref(10)
const discount = ref(5)

const subtotal = computed(() => basePrice.value)

const taxAmount = computed(() => {
  return (subtotal.value * taxRate.value) / 100
})

const discountAmount = computed(() => {
  return (subtotal.value * discount.value) / 100
})

const finalTotal = computed(() => {
  return subtotal.value + taxAmount.value - discountAmount.value
})
</script>
\`\`\``,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Watchers (watch, watchEffect)',
        slug: 'watchers-watch-watcheffect',
        content: `# Watchers

Watchers allow you to perform side effects when reactive data changes.

## watch()

\`watch()\` watches a specific source and runs a callback when it changes.

\`\`\`vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)
const message = ref('')

// Watch a single ref
watch(count, (newValue, oldValue) => {
  console.log(\`Count changed from \${oldValue} to \${newValue}\`)
})

// Watch multiple sources
watch([count, message], ([newCount, newMessage], [oldCount, oldMessage]) => {
  console.log('Count or message changed')
})

// Watch with options
watch(count, (newValue) => {
  // Side effect here
}, {
  immediate: true, // Run immediately
  deep: true // Deep watch for objects
})
</script>
\`\`\`

## watchEffect()

\`watchEffect()\` automatically tracks dependencies and runs whenever they change.

\`\`\`vue
<script setup>
import { ref, watchEffect } from 'vue'

const count = ref(0)
const multiplier = ref(2)

// Automatically tracks count and multiplier
watchEffect(() => {
  console.log(\`Result: \${count.value * multiplier.value}\`)
})

// When count or multiplier changes, the effect runs
</script>
\`\`\`

## When to Use What?

- **watch()**: When you need to watch specific sources or need old/new values
- **watchEffect()**: When you want automatic dependency tracking

## Practice

Create a search component:
1. Watch search input
2. Debounce the search (wait 300ms after user stops typing)
3. Perform API call when search changes`,
        isPractice: false,
        estimatedTime: 18,
        children: ['onMounted', 'onUpdated', 'onUnmounted']
      },
      {
        title: 'Lifecycle hooks',
        slug: 'lifecycle-hooks',
        content: `# Lifecycle Hooks

Lifecycle hooks allow you to run code at specific stages of a component's lifecycle.

## Common Hooks

\`\`\`vue
<script setup>
import { onMounted, onUpdated, onUnmounted } from 'vue'

// Component is mounted to DOM
onMounted(() => {
  console.log('Component mounted')
  // Good for: API calls, setting up event listeners
})

// Component updated (re-rendered)
onUpdated(() => {
  console.log('Component updated')
  // Use sparingly - runs on every update
})

// Component is unmounted (removed from DOM)
onUnmounted(() => {
  console.log('Component unmounted')
  // Good for: cleanup, removing event listeners
})
</script>
\`\`\`

## Complete Lifecycle

1. **setup()** - Component setup (Composition API)
2. **onBeforeMount** - Before component is mounted
3. **onMounted** - Component is mounted
4. **onBeforeUpdate** - Before component updates
5. **onUpdated** - Component updated
6. **onBeforeUnmount** - Before component unmounts
7. **onUnmounted** - Component unmounted

## Example: Fetching Data

\`\`\`vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const data = ref(null)
let intervalId = null

onMounted(async () => {
  // Fetch initial data
  const response = await fetch('/api/data')
  data.value = await response.json()
  
  // Set up polling
  intervalId = setInterval(async () => {
    const response = await fetch('/api/data')
    data.value = await response.json()
  }, 5000)
})

onUnmounted(() => {
  // Cleanup
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
\`\`\`

## Practice

Create a component that:
1. Fetches data on mount
2. Sets up a timer that updates every second
3. Cleans up the timer on unmount`,
        isPractice: false,
        estimatedTime: 15,
        children: ['onMounted', 'onUpdated', 'onUnmounted']
      }
    ]
  },
  {
    moduleTitle: 'Vue Basics',
    lessons: [
      {
        title: 'What is Vue & how it works',
        slug: 'what-is-vue-how-it-works',
        content: `# What is Vue.js?

Vue.js is a progressive JavaScript framework for building user interfaces.

## Why Vue?

- **Progressive**: Can be adopted incrementally
- **Reactive**: Automatic UI updates when data changes
- **Component-based**: Build reusable UI components
- **Developer-friendly**: Easy to learn, great documentation

## How Vue Works

Vue uses a **reactive data system**:

1. You define your data
2. Vue tracks changes to that data
3. When data changes, Vue automatically updates the DOM

\`\`\`vue
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="updateMessage">Update</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue!')

function updateMessage() {
  message.value = 'Updated!'
}
</script>
\`\`\`

## Core Concepts

- **Template**: HTML with Vue directives
- **Reactive State**: Data that triggers updates
- **Components**: Reusable UI pieces
- **Directives**: Special attributes (v-if, v-for, etc.)

## Next Steps

Now that you understand what Vue is, let's create your first Vue app!`,
        isPractice: false,
        estimatedTime: 10
      },
      {
        title: 'Creating a Vue app',
        slug: 'creating-a-vue-app',
        content: `# Creating a Vue App

There are two main ways to create a Vue application.

## Method 1: CDN (Quick Start)

Include Vue via CDN for quick prototyping:

\`\`\`html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">
  {{ message }}
</div>

<script>
  const { createApp } = Vue
  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
\`\`\`

## Method 2: Vite (Recommended)

Use Vite for modern development:

\`\`\`bash
npm create vue@latest my-vue-app
cd my-vue-app
npm install
npm run dev
\`\`\`

This creates a project with:
-  Hot Module Replacement (HMR)
-  Modern build tools
-  TypeScript support (optional)
-  Router & Pinia (optional)

## Project Structure

\`\`\`
my-vue-app/
├── src/
│   ├── components/     # Reusable components
│   ├── views/          # Page components
│   ├── router/         # Routing config
│   ├── stores/         # State management
│   ├── App.vue         # Root component
│   └── main.js         # Entry point
├── public/             # Static assets
└── package.json        # Dependencies
\`\`\`

## Practice

Create a new Vue app using Vite and:
1. Change the default message
2. Add a button that increments a counter
3. Display the counter value`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Vue project structure',
        slug: 'vue-project-structure',
        content: `# Vue Project Structure

Understanding the organization of a Vue project helps you navigate and maintain code effectively.

## Key Files & Folders

### \`src/main.js\`
Entry point of your application:

\`\`\`javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .mount('#app')
\`\`\`

### \`src/App.vue\`
Root component that wraps your entire app:

\`\`\`vue
<template>
  <div id="app">
    <router-view />
  </div>
</template>
\`\`\`

### \`src/components/\`
Reusable Vue components:
- \`Button.vue\`
- \`Card.vue\`
- \`Navigation.vue\`

### \`src/views/\`
Page-level components (used with router):
- \`HomeView.vue\`
- \`AboutView.vue\`

### \`src/router/\`
Vue Router configuration:
- \`index.js\` - Route definitions

### \`src/stores/\`
Pinia stores for state management:
- \`auth.js\`
- \`user.js\`

### \`public/\`
Static assets served as-is:
- \`favicon.ico\`
- \`images/\`

## Best Practices

1. **Components**: Keep components small and focused
2. **Naming**: Use PascalCase for components (\`UserCard.vue\`)
3. **Organization**: Group related components in folders
4. **Composables**: Extract reusable logic to \`composables/\`

## Practice

Organize a sample project:
1. Create a \`components\` folder with a \`Button.vue\` component
2. Create a \`views\` folder with a \`HomeView.vue\`
3. Import and use them in \`App.vue\``,
        isPractice: false,
        estimatedTime: 10
      },
      {
        title: 'Single File Components (SFC)',
        slug: 'single-file-components-sfc',
        content: `# Single File Components (SFC)

Vue's Single File Components combine template, script, and styles in one file.

## SFC Structure

\`\`\`vue
<template>
  <!-- HTML template -->
  <div class="card">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
// JavaScript logic
import { ref } from 'vue'

const title = ref('My Card')
const description = ref('Card description')
</script>

<style scoped>
/* CSS styles */
.card {
  padding: 20px;
  border: 1px solid #ccc;
}
</style>
\`\`\`

## Template Section

Contains your HTML markup with Vue directives:

\`\`\`vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="handleClick">Click me</button>
    <div v-if="showContent">Content here</div>
  </div>
</template>
\`\`\`

## Script Setup

Modern Vue 3 syntax using \`<script setup>\`:

\`\`\`vue
<script setup>
import { ref, computed } from 'vue'

// Reactive state
const count = ref(0)

// Computed properties
const doubleCount = computed(() => count.value * 2)

// Functions
function increment() {
  count.value++
}
</script>
\`\`\`

## Style Section

\`\`\`vue
<style scoped>
/* Scoped styles - only apply to this component */
.card { }
</style>

<style>
/* Global styles */
body { }
</style>
\`\`\`

**Scoped styles** prevent CSS from leaking to other components.

## Benefits

-  Everything in one place
-  Better IDE support
-  Scoped CSS by default
-  Easy to share and reuse

## Practice

Create a \`UserCard.vue\` component with:
1. Template showing user name and email
2. Script with reactive user data
3. Scoped styles for the card`,
        isPractice: false,
        estimatedTime: 15,
        children: ['<template>', '<script setup>', '<style>']
      }
    ]
  },
  {
    moduleTitle: 'Components',
    lessons: [
      {
        title: 'Creating components',
        slug: 'creating-components',
        content: `# Creating Components

Components are reusable Vue instances with a name. They help you organize your code into smaller, manageable pieces.

## Basic Component

\`\`\`vue
<!-- MyComponent.vue -->
<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('My Component')
const description = ref('This is a reusable component')
</script>
\`\`\`

## Using Components

\`\`\`vue
<template>
  <div>
    <MyComponent />
    <MyComponent />
  </div>
</template>

<script setup>
import MyComponent from './MyComponent.vue'
</script>
\`\`\`

## Component Registration

### Global Registration

\`\`\`javascript
import { createApp } from 'vue'
import MyComponent from './MyComponent.vue'

const app = createApp({})
app.component('MyComponent', MyComponent)
app.mount('#app')
\`\`\`

### Local Registration (Recommended)

\`\`\`vue
<script setup>
import MyComponent from './MyComponent.vue'
// Use directly in template
</script>
\`\`\`

## Component Naming

- Use PascalCase: \`UserCard.vue\`, \`ProductList.vue\`
- File name should match component name

## Practice Exercise

Create a \`Button.vue\` component:
1. Accept \`text\` and \`variant\` props
2. Emit a \`click\` event
3. Style based on variant (primary, secondary)`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Props',
        slug: 'props',
        content: `# Props

Props are custom attributes you can register on a component. They allow parent components to pass data to child components.

## Declaring Props

\`\`\`vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Age: {{ age }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  age: Number
})
</script>
\`\`\`

## Using Props

\`\`\`vue
<!-- ParentComponent.vue -->
<template>
  <ChildComponent title="John Doe" :age="25" />
</template>

<script setup>
import ChildComponent from './ChildComponent.vue'
</script>
\`\`\`

## Props with Default Values

\`\`\`vue
<script setup>
defineProps({
  title: {
    type: String,
    default: 'Default Title'
  },
  age: {
    type: Number,
    default: 0
  }
})
</script>
\`\`\`

## Required Props

\`\`\`vue
<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
\`\`\`

## Practice Exercise

Create a \`UserCard\` component:
1. Accept \`name\`, \`email\`, and \`avatar\` props
2. Display user information
3. Make \`name\` required, \`avatar\` optional`,
        isPractice: false,
        estimatedTime: 18
      },
      {
        title: 'Emits',
        slug: 'emits',
        content: `# Emits

Emits allow child components to communicate with parent components by sending events.

## Basic Emit

\`\`\`vue
<!-- ChildComponent.vue -->
<template>
  <button @click="handleClick">Click me</button>
</template>

<script setup>
const emit = defineEmits(['click'])

function handleClick() {
  emit('click', 'Button clicked!')
}
</script>
\`\`\`

## Listening to Emits

\`\`\`vue
<!-- ParentComponent.vue -->
<template>
  <ChildComponent @click="handleChildClick" />
</template>

<script setup>
function handleChildClick(message) {
  console.log(message) // "Button clicked!"
}
</script>
\`\`\`

## Multiple Emits

\`\`\`vue
<script setup>
const emit = defineEmits(['update', 'delete', 'cancel'])

function handleUpdate() {
  emit('update', data)
}

function handleDelete() {
  emit('delete', id)
}
</script>
\`\`\`

## Emit Validation

\`\`\`vue
<script setup>
const emit = defineEmits({
  click: (value) => {
    if (typeof value === 'string') {
      return true
    }
    console.warn('Invalid emit value')
    return false
  }
})
</script>
\`\`\`

## Practice Exercise

Create a \`Counter\` component:
1. Display a count
2. Emit \`increment\` and \`decrement\` events
3. Parent handles the actual state`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Slots',
        slug: 'slots',
        content: `# Slots

Slots allow you to compose components by passing template fragments to child components.

## Basic Slot

\`\`\`vue
<!-- BaseLayout.vue -->
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
\`\`\`

## Using Slots

\`\`\`vue
<template>
  <BaseLayout>
    <template #header>
      <h1>Page Title</h1>
    </template>
    
    <p>Main content here</p>
    
    <template #footer>
      <p>Footer content</p>
    </template>
  </BaseLayout>
</template>
\`\`\`

## Default Slot Content

\`\`\`vue
<template>
  <button>
    <slot>Default Button Text</slot>
  </button>
</template>
\`\`\`

## Scoped Slots

\`\`\`vue
<!-- ChildComponent.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item"></slot>
    </li>
  </ul>
</template>
\`\`\`

\`\`\`vue
<!-- ParentComponent.vue -->
<template>
  <ChildComponent>
    <template #default="{ item }">
      <span>{{ item.name }}</span>
    </template>
  </ChildComponent>
</template>
\`\`\`

## Practice Exercise

Create a \`Card\` component with slots:
1. Header slot
2. Default content slot
3. Footer slot with default text`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Dynamic components',
        slug: 'dynamic-components',
        content: `# Dynamic Components

You can dynamically switch between components using the \`<component>\` element with the \`is\` attribute.

## Basic Dynamic Component

\`\`\`vue
<template>
  <component :is="currentComponent" />
</template>

<script setup>
import { ref } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const currentComponent = ref('ComponentA')
</script>
\`\`\`

## Switching Components

\`\`\`vue
<template>
  <div>
    <button @click="currentComponent = 'ComponentA'">Show A</button>
    <button @click="currentComponent = 'ComponentB'">Show B</button>
    <component :is="currentComponent" />
  </div>
</template>
\`\`\`

## Keep-Alive

Preserve component state when switching:

\`\`\`vue
<template>
  <KeepAlive>
    <component :is="currentComponent" />
  </KeepAlive>
</template>
\`\`\`

## Practice Exercise

Create a tab component:
1. Multiple tabs
2. Switch content dynamically
3. Preserve state with KeepAlive`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Component registration',
        slug: 'component-registration',
        content: `# Component Registration

Components can be registered globally or locally. Local registration is preferred for better performance.

## Global Registration

\`\`\`javascript
import { createApp } from 'vue'
import MyComponent from './MyComponent.vue'

const app = createApp({})
app.component('MyComponent', MyComponent)
app.mount('#app')
\`\`\`

## Local Registration

\`\`\`vue
<script setup>
import MyComponent from './MyComponent.vue'
// Automatically available in template
</script>

<template>
  <MyComponent />
</template>
\`\`\`

## Auto-Import Pattern

\`\`\`vue
<script setup>
// Components are auto-imported
// No need to manually import
</script>

<template>
  <MyComponent />
</template>
\`\`\`

## Practice Exercise

Set up component auto-import:
1. Configure your build tool
2. Create multiple components
3. Use them without imports`,
        isPractice: false,
        estimatedTime: 12
      }
    ]
  },
  {
    moduleTitle: 'Forms & User Input',
    lessons: [
      {
        title: 'Handling forms',
        slug: 'handling-forms',
        content: `# Handling Forms

Forms are essential for collecting user input. Vue makes form handling easy with \`v-model\`.

## Basic Form

\`\`\`vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.name" placeholder="Name" />
    <input v-model="form.email" type="email" placeholder="Email" />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: ''
})

function handleSubmit() {
  console.log('Form submitted:', form)
}
</script>
\`\`\`

## Form Validation

\`\`\`vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.email" type="email" />
    <span v-if="errors.email">{{ errors.email }}</span>
    
    <button type="submit" :disabled="!isValid">Submit</button>
  </form>
</template>

<script setup>
import { reactive, computed } from 'vue'

const form = reactive({ email: '' })
const errors = reactive({ email: '' })

const isValid = computed(() => {
  return form.email.includes('@') && !errors.email
})

function handleSubmit() {
  if (isValid.value) {
    // Submit form
  }
}
</script>
\`\`\`

## Practice Exercise

Create a registration form:
1. Name, email, password fields
2. Validation for each field
3. Submit handler`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Input validation',
        slug: 'input-validation',
        content: `# Input Validation

Validate user input to ensure data quality and improve user experience.

## Real-time Validation

\`\`\`vue
<template>
  <div>
    <input 
      v-model="email" 
      @blur="validateEmail"
      type="email"
    />
    <span v-if="emailError" class="error">{{ emailError }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const emailError = ref('')

function validateEmail() {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
  if (!email.value) {
    emailError.value = 'Email is required'
  } else if (!emailRegex.test(email.value)) {
    emailError.value = 'Invalid email format'
  } else {
    emailError.value = ''
  }
}
</script>
\`\`\`

## Custom Validators

\`\`\`vue
<script setup>
function validatePassword(password) {
  const errors = []
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain uppercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain a number')
  }
  return errors
}
</script>
\`\`\`

## Practice Exercise

Create a form with:
1. Email validation
2. Password strength checker
3. Display validation errors`,
        isPractice: false,
        estimatedTime: 25
      },
      {
        title: 'Custom input components',
        slug: 'custom-input-components',
        content: `# Custom Input Components

Create reusable input components with consistent styling and behavior.

## Basic Custom Input

\`\`\`vue
<!-- CustomInput.vue -->
<template>
  <div>
    <label>{{ label }}</label>
    <input 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
    />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: String,
  type: { type: String, default: 'text' }
})

defineEmits(['update:modelValue'])
</script>
\`\`\`

## Using Custom Input

\`\`\`vue
<template>
  <CustomInput 
    v-model="name" 
    label="Name" 
    type="text"
  />
</template>
\`\`\`

## Practice Exercise

Create a \`TextInput\` component:
1. Label, placeholder props
2. Error message display
3. v-model support`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'v-model with components',
        slug: 'v-model-with-components',
        content: `# v-model with Components

Use \`v-model\` with custom components for two-way binding.

## Implementing v-model

\`\`\`vue
<!-- CustomInput.vue -->
<template>
  <input 
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>
\`\`\`

## Multiple v-models

\`\`\`vue
<!-- FormComponent.vue -->
<template>
  <input 
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input 
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>

<script setup>
defineProps(['firstName', 'lastName'])
defineEmits(['update:firstName', 'update:lastName'])
</script>
\`\`\`

## Practice Exercise

Create a form component:
1. Multiple fields with v-model
2. Parent component manages state
3. Submit all data together`,
        isPractice: false,
        estimatedTime: 18
      }
    ]
  },
  {
    moduleTitle: 'Vue Router',
    lessons: [
      {
        title: 'Routing basics',
        slug: 'routing-basics',
        content: `# Vue Router Basics

Vue Router is the official router for Vue.js applications. It enables client-side routing.

## Installation

\`\`\`bash
npm install vue-router@4
\`\`\`

## Basic Setup

\`\`\`javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
\`\`\`

## Using Router

\`\`\`vue
<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view />
  </div>
</template>
\`\`\`

## Programmatic Navigation

\`\`\`vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToAbout() {
  router.push('/about')
}
</script>
\`\`\`

## Practice Exercise

Set up Vue Router:
1. Create 3 routes (Home, About, Contact)
2. Add navigation links
3. Navigate programmatically`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Route params & query',
        slug: 'route-params-query',
        content: `# Route Params & Query

Pass data through routes using params and query strings.

## Route Params

\`\`\`javascript
// router/index.js
{
  path: '/user/:id',
  component: UserProfile
}
\`\`\`

\`\`\`vue
<template>
  <div>User ID: {{ $route.params.id }}</div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.params.id)
</script>
\`\`\`

## Query Parameters

\`\`\`vue
<template>
  <router-link :to="{ path: '/search', query: { q: 'vue' } }">
    Search
  </router-link>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.query.q) // 'vue'
</script>
\`\`\`

## Practice Exercise

Create a blog route:
1. Dynamic route for posts: /post/:id
2. Query params for filtering: /posts?category=vue
3. Display params and query in component`,
        isPractice: false,
        estimatedTime: 18
      },
      {
        title: 'Nested routes',
        slug: 'nested-routes',
        content: `# Nested Routes

Create nested route structures for complex layouts.

## Nested Route Setup

\`\`\`javascript
{
  path: '/user/:id',
  component: UserLayout,
  children: [
    { path: 'profile', component: UserProfile },
    { path: 'posts', component: UserPosts }
  ]
}
\`\`\`

\`\`\`vue
<!-- UserLayout.vue -->
<template>
  <div>
    <h1>User {{ $route.params.id }}</h1>
    <router-link to="profile">Profile</router-link>
    <router-link to="posts">Posts</router-link>
    <router-view />
  </div>
</template>
\`\`\`

## Practice Exercise

Create a dashboard with nested routes:
1. Main dashboard layout
2. Nested routes for settings, analytics
3. Active route highlighting`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Navigation guards',
        slug: 'navigation-guards',
        content: `# Navigation Guards

Navigation guards allow you to control route access and perform actions before/after navigation.

## Global Before Guard

\`\`\`javascript
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
\`\`\`

## Route Guard

\`\`\`javascript
{
  path: '/admin',
  component: Admin,
  beforeEnter: (to, from, next) => {
    if (isAdmin) {
      next()
    } else {
      next('/')
    }
  }
}
\`\`\`

## Component Guards

\`\`\`vue
<script setup>
import { onBeforeRouteLeave } from 'vue-router'

onBeforeRouteLeave((to, from) => {
  if (hasUnsavedChanges) {
    return confirm('Leave without saving?')
  }
})
</script>
\`\`\`

## Practice Exercise

Add authentication guards:
1. Protect routes requiring auth
2. Redirect to login if not authenticated
3. Prevent navigation with unsaved changes`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Lazy loading routes',
        slug: 'lazy-loading-routes',
        content: `# Lazy Loading Routes

Load route components on-demand to improve initial load time.

## Basic Lazy Loading

\`\`\`javascript
const routes = [
  {
    path: '/about',
    component: () => import('../views/About.vue')
  }
]
\`\`\`

## Named Chunks

\`\`\`javascript
{
  path: '/admin',
  component: () => import(
    /* webpackChunkName: "admin" */ 
    '../views/Admin.vue'
  )
}
\`\`\`

## Practice Exercise

Convert routes to lazy loading:
1. Use dynamic imports
2. Test code splitting
3. Verify chunks in build output`,
        isPractice: false,
        estimatedTime: 15
      }
    ]
  },
  {
    moduleTitle: 'State Management',
    lessons: [
      {
        title: 'Pinia basics',
        slug: 'pinia-basics',
        content: `# Pinia Basics

Pinia is Vue's official state management library, replacing Vuex.

## Installation

\`\`\`bash
npm install pinia
\`\`\`

## Setup

\`\`\`javascript
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
\`\`\`

## Creating a Store

\`\`\`javascript
// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: ''
  }),
  getters: {
    fullName: (state) => state.name
  },
  actions: {
    setName(name) {
      this.name = name
    }
  }
})
\`\`\`

## Using Store

\`\`\`vue
<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
userStore.setName('John')
</script>

<template>
  <div>{{ userStore.name }}</div>
</template>
\`\`\`

## Practice Exercise

Create a counter store:
1. State with count
2. Actions to increment/decrement
3. Use in component`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Store state',
        slug: 'store-state',
        content: `# Store State

State holds the reactive data in your Pinia store.

## Defining State

\`\`\`javascript
export const useStore = defineStore('store', {
  state: () => ({
    count: 0,
    items: [],
    user: null
  })
})
\`\`\`

## Accessing State

\`\`\`vue
<script setup>
import { useStore } from '@/stores/store'

const store = useStore()
console.log(store.count)
</script>

<template>
  <div>{{ store.count }}</div>
</template>
\`\`\`

## Resetting State

\`\`\`javascript
const store = useStore()
store.$reset() // Resets to initial state
\`\`\`

## Practice Exercise

Create a todo store:
1. State with todos array
2. Add/remove todos
3. Reset functionality`,
        isPractice: false,
        estimatedTime: 18
      },
      {
        title: 'Getters',
        slug: 'getters',
        content: `# Getters

Getters are computed values derived from state.

## Basic Getter

\`\`\`javascript
export const useStore = defineStore('store', {
  state: () => ({
    items: [1, 2, 3, 4, 5]
  }),
  getters: {
    doubleItems: (state) => state.items.map(x => x * 2),
    itemCount: (state) => state.items.length
  }
})
\`\`\`

## Using Getters

\`\`\`vue
<template>
  <div>
    <p>Count: {{ store.itemCount }}</p>
    <p>Doubled: {{ store.doubleItems }}</p>
  </div>
</template>
\`\`\`

## Getters with Parameters

\`\`\`javascript
getters: {
  getItemById: (state) => {
    return (id) => state.items.find(item => item.id === id)
  }
}
\`\`\`

## Practice Exercise

Create getters for:
1. Filtered items
2. Total price
3. Item by ID`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Actions',
        slug: 'actions',
        content: `# Actions

Actions are methods that can mutate state and perform async operations.

## Basic Action

\`\`\`javascript
export const useStore = defineStore('store', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
})
\`\`\`

## Async Actions

\`\`\`javascript
actions: {
  async fetchUser(id) {
    const response = await fetch(\`/api/users/\${id}\`)
    this.user = await response.json()
  }
}
\`\`\`

## Practice Exercise

Create actions for:
1. Fetching data from API
2. Updating state
3. Error handling`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Store modules',
        slug: 'store-modules',
        content: `# Store Modules

Organize stores into modules for better code organization.

## Multiple Stores

\`\`\`javascript
// stores/user.js
export const useUserStore = defineStore('user', { ... })

// stores/cart.js
export const useCartStore = defineStore('cart', { ... })
\`\`\`

## Using Multiple Stores

\`\`\`vue
<script setup>
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'

const userStore = useUserStore()
const cartStore = useCartStore()
</script>
\`\`\`

## Practice Exercise

Create multiple stores:
1. User store
2. Product store
3. Cart store
4. Use them together`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Persisting state',
        slug: 'persisting-state',
        content: `# Persisting State

Persist store state to localStorage or other storage.

## Using Plugin

\`\`\`bash
npm install pinia-plugin-persistedstate
\`\`\`

\`\`\`javascript
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
\`\`\`

## Persist Store

\`\`\`javascript
export const useStore = defineStore('store', {
  state: () => ({ count: 0 }),
  persist: true
})
\`\`\`

## Practice Exercise

Add persistence to:
1. User preferences
2. Shopping cart
3. Theme settings`,
        isPractice: false,
        estimatedTime: 15
      }
    ]
  },
  {
    moduleTitle: 'API Integration',
    lessons: [
      {
        title: 'Fetch / Axios',
        slug: 'fetch-axios',
        content: `# Fetch & Axios

Make HTTP requests to APIs using Fetch API or Axios.

## Using Fetch

\`\`\`vue
<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)

onMounted(async () => {
  const response = await fetch('https://api.example.com/data')
  data.value = await response.json()
})
</script>
\`\`\`

## Using Axios

\`\`\`bash
npm install axios
\`\`\`

\`\`\`vue
<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const data = ref(null)

onMounted(async () => {
  const response = await axios.get('https://api.example.com/data')
  data.value = response.data
})
</script>
\`\`\`

## POST Request

\`\`\`javascript
async function createUser(userData) {
  const response = await axios.post('/api/users', userData)
  return response.data
}
\`\`\`

## Practice Exercise

Create an API service:
1. Fetch users from API
2. Create new user
3. Handle errors`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Async data handling',
        slug: 'async-data-handling',
        content: `# Async Data Handling

Handle asynchronous operations properly in Vue components.

## Loading States

\`\`\`vue
<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetch('/api/data')
    data.value = await response.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else>{{ data }}</div>
</template>
\`\`\`

## Practice Exercise

Create a data fetcher:
1. Loading state
2. Error handling
3. Success state`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Loading & error states',
        slug: 'loading-error-states',
        content: `# Loading & Error States

Provide good UX with proper loading and error handling.

## Loading Component

\`\`\`vue
<template>
  <div v-if="loading" class="spinner">
    Loading...
  </div>
</template>
\`\`\`

## Error Component

\`\`\`vue
<template>
  <div v-if="error" class="error">
    <p>{{ error.message }}</p>
    <button @click="retry">Retry</button>
  </div>
</template>
\`\`\`

## Practice Exercise

Create reusable components:
1. LoadingSpinner component
2. ErrorMessage component
3. Use in data fetching`,
        isPractice: false,
        estimatedTime: 18
      },
      {
        title: 'Environment variables',
        slug: 'environment-variables',
        content: `# Environment Variables

Store configuration and secrets in environment variables.

## .env File

\`\`\`
VITE_API_URL=https://api.example.com
VITE_API_KEY=your-api-key
\`\`\`

## Using in Code

\`\`\`javascript
const apiUrl = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY
\`\`\`

## Different Environments

\`\`\`
.env.development
.env.production
.env.local
\`\`\`

## Practice Exercise

Set up environment variables:
1. Create .env files
2. Use in API calls
3. Different configs for dev/prod`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Authentication basics',
        slug: 'authentication-basics',
        content: `# Authentication Basics

Implement user authentication in Vue applications.

## Login Function

\`\`\`vue
<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const token = ref(null)

async function login() {
  try {
    const response = await axios.post('/api/login', {
      email: email.value,
      password: password.value
    })
    token.value = response.data.token
    localStorage.setItem('token', token.value)
  } catch (error) {
    console.error('Login failed', error)
  }
}
</script>
\`\`\`

## Protected Routes

\`\`\`javascript
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})
\`\`\`

## Practice Exercise

Implement authentication:
1. Login form
2. Store token
3. Protect routes`,
        isPractice: false,
        estimatedTime: 25
      }
    ]
  },
  {
    moduleTitle: 'Composables',
    lessons: [
      {
        title: 'Creating composables',
        slug: 'creating-composables',
        content: `# Creating Composables

Composables are reusable composition functions that encapsulate logic.

## Basic Composable

\`\`\`javascript
// composables/useCounter.js
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  return { count, increment, decrement }
}
\`\`\`

## Using Composable

\`\`\`vue
<script setup>
import { useCounter } from '@/composables/useCounter'

const { count, increment, decrement } = useCounter(10)
</script>

<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>
\`\`\`

## Practice Exercise

Create a useToggle composable:
1. Boolean state
2. Toggle function
3. Use in component`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Reusing logic',
        slug: 'reusing-logic',
        content: `# Reusing Logic

Extract common logic into composables for reuse across components.

## useFetch Composable

\`\`\`javascript
// composables/useFetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  async function fetchData() {
    loading.value = true
    try {
      const response = await fetch(url)
      data.value = await response.json()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }
  
  fetchData()
  
  return { data, loading, error }
}
\`\`\`

## Practice Exercise

Create reusable composables:
1. useFetch for API calls
2. useLocalStorage for persistence
3. useWindowSize for responsive logic`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Separation of concerns',
        slug: 'separation-of-concerns',
        content: `# Separation of Concerns

Organize code by separating business logic from presentation.

## Component Structure

\`\`\`vue
<template>
  <!-- Presentation -->
</template>

<script setup>
// Business logic via composables
import { useUserData } from '@/composables/useUserData'
const { user, loading } = useUserData()
</script>
\`\`\`

## Practice Exercise

Refactor a component:
1. Extract logic to composable
2. Keep template clean
3. Test reusability`,
        isPractice: false,
        estimatedTime: 18
      },
      {
        title: 'Best practices',
        slug: 'best-practices',
        content: `# Composable Best Practices

Follow best practices when creating composables.

## Naming Convention

- Start with "use": \`useCounter\`, \`useFetch\`
- Descriptive names
- One responsibility per composable

## Return Values

\`\`\`javascript
export function useComposable() {
  // Return object for destructuring
  return {
    state,
    methods,
    computed
  }
}
\`\`\`

## Practice Exercise

Review and refactor:
1. Check naming
2. Ensure single responsibility
3. Document usage`,
        isPractice: false,
        estimatedTime: 15
      }
    ]
  },
  {
    moduleTitle: 'Styling & UI',
    lessons: [
      {
        title: 'Scoped styles',
        slug: 'scoped-styles',
        content: `# Scoped Styles

Scoped styles ensure CSS only applies to the current component.

## Basic Scoped Styles

\`\`\`vue
<template>
  <div class="card">Content</div>
</template>

<style scoped>
.card {
  padding: 20px;
  background: white;
}
</style>
\`\`\`

## How Scoping Works

Vue adds a unique attribute to elements and CSS selectors:

\`\`\`vue
<!-- Rendered HTML -->
<div class="card" data-v-7ba5bd90>Content</div>

<!-- Scoped CSS -->
.card[data-v-7ba5bd90] { padding: 20px; }
\`\`\`

## Practice Exercise

Create components with scoped styles:
1. Multiple components
2. Same class names
3. Verify no style conflicts`,
        isPractice: false,
        estimatedTime: 12
      },
      {
        title: 'CSS Modules',
        slug: 'css-modules',
        content: `# CSS Modules

CSS Modules provide locally scoped CSS with explicit imports.

## Using CSS Modules

\`\`\`vue
<template>
  <div :class="$style.card">Content</div>
</template>

<style module>
.card {
  padding: 20px;
}
</style>
\`\`\`

## Practice Exercise

Convert to CSS Modules:
1. Use module syntax
2. Access classes via $style
3. Compare with scoped styles`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'CSS preprocessors (SCSS)',
        slug: 'css-preprocessors-scss',
        content: `# CSS Preprocessors (SCSS)

Use SCSS for advanced CSS features like variables and nesting.

## Installation

\`\`\`bash
npm install -D sass
\`\`\`

## Using SCSS

\`\`\`vue
<style lang="scss" scoped>
$primary-color: #42b983;
$spacing: 20px;

.card {
  padding: $spacing;
  background: $primary-color;
  
  &:hover {
    transform: scale(1.05);
  }
}
</style>
\`\`\`

## Practice Exercise

Convert CSS to SCSS:
1. Use variables
2. Nest selectors
3. Use mixins`,
        isPractice: false,
        estimatedTime: 18
      },
      {
        title: 'UI frameworks (Vuetify, Element Plus, Naive UI)',
        slug: 'ui-frameworks',
        content: `# UI Frameworks

Use component libraries to speed up development.

## Vuetify

\`\`\`bash
npm install vuetify
\`\`\`

\`\`\`vue
<template>
  <v-btn color="primary">Click me</v-btn>
</template>
\`\`\`

## Element Plus

\`\`\`bash
npm install element-plus
\`\`\`

\`\`\`vue
<template>
  <el-button type="primary">Click me</el-button>
</template>
\`\`\`

## Practice Exercise

Choose a UI framework:
1. Install and configure
2. Use components
3. Customize theme`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Responsive design',
        slug: 'responsive-design',
        content: `# Responsive Design

Create layouts that work on all screen sizes.

## Media Queries

\`\`\`vue
<style scoped>
.card {
  width: 100%;
}

@media (min-width: 768px) {
  .card {
    width: 50%;
  }
}

@media (min-width: 1024px) {
  .card {
    width: 33.333%;
  }
}
</style>
\`\`\`

## Tailwind Responsive

\`\`\`vue
<template>
  <div class="w-full md:w-1/2 lg:w-1/3">
    Content
  </div>
</template>
\`\`\`

## Practice Exercise

Make a responsive layout:
1. Mobile-first approach
2. Breakpoints for tablet/desktop
3. Test on different sizes`,
        isPractice: false,
        estimatedTime: 20
      }
    ]
  },
  {
    moduleTitle: 'Testing',
    lessons: [
      {
        title: 'Unit testing with Vitest',
        slug: 'unit-testing-vitest',
        content: `# Unit Testing with Vitest

Vitest is a fast unit test framework for Vue.

## Installation

\`\`\`bash
npm install -D vitest @vue/test-utils
\`\`\`

## Writing Tests

\`\`\`javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

describe('Counter', () => {
  it('increments count on click', () => {
    const wrapper = mount(Counter)
    wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('1')
  })
})
\`\`\`

## Practice Exercise

Write unit tests:
1. Test component rendering
2. Test user interactions
3. Test computed properties`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Component testing',
        slug: 'component-testing',
        content: `# Component Testing

Test Vue components in isolation.

## Testing Props

\`\`\`javascript
it('displays prop value', () => {
  const wrapper = mount(Component, {
    props: { title: 'Test' }
  })
  expect(wrapper.text()).toContain('Test')
})
\`\`\`

## Testing Events

\`\`\`javascript
it('emits event on click', () => {
  const wrapper = mount(Component)
  wrapper.find('button').trigger('click')
  expect(wrapper.emitted('click')).toBeTruthy()
})
\`\`\`

## Practice Exercise

Test components:
1. Props
2. Events
3. Slots`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Mocking APIs',
        slug: 'mocking-apis',
        content: `# Mocking APIs

Mock API calls in tests for reliable testing.

## Mocking Fetch

\`\`\`javascript
import { vi } from 'vitest'

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'test' })
  })
)
\`\`\`

## Practice Exercise

Mock API calls:
1. Mock fetch/axios
2. Test loading states
3. Test error handling`,
        isPractice: false,
        estimatedTime: 18
      },
      {
        title: 'Basic E2E testing (Cypress / Playwright)',
        slug: 'e2e-testing-cypress-playwright',
        content: `# E2E Testing

Test your application end-to-end.

## Cypress

\`\`\`bash
npm install -D cypress
\`\`\`

\`\`\`javascript
describe('Login', () => {
  it('logs in successfully', () => {
    cy.visit('/login')
    cy.get('[data-cy=email]').type('user@example.com')
    cy.get('[data-cy=password]').type('password')
    cy.get('[data-cy=submit]').click()
    cy.url().should('include', '/dashboard')
  })
})
\`\`\`

## Practice Exercise

Write E2E tests:
1. Install Cypress or Playwright
2. Test user flows
3. Run tests`,
        isPractice: false,
        estimatedTime: 25
      }
    ]
  },
  {
    moduleTitle: 'Performance & Optimization',
    lessons: [
      {
        title: 'Code splitting',
        slug: 'code-splitting',
        content: `# Code Splitting

Split your code into smaller chunks for faster loading.

## Route-based Splitting

\`\`\`javascript
const routes = [
  {
    path: '/about',
    component: () => import('./views/About.vue')
  }
]
\`\`\`

## Component Lazy Loading

\`\`\`vue
<script setup>
import { defineAsyncComponent } from 'vue'

const HeavyComponent = defineAsyncComponent(() => 
  import('./HeavyComponent.vue')
)
</script>
\`\`\`

## Practice Exercise

Implement code splitting:
1. Lazy load routes
2. Lazy load heavy components
3. Check bundle size`,
        isPractice: false,
        estimatedTime: 18
      },
      {
        title: 'Lazy loading components',
        slug: 'lazy-loading-components',
        content: `# Lazy Loading Components

Load components only when needed.

## defineAsyncComponent

\`\`\`vue
<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent({
  loader: () => import('./Component.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
})
</script>
\`\`\`

## Practice Exercise

Lazy load components:
1. Use defineAsyncComponent
2. Add loading states
3. Handle errors`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Memoization',
        slug: 'memoization',
        content: `# Memoization

Cache expensive computations to improve performance.

## Computed Properties

Computed properties are automatically memoized:

\`\`\`vue
<script setup>
import { computed, ref } from 'vue'

const items = ref([1, 2, 3, 4, 5])

const expensiveCalculation = computed(() => {
  return items.value.reduce((sum, item) => sum + item * 2, 0)
})
</script>
\`\`\`

## Practice Exercise

Optimize with memoization:
1. Use computed for expensive operations
2. Avoid recalculations
3. Measure performance`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Devtools usage',
        slug: 'devtools-usage',
        content: `# Vue Devtools

Use Vue Devtools to debug and inspect your application.

## Installation

Install Vue Devtools browser extension.

## Features

- Component tree inspection
- State inspection
- Event tracking
- Performance profiling

## Practice Exercise

Use Devtools:
1. Inspect component hierarchy
2. Monitor state changes
3. Profile performance`,
        isPractice: false,
        estimatedTime: 12
      }
    ]
  },
  {
    moduleTitle: 'Build & Deployment',
    lessons: [
      {
        title: 'Vite',
        slug: 'vite',
        content: `# Vite Build Tool

Vite is a fast build tool for Vue applications.

## Build Command

\`\`\`bash
npm run build
\`\`\`

## Vite Config

\`\`\`javascript
// vite.config.js
export default {
  build: {
    outDir: 'dist',
    sourcemap: true
  }
}
\`\`\`

## Practice Exercise

Configure Vite:
1. Customize build options
2. Add plugins
3. Optimize output`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Environment configs',
        slug: 'environment-configs',
        content: `# Environment Configurations

Manage different settings for development and production.

## .env Files

\`\`\`
.env.development
.env.production
.env.local
\`\`\`

## Using Environment Variables

\`\`\`javascript
const apiUrl = import.meta.env.VITE_API_URL
\`\`\`

## Practice Exercise

Set up environments:
1. Create .env files
2. Use in code
3. Test different configs`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Production builds',
        slug: 'production-builds',
        content: `# Production Builds

Create optimized builds for production.

## Build Process

\`\`\`bash
npm run build
\`\`\`

## Build Output

- Minified JavaScript
- Optimized CSS
- Compressed assets
- Source maps (optional)

## Practice Exercise

Create production build:
1. Run build command
2. Check output
3. Test locally`,
        isPractice: false,
        estimatedTime: 12
      },
      {
        title: 'Deployment (Netlify, Vercel, etc.)',
        slug: 'deployment-netlify-vercel',
        content: `# Deployment

Deploy your Vue app to hosting platforms.

## Netlify

1. Build: \`npm run build\`
2. Drag \`dist\` folder to Netlify
3. Or connect GitHub for auto-deploy

## Vercel

\`\`\`bash
npm i -g vercel
vercel
\`\`\`

## Practice Exercise

Deploy your app:
1. Choose platform
2. Configure build
3. Deploy and test`,
        isPractice: false,
        estimatedTime: 20
      }
    ]
  },
  {
    moduleTitle: 'Advanced Topics',
    lessons: [
      {
        title: 'Server-Side Rendering (Nuxt)',
        slug: 'ssr-nuxt',
        content: `# Server-Side Rendering with Nuxt

Nuxt.js adds SSR capabilities to Vue.

## What is SSR?

- Renders HTML on server
- Better SEO
- Faster initial load

## Nuxt Setup

\`\`\`bash
npx nuxi@latest init my-app
\`\`\`

## Practice Exercise

Explore Nuxt:
1. Create Nuxt app
2. Understand SSR benefits
3. Compare with SPA`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Static Site Generation',
        slug: 'static-site-generation',
        content: `# Static Site Generation

Generate static HTML at build time.

## Benefits

- Fast loading
- Great SEO
- Easy hosting

## Nuxt Static Generation

\`\`\`bash
npm run generate
\`\`\`

## Practice Exercise

Generate static site:
1. Configure SSG
2. Build static files
3. Deploy`,
        isPractice: false,
        estimatedTime: 18
      },
      {
        title: 'Internationalization (i18n)',
        slug: 'internationalization-i18n',
        content: `# Internationalization

Add multiple languages to your app.

## vue-i18n

\`\`\`bash
npm install vue-i18n
\`\`\`

\`\`\`vue
<template>
  <p>{{ $t('welcome') }}</p>
</template>
\`\`\`

## Practice Exercise

Add i18n:
1. Install vue-i18n
2. Add translations
3. Switch languages`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Accessibility (a11y)',
        slug: 'accessibility-a11y',
        content: `# Accessibility

Make your app accessible to all users.

## ARIA Attributes

\`\`\`vue
<button aria-label="Close dialog">×</button>
\`\`\`

## Semantic HTML

\`\`\`vue
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
\`\`\`

## Practice Exercise

Improve accessibility:
1. Add ARIA labels
2. Use semantic HTML
3. Test with screen reader`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Security best practices',
        slug: 'security-best-practices',
        content: `# Security Best Practices

Secure your Vue applications.

## XSS Prevention

Vue automatically escapes content, but be careful with \`v-html\`:

\`\`\`vue
<!-- Dangerous -->
<div v-html="userInput"></div>

<!-- Safe -->
<div>{{ userInput }}</div>
\`\`\`

## Practice Exercise

Review security:
1. Avoid v-html with user input
2. Validate inputs
3. Use HTTPS`,
        isPractice: false,
        estimatedTime: 15
      }
    ]
  },
  {
    moduleTitle: 'Ecosystem & Tooling',
    lessons: [
      {
        title: 'Vue Devtools',
        slug: 'vue-devtools',
        content: `# Vue Devtools

Browser extension for debugging Vue applications.

## Installation

Install Vue Devtools from browser extension store.

## Features

- Component inspection
- State debugging
- Performance profiling
- Timeline view

## Practice Exercise

Use Devtools:
1. Inspect components
2. Monitor state
3. Debug issues`,
        isPractice: false,
        estimatedTime: 12
      },
      {
        title: 'ESLint & Prettier',
        slug: 'eslint-prettier',
        content: `# ESLint & Prettier

Code quality and formatting tools.

## ESLint

\`\`\`bash
npm install -D eslint @vue/eslint-config-prettier
\`\`\`

## Prettier

\`\`\`bash
npm install -D prettier
\`\`\`

## Practice Exercise

Set up linting:
1. Configure ESLint
2. Configure Prettier
3. Format code`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Git basics',
        slug: 'git-basics',
        content: `# Git Basics

Version control for your projects.

## Basic Commands

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git push
\`\`\`

## Practice Exercise

Use Git:
1. Initialize repository
2. Make commits
3. Push to remote`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Project structure conventions',
        slug: 'project-structure-conventions',
        content: `# Project Structure

Organize your Vue projects following conventions.

## Recommended Structure

\`\`\`
src/
  components/
  views/
  composables/
  stores/
  router/
  assets/
  utils/
\`\`\`

## Practice Exercise

Organize project:
1. Follow conventions
2. Group related files
3. Keep structure clean`,
        isPractice: false,
        estimatedTime: 12
      }
    ]
  },
  {
    moduleTitle: 'Final Step: Build & Practice',
    lessons: [
      {
        title: 'Build real projects',
        slug: 'build-real-projects',
        content: `# Build Real Projects

Apply everything you've learned by building real applications.

## Project Ideas

- Todo App with backend
- E-commerce frontend
- Blog platform
- Dashboard app
- Social media feed

## Practice

Build a complete project:
1. Plan features
2. Set up project
3. Implement features
4. Deploy`,
        isPractice: true,
        estimatedTime: 240
      },
      {
        title: 'Read open-source Vue code',
        slug: 'read-open-source-vue-code',
        content: `# Read Open-Source Code

Learn from real-world Vue projects.

## Where to Look

- GitHub Vue repositories
- Vue.js official examples
- Popular Vue projects

## Practice

Study code:
1. Find Vue projects
2. Read code
3. Understand patterns
4. Apply learnings`,
        isPractice: true,
        estimatedTime: 60
      },
      {
        title: 'Refactor and improve existing apps',
        slug: 'refactor-improve-existing-apps',
        content: `# Refactor Existing Apps

Improve code quality through refactoring.

## Refactoring Steps

1. Understand current code
2. Identify improvements
3. Apply changes
4. Test thoroughly

## Practice

Refactor an app:
1. Find code to improve
2. Refactor components
3. Optimize performance
4. Add tests`,
        isPractice: true,
        estimatedTime: 120
      }
    ]
  }
];

const reactLessons = [
  {
    moduleTitle: 'Components',
    lessons: [
      {
        title: 'Functional vs. Class Components (focus on functional)',
        slug: 'functional-vs-class-components',
        content: `# Functional vs. Class Components

React components can be written as functions or classes. Modern React focuses on **functional components**.

## Functional Components

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Arrow function syntax
const Welcome = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};
\`\`\`

## Class Components (Legacy)

\`\`\`jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
\`\`\`

## Why Functional Components?

-  Simpler syntax
-  Better performance
-  Easier to test
-  Hooks work only with functions
-  Less boilerplate

## Modern Approach

Always use functional components with hooks:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

## Practice

Convert a class component to a functional component:
1. Create a functional \`Greeting\` component
2. Accept a \`name\` prop
3. Display "Hello, [name]!"`,
        isPractice: false,
        estimatedTime: 10
      },
      {
        title: 'How to return JSX',
        slug: 'how-to-return-jsx',
        content: `# How to Return JSX

JSX (JavaScript XML) lets you write HTML-like syntax in JavaScript.

## Basic JSX

\`\`\`jsx
function App() {
  return <h1>Hello World</h1>;
}
\`\`\`

## Multiple Elements

Wrap multiple elements in a fragment or parent element:

\`\`\`jsx
// Using fragment
function App() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}

// Using div
function App() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );
}
\`\`\`

## JavaScript in JSX

Use curly braces \`{}\` to embed JavaScript:

\`\`\`jsx
function App() {
  const name = 'John';
  const age = 25;
  
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Next year: {age + 1}</p>
    </div>
  );
}
\`\`\`

## Conditional Rendering

\`\`\`jsx
function App() {
  const isLoggedIn = true;
  
  return (
    <div>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please login</p>}
    </div>
  );
}
\`\`\`

## Lists

\`\`\`jsx
function App() {
  const items = ['Apple', 'Banana', 'Orange'];
  
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Practice

Create a component that:
1. Returns a list of your favorite foods
2. Uses conditional rendering to show a message
3. Embeds JavaScript expressions`,
        isPractice: false,
        estimatedTime: 10
      },
      {
        title: 'Nesting components',
        slug: 'nesting-components',
        content: `# Nesting Components

Components can be nested inside other components to build complex UIs.

## Basic Nesting

\`\`\`jsx
function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

function Header() {
  return <header>Header</header>;
}

function Main() {
  return <main>Main Content</main>;
}

function Footer() {
  return <footer>Footer</footer>;
}
\`\`\`

## Component Composition

\`\`\`jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function App() {
  return (
    <Card>
      <h2>Title</h2>
      <p>Content</p>
    </Card>
  );
}
\`\`\`

## Practice Exercise

Create nested components:
1. App component
2. Header, Main, Footer components
3. Compose them together`,
        isPractice: false,
        estimatedTime: 12
      },
      {
        title: 'Reusability',
        slug: 'reusability',
        content: `# Component Reusability

Create reusable components to avoid code duplication.

## Reusable Button Component

\`\`\`jsx
function Button({ text, onClick, variant = 'primary' }) {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function App() {
  return (
    <div>
      <Button text="Click me" onClick={() => alert('Clicked!')} />
      <Button text="Cancel" variant="secondary" />
    </div>
  );
}
\`\`\`

## Practice Exercise

Create reusable components:
1. Button component with variants
2. Card component
3. Use multiple times`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Build a UserCard component and render multiple cards',
        slug: 'build-usercard-component-render-multiple',
        content: `# Exercise: UserCard Component

Build a reusable UserCard component and display multiple cards.

## Step 1: Create UserCard Component

\`\`\`jsx
function UserCard({ name, email, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}
\`\`\`

## Step 2: Render Multiple Cards

\`\`\`jsx
function App() {
  const users = [
    { name: 'John', email: 'john@example.com', avatar: '...' },
    { name: 'Jane', email: 'jane@example.com', avatar: '...' },
    { name: 'Bob', email: 'bob@example.com', avatar: '...' }
  ];
  
  return (
    <div>
      {users.map(user => (
        <UserCard 
          key={user.email}
          name={user.name}
          email={user.email}
          avatar={user.avatar}
        />
      ))}
    </div>
  );
}
\`\`\`

## Practice

Complete the exercise:
1. Create UserCard component
2. Add styling
3. Render 5+ user cards`,
        isPractice: true,
        estimatedTime: 25
      },
      {
        title: 'What are props?',
        slug: 'what-are-props',
        content: `# What are Props?

Props (properties) are how you pass data from parent to child components.

## Passing Props

\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return <Welcome name="John" />;
}
\`\`\`

## Multiple Props

\`\`\`jsx
function UserCard({ name, age, email }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

function App() {
  return (
    <UserCard 
      name="John Doe"
      age={25}
      email="john@example.com"
    />
  );
}
\`\`\`

## Props are Read-Only

Props cannot be modified by the child component. They flow down from parent.

## Practice Exercise

Create a ProductCard component:
1. Accept name, price, image props
2. Display product information
3. Use in parent component`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Passing data to components',
        slug: 'passing-data-to-components',
        content: `# Passing Data to Components

Learn different ways to pass data to components.

## Passing Strings

\`\`\`jsx
<Component title="Hello World" />
\`\`\`

## Passing Numbers

\`\`\`jsx
<Component count={42} />
\`\`\`

## Passing Objects

\`\`\`jsx
const user = { name: 'John', age: 25 };
<Component user={user} />
\`\`\`

## Passing Arrays

\`\`\`jsx
const items = [1, 2, 3];
<Component items={items} />
\`\`\`

## Passing Functions

\`\`\`jsx
function handleClick() {
  console.log('Clicked');
}

<Component onClick={handleClick} />
\`\`\`

## Practice Exercise

Pass different data types:
1. String, number, boolean
2. Object and array
3. Function as callback`,
        isPractice: false,
        estimatedTime: 18
      },
      {
        title: 'Using props in child components',
        slug: 'using-props-in-child-components',
        content: `# Using Props in Child Components

Access and use props in child components.

## Accessing Props

\`\`\`jsx
function ChildComponent(props) {
  return <div>{props.name}</div>;
}
\`\`\`

## Destructuring Props

\`\`\`jsx
function ChildComponent({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}
\`\`\`

## Default Props

\`\`\`jsx
function ChildComponent({ name = 'Guest', age = 0 }) {
  return <div>{name} is {age} years old</div>;
}
\`\`\`

## Practice Exercise

Create a component that:
1. Receives multiple props
2. Uses destructuring
3. Has default values`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Pass props like name, age, image to UserCard',
        slug: 'pass-props-name-age-image-usercard',
        content: `# Exercise: Pass Props to UserCard

Complete the UserCard component by passing props.

## Component Definition

\`\`\`jsx
function UserCard({ name, age, image }) {
  return (
    <div className="user-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Age: {age}</p>
    </div>
  );
}
\`\`\`

## Using the Component

\`\`\`jsx
function App() {
  return (
    <UserCard 
      name="John Doe"
      age={28}
      image="https://example.com/avatar.jpg"
    />
  );
}
\`\`\`

## Practice

Complete the exercise:
1. Create UserCard with props
2. Pass name, age, image
3. Style the card
4. Render multiple cards`,
        isPractice: true,
        estimatedTime: 20
      }
    ]
  },
  {
    moduleTitle: 'State & useState Hook',
    lessons: [
      {
        title: 'useState explained',
        slug: 'usestate-explained',
        content: `# useState Hook Explained

\`useState\` is a React Hook that lets you add state to functional components.

## Basic Usage

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

## useState Returns Array

\`useState\` returns an array with two elements:
1. Current state value
2. Function to update state

## Multiple State Variables

\`\`\`jsx
function Component() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  // ...
}
\`\`\`

## Functional Updates

\`\`\`jsx
const [count, setCount] = useState(0);

// Use function when new state depends on previous
setCount(prevCount => prevCount + 1);
\`\`\`

## Practice Exercise

Create a component with:
1. Name state
2. Age state
3. Update both independently`,
        isPractice: false,
        estimatedTime: 18
      },
      {
        title: 'Handling click events',
        slug: 'handling-click-events',
        content: `# Handling Click Events

Handle user clicks and update state accordingly.

## Basic Click Handler

\`\`\`jsx
function Button() {
  const [count, setCount] = useState(0);
  
  function handleClick() {
    setCount(count + 1);
  }
  
  return <button onClick={handleClick}>Clicked {count} times</button>;
}
\`\`\`

## Inline Handler

\`\`\`jsx
function Button() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
\`\`\`

## Event Object

\`\`\`jsx
function Button() {
  function handleClick(event) {
    console.log('Button clicked', event);
    event.preventDefault();
  }
  
  return <button onClick={handleClick}>Click me</button>;
}
\`\`\`

## Practice Exercise

Create interactive buttons:
1. Increment counter
2. Toggle visibility
3. Change color`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Updating and reading state',
        slug: 'updating-reading-state',
        content: `# Updating and Reading State

Learn how to read and update state properly.

## Reading State

\`\`\`jsx
function Component() {
  const [count, setCount] = useState(0);
  
  // Read state directly
  return <div>Count: {count}</div>;
}
\`\`\`

## Updating State

\`\`\`jsx
function Component() {
  const [count, setCount] = useState(0);
  
  function increment() {
    setCount(count + 1); // Direct update
  }
  
  function incrementBy(amount) {
    setCount(count + amount); // Update with value
  }
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={() => incrementBy(5)}>+5</button>
    </div>
  );
}
\`\`\`

## Important Rules

- Never mutate state directly
- Always use setter function
- State updates are asynchronous

## Practice Exercise

Create a calculator:
1. Display result
2. Add, subtract operations
3. Reset function`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Create a counter or like button with useState',
        slug: 'create-counter-like-button-usestate',
        content: `# Exercise: Counter or Like Button

Build a counter or like button using useState.

## Counter Implementation

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
\`\`\`

## Like Button Implementation

\`\`\`jsx
function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  
  function handleLike() {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  }
  
  return (
    <button onClick={handleLike}>
      {liked ? '❤️' : '🤍'} {likes}
    </button>
  );
}
\`\`\`

## Practice

Complete the exercise:
1. Choose counter or like button
2. Implement with useState
3. Add styling
4. Test functionality`,
        isPractice: true,
        estimatedTime: 25
      },
      {
        title: 'Rendering lists with .map()',
        slug: 'rendering-lists-map',
        content: `# Rendering Lists with .map()

Use the \`.map()\` method to render lists of data.

## Basic List Rendering

\`\`\`jsx
function List() {
  const items = ['Apple', 'Banana', 'Orange'];
  
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Rendering Objects

\`\`\`jsx
function UserList() {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' }
  ];
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Keys are Important

Always provide a unique \`key\` prop when rendering lists.

## Practice Exercise

Create a list component:
1. Array of items
2. Render with map
3. Add unique keys`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Keys in React',
        slug: 'keys-in-react',
        content: `# Keys in React

Keys help React identify which items have changed, been added, or removed.

## Why Keys Matter

\`\`\`jsx
// Without keys - React can't track items efficiently
{items.map(item => <li>{item}</li>)}

// With keys - React can track items
{items.map(item => <li key={item.id}>{item}</li>)}
\`\`\`

## Using Unique IDs

\`\`\`jsx
const todos = [
  { id: 1, text: 'Learn React' },
  { id: 2, text: 'Build app' }
];

{todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} />
))}
\`\`\`

## Index as Key (Not Recommended)

\`\`\`jsx
// Only use index if list is static
{items.map((item, index) => (
  <Item key={index} item={item} />
))}
\`\`\`

## Practice Exercise

Fix key warnings:
1. Add keys to list items
2. Use unique IDs
3. Avoid index when possible`,
        isPractice: false,
        estimatedTime: 12
      },
      {
        title: 'Create a TodoList from an array of todos',
        slug: 'create-todolist-array-todos',
        content: `# Exercise: TodoList Component

Build a TodoList component that renders todos from an array.

## Step 1: Create TodoList Component

\`\`\`jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
\`\`\`

## Step 2: Use Component

\`\`\`jsx
function App() {
  const todos = [
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build project' },
    { id: 3, text: 'Deploy app' }
  ];
  
  return <TodoList todos={todos} />;
}
\`\`\`

## Step 3: Add Features

\`\`\`jsx
function TodoItem({ todo, onToggle }) {
  return (
    <li 
      onClick={() => onToggle(todo.id)}
      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
    >
      {todo.text}
    </li>
  );
}
\`\`\`

## Practice

Complete the exercise:
1. Create TodoList component
2. Render todos array
3. Add completion toggle
4. Style the list`,
        isPractice: true,
        estimatedTime: 30
      }
    ]
  },
  {
    moduleTitle: 'Conditional Rendering',
    lessons: [
      {
        title: 'if vs ternary (? :)',
        slug: 'if-vs-ternary',
        content: `# if vs Ternary Operator

Different ways to conditionally render content in React.

## if Statement

\`\`\`jsx
function Component() {
  const isLoggedIn = true;
  let content;
  
  if (isLoggedIn) {
    content = <p>Welcome back!</p>;
  } else {
    content = <p>Please login</p>;
  }
  
  return <div>{content}</div>;
}
\`\`\`

## Ternary Operator

\`\`\`jsx
function Component() {
  const isLoggedIn = true;
  
  return (
    <div>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please login</p>}
    </div>
  );
}
\`\`\`

## When to Use What?

- **if**: Complex logic, multiple conditions
- **Ternary**: Simple true/false conditions
- **&&**: Show/hide single element

## Practice Exercise

Use all three methods:
1. if statement for complex logic
2. Ternary for simple condition
3. && for single element`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Showing/hiding elements',
        slug: 'showing-hiding-elements',
        content: `# Showing/Hiding Elements

Control element visibility based on state.

## Conditional Rendering

\`\`\`jsx
function Component() {
  const [show, setShow] = useState(true);
  
  return (
    <div>
      {show && <p>This is visible</p>}
      <button onClick={() => setShow(!show)}>
        Toggle
      </button>
    </div>
  );
}
\`\`\`

## Using Ternary

\`\`\`jsx
function Component() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div>
      {isVisible ? (
        <div>Content is visible</div>
      ) : (
        <div>Content is hidden</div>
      )}
    </div>
  );
}
\`\`\`

## Practice Exercise

Create toggle functionality:
1. Show/hide content
2. Toggle button
3. Smooth transitions`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: '&& short-circuit',
        slug: 'short-circuit',
        content: `# && Short-Circuit Evaluation

Use \`&&\` for simple conditional rendering.

## Basic Usage

\`\`\`jsx
function Component() {
  const count = 5;
  
  return (
    <div>
      {count > 0 && <p>Count is positive</p>}
    </div>
  );
}
\`\`\`

## Common Pattern

\`\`\`jsx
function Component() {
  const [user, setUser] = useState(null);
  
  return (
    <div>
      {user && <p>Welcome, {user.name}</p>}
      {!user && <p>Please login</p>}
    </div>
  );
}
\`\`\`

## Be Careful

\`\`\`jsx
// This renders 0 if count is 0!
{count && <p>Count: {count}</p>}

// Better:
{count > 0 && <p>Count: {count}</p>}
\`\`\`

## Practice Exercise

Use && operator:
1. Show message when condition is true
2. Handle edge cases
3. Combine with other conditions`,
        isPractice: false,
        estimatedTime: 12
      },
      {
        title: "Show 'No tasks left' when todo list is empty",
        slug: 'show-no-tasks-todo-empty',
        content: `# Exercise: Empty State Message

Display a message when the todo list is empty.

## Implementation

\`\`\`jsx
function TodoList({ todos }) {
  return (
    <div>
      {todos.length === 0 ? (
        <p>No tasks left! 🎉</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
\`\`\`

## Alternative with &&

\`\`\`jsx
function TodoList({ todos }) {
  return (
    <div>
      {todos.length === 0 && <p>No tasks left! 🎉</p>}
      {todos.length > 0 && (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
\`\`\`

## Practice

Complete the exercise:
1. Check if todos array is empty
2. Show message when empty
3. Show list when not empty`,
        isPractice: true,
        estimatedTime: 15
      },
      {
        title: 'Controlled inputs (value, onChange)',
        slug: 'controlled-inputs-value-onchange',
        content: `# Controlled Inputs

Controlled inputs have their value controlled by React state.

## Basic Controlled Input

\`\`\`jsx
function Input() {
  const [value, setValue] = useState('');
  
  return (
    <input 
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
\`\`\`

## Multiple Inputs

\`\`\`jsx
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  
  return (
    <form>
      <input 
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input 
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
    </form>
  );
}
\`\`\`

## Practice Exercise

Create a form:
1. Multiple controlled inputs
2. Update state on change
3. Display form data`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Handling submit events',
        slug: 'handling-submit-events',
        content: `# Handling Submit Events

Handle form submission in React.

## Basic Form Submit

\`\`\`jsx
function Form() {
  const [name, setName] = useState('');
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitted:', name);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

## Prevent Default

Always prevent default form submission:

\`\`\`jsx
function handleSubmit(e) {
  e.preventDefault(); // Prevents page reload
  // Handle submission
}
\`\`\`

## Practice Exercise

Create a submit handler:
1. Prevent default
2. Access form data
3. Handle submission`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Local state for form data',
        slug: 'local-state-form-data',
        content: `# Local State for Form Data

Manage form data using local component state.

## Single Input State

\`\`\`jsx
function Form() {
  const [email, setEmail] = useState('');
  
  return (
    <input 
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );
}
\`\`\`

## Object State

\`\`\`jsx
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  
  return (
    <form>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <input name="password" value={formData.password} onChange={handleChange} />
    </form>
  );
}
\`\`\`

## Practice Exercise

Create a registration form:
1. Multiple fields
2. Object state
3. Handle all inputs`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Build a signup form',
        slug: 'build-signup-form',
        content: `# Exercise: Signup Form

Build a complete signup form with validation.

## Form Structure

\`\`\`jsx
function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    // Validate and submit
    console.log('Form submitted:', formData);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input 
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input 
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}
\`\`\`

## Practice

Complete the exercise:
1. Create signup form
2. Handle all inputs
3. Add validation
4. Submit handler`,
        isPractice: true,
        estimatedTime: 30
      }
    ]
  },
  {
    moduleTitle: 'useEffect & Fetching Data',
    lessons: [
      {
        title: 'Intro to useEffect',
        slug: 'intro-useeffect',
        content: `# Introduction to useEffect

\`useEffect\` lets you perform side effects in functional components.

## Basic Usage

\`\`\`jsx
import { useState, useEffect } from 'react';

function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  });
  
  return <div>{count}</div>;
}
\`\`\`

## Effect Runs After Render

Effects run after the component renders to the screen.

## Practice Exercise

Use useEffect to:
1. Update document title
2. Log to console
3. Update state`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Side effects in React',
        slug: 'side-effects-react',
        content: `# Side Effects in React

Side effects are operations that affect something outside the component.

## Common Side Effects

- Data fetching
- Setting up subscriptions
- Manually changing the DOM
- Timers

## useEffect Syntax

\`\`\`jsx
useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup (optional)
  };
}, [dependencies]);
\`\`\`

## Practice Exercise

Identify side effects:
1. API calls
2. Timers
3. Event listeners`,
        isPractice: false,
        estimatedTime: 12
      },
      {
        title: 'Fetch data from an API',
        slug: 'fetch-data-api',
        content: `# Fetch Data from API

Use useEffect to fetch data when component mounts.

## Basic Fetch

\`\`\`jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(\`/api/users/\${userId}\`);
      const data = await response.json();
      setUser(data);
    }
    
    fetchUser();
  }, [userId]);
  
  if (!user) return <div>Loading...</div>;
  
  return <div>{user.name}</div>;
}
\`\`\`

## With Loading State

\`\`\`jsx
function Component() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch('/api/data');
      const data = await response.json();
      setData(data);
      setLoading(false);
    }
    
    fetchData();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  return <div>{data}</div>;
}
\`\`\`

## Practice Exercise

Fetch data from API:
1. Use useEffect
2. Handle loading state
3. Display data`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Weather app or User fetcher',
        slug: 'weather-app-user-fetcher',
        content: `# Exercise: Weather App or User Fetcher

Build an app that fetches and displays data from an API.

## Weather App Example

\`\`\`jsx
function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London');
  
  useEffect(() => {
    async function fetchWeather() {
      const response = await fetch(
        \`https://api.weather.com/data?city=\${city}\`
      );
      const data = await response.json();
      setWeather(data);
    }
    
    fetchWeather();
  }, [city]);
  
  return (
    <div>
      <input value={city} onChange={(e) => setCity(e.target.value)} />
      {weather && <div>{weather.temperature}°C</div>}
    </div>
  );
}
\`\`\`

## Practice

Complete the exercise:
1. Choose weather or user fetcher
2. Fetch from API
3. Display data
4. Handle errors`,
        isPractice: true,
        estimatedTime: 30
      },
      {
        title: 'What is client-side routing?',
        slug: 'client-side-routing',
        content: `# Client-Side Routing

Client-side routing allows navigation without page reloads.

## Traditional Routing

- Full page reload
- Server sends new HTML
- Slower, less smooth

## Client-Side Routing

- No page reload
- JavaScript handles navigation
- Faster, smoother experience

## React Router

React Router enables client-side routing in React apps.

## Practice Exercise

Understand the difference:
1. Compare traditional vs client-side
2. See benefits
3. Learn React Router basics`,
        isPractice: false,
        estimatedTime: 10
      },
      {
        title: 'Install React Router',
        slug: 'install-react-router',
        content: `# Install React Router

Set up React Router in your project.

## Installation

\`\`\`bash
npm install react-router-dom
\`\`\`

## Basic Setup

\`\`\`jsx
// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

## Practice Exercise

Install and set up:
1. Install react-router-dom
2. Create basic routes
3. Test navigation`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Create pages: Home, About, Contact',
        slug: 'create-pages-home-about-contact',
        content: `# Exercise: Create Pages

Create multiple pages with React Router.

## Step 1: Create Page Components

\`\`\`jsx
// pages/Home.js
function Home() {
  return <h1>Home Page</h1>;
}

// pages/About.js
function About() {
  return <h1>About Page</h1>;
}

// pages/Contact.js
function Contact() {
  return <h1>Contact Page</h1>;
}
\`\`\`

## Step 2: Set Up Routes

\`\`\`jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

## Practice

Complete the exercise:
1. Create 3 page components
2. Set up routes
3. Add navigation
4. Test all pages`,
        isPractice: true,
        estimatedTime: 25
      },
      {
        title: '<Link>, <Route>, <BrowserRouter>',
        slug: 'link-route-browserrouter',
        content: `# React Router Components

Learn the core React Router components.

## BrowserRouter

Wraps your app to enable routing:

\`\`\`jsx
<BrowserRouter>
  <App />
</BrowserRouter>
\`\`\`

## Routes & Route

Define your routes:

\`\`\`jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
\`\`\`

## Link

Navigate without page reload:

\`\`\`jsx
<Link to="/about">About</Link>
\`\`\`

## Practice Exercise

Use all components:
1. BrowserRouter wrapper
2. Routes and Route
3. Link for navigation`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Build a small multi-page app',
        slug: 'build-small-multi-page-app',
        content: `# Exercise: Multi-Page App

Build a complete multi-page application.

## App Structure

\`\`\`jsx
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

## Practice

Complete the exercise:
1. Create 3+ pages
2. Set up routing
3. Add navigation
4. Style the app`,
        isPractice: true,
        estimatedTime: 35
      }
    ]
  },
  {
    moduleTitle: 'Lifting State Up',
    lessons: [
      {
        title: 'Share state between components',
        slug: 'share-state-between-components',
        content: `# Sharing State Between Components

Lift state up to the nearest common ancestor.

## Problem

\`\`\`jsx
// Both components need same state
function ComponentA() {
  const [count, setCount] = useState(0);
  // ...
}

function ComponentB() {
  const [count, setCount] = useState(0); // Duplicate!
  // ...
}
\`\`\`

## Solution: Lift State Up

\`\`\`jsx
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <ComponentA count={count} setCount={setCount} />
      <ComponentB count={count} setCount={setCount} />
    </div>
  );
}
\`\`\`

## Practice Exercise

Lift state up:
1. Identify shared state
2. Move to parent
3. Pass as props`,
        isPractice: false,
        estimatedTime: 18
      },
      {
        title: 'Pass state and handlers from parent to child',
        slug: 'pass-state-handlers-parent-child',
        content: `# Pass State and Handlers

Pass state and update functions from parent to children.

## Passing State

\`\`\`jsx
function Parent() {
  const [name, setName] = useState('');
  
  return <Child name={name} setName={setName} />;
}

function Child({ name, setName }) {
  return (
    <input 
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
\`\`\`

## Passing Handlers

\`\`\`jsx
function Parent() {
  const [count, setCount] = useState(0);
  
  function increment() {
    setCount(count + 1);
  }
  
  return <Child count={count} onIncrement={increment} />;
}
\`\`\`

## Practice Exercise

Create parent-child communication:
1. State in parent
2. Pass to children
3. Update from children`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Calculator with inputs and result display',
        slug: 'calculator-inputs-result-display',
        content: `# Exercise: Calculator

Build a calculator with separate input and display components.

## Calculator Structure

\`\`\`jsx
function Calculator() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);
  
  function calculate(operation) {
    switch(operation) {
      case 'add':
        setResult(num1 + num2);
        break;
      case 'subtract':
        setResult(num1 - num2);
        break;
      // ...
    }
  }
  
  return (
    <div>
      <Input value={num1} onChange={setNum1} />
      <Input value={num2} onChange={setNum2} />
      <ResultDisplay result={result} />
      <Button onClick={() => calculate('add')}>Add</Button>
    </div>
  );
}
\`\`\`

## Practice

Complete the exercise:
1. Create Input component
2. Create ResultDisplay component
3. Manage state in parent
4. Implement operations`,
        isPractice: true,
        estimatedTime: 30
      }
    ]
  },
  {
    moduleTitle: 'Context API (Global State)',
    lessons: [
      {
        title: 'What is Context?',
        slug: 'what-is-context',
        content: `# What is Context?

Context provides a way to pass data through the component tree without prop drilling.

## Problem: Prop Drilling

\`\`\`jsx
// Passing props through many levels
<App>
  <Header user={user} />
  <Main user={user}>
    <Content user={user}>
      <Component user={user} />
    </Content>
  </Main>
</App>
\`\`\`

## Solution: Context

\`\`\`jsx
// Create context
const UserContext = createContext();

// Provide value
<UserContext.Provider value={user}>
  <App />
</UserContext.Provider>

// Use value anywhere
const user = useContext(UserContext);
\`\`\`

## Practice Exercise

Understand Context:
1. Identify prop drilling
2. Create context
3. Provide and consume`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'React.createContext, Provider, useContext',
        slug: 'createcontext-provider-usecontext',
        content: `# Context API Components

Learn the three main parts of Context API.

## createContext

\`\`\`jsx
import { createContext } from 'react';

const ThemeContext = createContext();
\`\`\`

## Provider

\`\`\`jsx
function App() {
  const theme = 'dark';
  
  return (
    <ThemeContext.Provider value={theme}>
      <Child />
    </ThemeContext.Provider>
  );
}
\`\`\`

## useContext

\`\`\`jsx
function Child() {
  const theme = useContext(ThemeContext);
  
  return <div className={theme}>Content</div>;
}
\`\`\`

## Practice Exercise

Use all three:
1. Create context
2. Provide value
3. Consume with useContext`,
        isPractice: false,
        estimatedTime: 18
      },
      {
        title: 'When to use Context vs props',
        slug: 'when-use-context-vs-props',
        content: `# Context vs Props

Know when to use Context and when to use props.

## Use Props When

- Passing data to immediate children
- Simple parent-child communication
- Data is specific to few components

## Use Context When

- Data needed by many components
- Deep component tree
- Global state (theme, user, language)

## Example: Theme

\`\`\`jsx
// Context for theme (used everywhere)
const ThemeContext = createContext();

// Props for user data (specific component)
<UserProfile user={user} />
\`\`\`

## Practice Exercise

Decide when to use:
1. Theme - Context ✓
2. User profile - Props ✓
3. Language - Context ✓`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Theme toggler (light/dark) using Context API',
        slug: 'theme-toggler-light-dark-context',
        content: `# Exercise: Theme Toggler

Build a theme toggler using Context API.

## Step 1: Create Theme Context

\`\`\`jsx
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
\`\`\`

## Step 2: Use Theme

\`\`\`jsx
function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div className={theme}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Content />
    </div>
  );
}
\`\`\`

## Practice

Complete the exercise:
1. Create ThemeContext
2. Provider component
3. Toggle functionality
4. Apply theme styles`,
        isPractice: true,
        estimatedTime: 30
      }
    ]
  },
  {
    moduleTitle: 'Custom Hooks',
    lessons: [
      {
        title: 'What is a custom hook?',
        slug: 'what-is-custom-hook',
        content: `# What is a Custom Hook?

Custom hooks are JavaScript functions that use React hooks and can be shared between components.

## Naming Convention

Custom hooks must start with "use":

\`\`\`jsx
function useCounter() {
  const [count, setCount] = useState(0);
  
  function increment() {
    setCount(count + 1);
  }
  
  return { count, increment };
}
\`\`\`

## Using Custom Hook

\`\`\`jsx
function Component() {
  const { count, increment } = useCounter();
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
\`\`\`

## Practice Exercise

Create your first custom hook:
1. useCounter hook
2. Use in component
3. Reuse in another component`,
        isPractice: false,
        estimatedTime: 15
      },
      {
        title: 'Reusing logic across components',
        slug: 'reusing-logic-components',
        content: `# Reusing Logic with Custom Hooks

Extract common logic into reusable custom hooks.

## useFetch Hook

\`\`\`jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}
\`\`\`

## Using the Hook

\`\`\`jsx
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(\`/api/users/\${userId}\`);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  return <div>{data.name}</div>;
}
\`\`\`

## Practice Exercise

Create reusable hooks:
1. useFetch for API calls
2. useLocalStorage for persistence
3. Use in multiple components`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Example: useForm, useFetch',
        slug: 'example-useform-usefetch',
        content: `# Common Custom Hooks

Learn common custom hooks patterns.

## useForm Hook

\`\`\`jsx
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  
  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  }
  
  function reset() {
    setValues(initialValues);
  }
  
  return { values, handleChange, reset };
}
\`\`\`

## useFetch Hook

\`\`\`jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading, error };
}
\`\`\`

## Practice Exercise

Create both hooks:
1. useForm for forms
2. useFetch for API calls
3. Use in components`,
        isPractice: false,
        estimatedTime: 25
      },
      {
        title: 'Convert your form logic to a custom useForm hook',
        slug: 'convert-form-logic-useform-hook',
        content: `# Exercise: useForm Hook

Extract form logic into a reusable useForm hook.

## Before: Form Logic in Component

\`\`\`jsx
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  function handleNameChange(e) {
    setName(e.target.value);
  }
  
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  
  // ... more logic
}
\`\`\`

## After: useForm Hook

\`\`\`jsx
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  
  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  }
  
  return { values, handleChange };
}

function Form() {
  const { values, handleChange } = useForm({
    name: '',
    email: ''
  });
  
  return (
    <form>
      <input 
        name="name"
        value={values.name}
        onChange={handleChange}
      />
    </form>
  );
}
\`\`\`

## Practice

Complete the exercise:
1. Extract form logic
2. Create useForm hook
3. Refactor component
4. Test functionality`,
        isPractice: true,
        estimatedTime: 25
      },
      {
        title: 'How to deploy on Netlify, Vercel, GitHub Pages',
        slug: 'deploy-netlify-vercel-github-pages',
        content: `# Deployment Options

Deploy your React app to various platforms.

## Netlify

1. Build your app: \`npm run build\`
2. Drag \`dist\` folder to Netlify
3. Or connect GitHub repo for auto-deploy

## Vercel

1. Install Vercel CLI: \`npm i -g vercel\`
2. Run \`vercel\` in project directory
3. Follow prompts

## GitHub Pages

1. Install gh-pages: \`npm install --save-dev gh-pages\`
2. Add to package.json:
\`\`\`json
"homepage": "https://username.github.io/repo-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
\`\`\`
3. Run \`npm run deploy\`

## Practice Exercise

Deploy your app:
1. Choose a platform
2. Build and deploy
3. Test live site`,
        isPractice: false,
        estimatedTime: 20
      },
      {
        title: 'Build for production: npm run build',
        slug: 'build-production-npm-run-build',
        content: `# Production Build

Create an optimized production build of your React app.

## Build Command

\`\`\`bash
npm run build
\`\`\`

## What Happens

- Minifies code
- Optimizes assets
- Creates production bundle
- Outputs to \`dist\` or \`build\` folder

## Build Output

\`\`\`
dist/
  index.html
  assets/
    index-[hash].js
    index-[hash].css
\`\`\`

## Practice Exercise

Create production build:
1. Run build command
2. Check output folder
3. Test locally
4. Deploy`,
        isPractice: false,
        estimatedTime: 10
      },
      {
        title: 'Deploy a project online',
        slug: 'deploy-project-online',
        content: `# Exercise: Deploy Project

Deploy your React project to the internet.

## Steps

1. **Build**: \`npm run build\`
2. **Choose Platform**: Netlify, Vercel, or GitHub Pages
3. **Deploy**: Upload or connect repo
4. **Test**: Visit your live URL

## Checklist

- [ ] Project builds successfully
- [ ] All assets load correctly
- [ ] Routes work properly
- [ ] Environment variables set
- [ ] Domain configured (optional)

## Practice

Complete the exercise:
1. Build your project
2. Deploy to platform
3. Share your live URL
4. Test all features`,
        isPractice: true,
        estimatedTime: 30
      }
    ]
  },
  {
    moduleTitle: 'Capstone Project',
    lessons: [
      {
        title: 'Choose 1 simple app to build (Todo List, Weather App, Notes App, Blog frontend)',
        slug: 'choose-simple-app-build',
        content: `# Capstone Project: Choose Your App

Select one of these projects to build:

## Option 1: Todo List

Features:
- Add/remove todos
- Mark as complete
- Filter todos
- Local storage persistence

## Option 2: Weather App

Features:
- Search by city
- Display current weather
- Show forecast
- Use weather API

## Option 3: Notes App

Features:
- Create/edit notes
- Delete notes
- Search notes
- Save to localStorage

## Option 4: Blog Frontend

Features:
- List posts
- View single post
- Navigation
- Responsive design

## Practice

Choose and build:
1. Select your project
2. Plan features
3. Build step by step
4. Deploy when done`,
        isPractice: true,
        estimatedTime: 120
      },
      {
        title: 'Apply everything from routing to forms to hooks',
        slug: 'apply-everything-routing-forms-hooks',
        content: `# Apply All Concepts

Use everything you've learned in your capstone project.

## Concepts to Apply

-  Components and Props
-  useState for state management
-  useEffect for side effects
-  Forms and controlled inputs
-  React Router for navigation
-  Context API for global state
-  Custom hooks for reusable logic
-  API integration
-  Deployment

## Project Checklist

- [ ] Multiple components
- [ ] State management
- [ ] Form handling
- [ ] Routing (if multi-page)
- [ ] API calls (if needed)
- [ ] Error handling
- [ ] Loading states
- [ ] Responsive design

## Practice

Build your capstone:
1. Apply all concepts
2. Follow best practices
3. Test thoroughly
4. Deploy and share`,
        isPractice: true,
        estimatedTime: 180
      }
    ]
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Get course IDs
    const [vueCourse] = await pool.execute('SELECT id FROM courses WHERE course_id = ?', ['vue']);
    const [reactCourse] = await pool.execute('SELECT id FROM courses WHERE course_id = ?', ['react']);
    
    const vueCourseId = vueCourse[0].id;
    const reactCourseId = reactCourse[0].id;
    
    // Seed Vue lessons
    for (const moduleData of vueLessons) {
      const [modules] = await pool.execute(
        'SELECT id FROM modules WHERE title = ? AND course_id = ?',
        [moduleData.moduleTitle, vueCourseId]
      );
      
      if (modules.length === 0) continue;
      const moduleId = modules[0].id;
      
      for (const lesson of moduleData.lessons) {
        const [existing] = await pool.execute(
          'SELECT id FROM lessons WHERE slug = ? AND module_id = ?',
          [lesson.slug, moduleId]
        );
        
        if (existing.length > 0) {
          // Update existing
          await pool.execute(
            'UPDATE lessons SET title = ?, content = ?, is_practice = ?, estimated_time = ? WHERE id = ?',
            [lesson.title, lesson.content, lesson.isPractice || false, lesson.estimatedTime || 5, existing[0].id]
          );
          
          // Update sub-items
          if (lesson.children) {
            await pool.execute('DELETE FROM lesson_subitems WHERE lesson_id = ?', [existing[0].id]);
            for (let i = 0; i < lesson.children.length; i++) {
              await pool.execute(
                'INSERT INTO lesson_subitems (lesson_id, title, order_index) VALUES (?, ?, ?)',
                [existing[0].id, lesson.children[i], i]
              );
            }
          }
        } else {
          // Insert new
          const [result] = await pool.execute(
            'INSERT INTO lessons (module_id, title, slug, content, is_practice, estimated_time) VALUES (?, ?, ?, ?, ?, ?)',
            [moduleId, lesson.title, lesson.slug, lesson.content, lesson.isPractice || false, lesson.estimatedTime || 5]
          );
          
          // Insert sub-items
          if (lesson.children) {
            for (let i = 0; i < lesson.children.length; i++) {
              await pool.execute(
                'INSERT INTO lesson_subitems (lesson_id, title, order_index) VALUES (?, ?, ?)',
                [result.insertId, lesson.children[i], i]
              );
            }
          }
        }
      }
    }
    
    // Seed React lessons (similar process)
    for (const moduleData of reactLessons) {
      const [modules] = await pool.execute(
        'SELECT id FROM modules WHERE title = ? AND course_id = ?',
        [moduleData.moduleTitle, reactCourseId]
      );
      
      if (modules.length === 0) continue;
      const moduleId = modules[0].id;
      
      for (const lesson of moduleData.lessons) {
        const [existing] = await pool.execute(
          'SELECT id FROM lessons WHERE slug = ? AND module_id = ?',
          [lesson.slug, moduleId]
        );
        
        if (existing.length > 0) {
          await pool.execute(
            'UPDATE lessons SET title = ?, content = ?, is_practice = ?, estimated_time = ? WHERE id = ?',
            [lesson.title, lesson.content, lesson.isPractice || false, lesson.estimatedTime || 5, existing[0].id]
          );
        } else {
          await pool.execute(
            'INSERT INTO lessons (module_id, title, slug, content, is_practice, estimated_time) VALUES (?, ?, ?, ?, ?, ?)',
            [moduleId, lesson.title, lesson.slug, lesson.content, lesson.isPractice || false, lesson.estimatedTime || 5]
          );
        }
      }
    }
    
    console.log('✅ Database seeding completed!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => {
      console.log('Seeding finished');
      process.exit(0);
    })
    .catch(error => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}

export { seedDatabase };

