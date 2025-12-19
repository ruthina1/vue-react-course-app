<!--
  REACTVIEW.VUE - React Course Page
  =================================
  
  This view displays the React-specific content.
-->

<template>
  <div class="min-h-screen">
    <!-- Navigation Component -->
    <Navigation />
    
    <!-- Hero Section -->
    <HeroSection 
      badgeText="🎓 Learn React"
      title="React Ecosystem"
      subtitle="A JavaScript Library for Building UIs"
      description="Deep dive into React 18, Hooks, Context, and Redux. Build modern, interactive web applications with the most popular library."
      :stats="reactStats"
    />
    
    <!-- Roadmap Section -->
    <CourseRoadmap 
      title="React Learning Roadmap"
      description="Master React through practical, hands-on modules."
      :modules="reactModules"
    />
    
    <!-- Resources Section -->
    <ResourcesSection topic="react" />
    
    <!-- Showcase Section -->
    <ShowcaseSection />
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navigation from '../components/Navigation.vue'
import HeroSection from '../components/HeroSection.vue'
import ResourcesSection from '../components/ResourcesSection.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import Footer from '../components/Footer.vue'
import CourseRoadmap from '../components/CourseRoadmap.vue'

const reactStats = ref([
  { value: '40+', label: 'Patterns' },
  { value: '80+', label: 'Lessons' },
  { value: '700+', label: 'Students' }
])

const reactModules = ref([
  {
    title: "Components",
    description: "Learn the building blocks of React applications.",
    items: [
      { text: "Functional vs. Class Components (focus on functional)", isPractice: false },
      { text: "How to return JSX", isPractice: false },
      { text: "Nesting components", isPractice: false },
      { text: "Reusability", isPractice: false },
      { text: "Build a UserCard component and render multiple cards", isPractice: true },
      { text: "What are props?", isPractice: false },
      { text: "Passing data to components", isPractice: false },
      { text: "Using props in child components", isPractice: false },
      { text: "Pass props like name, age, image to UserCard", isPractice: true }
    ]
  },
  {
    title: "State & useState Hook",
    description: "Manage component-level state and handle events.",
    items: [
      { text: "useState explained", isPractice: false },
      { text: "Handling click events", isPractice: false },
      { text: "Updating and reading state", isPractice: false },
      { text: "Create a counter or like button with useState", isPractice: true },
      { text: "Rendering lists with .map()", isPractice: false },
      { text: "Keys in React", isPractice: false },
      { text: "Create a TodoList from an array of todos", isPractice: true }
    ]
  },
  {
    title: "Conditional Rendering",
    description: "Control what gets displayed based on state.",
    items: [
      { text: "if vs ternary (? :)", isPractice: false },
      { text: "Showing/hiding elements", isPractice: false },
      { text: "&& short-circuit", isPractice: false },
      { text: "Show 'No tasks left' when todo list is empty", isPractice: true },
      { text: "Controlled inputs (value, onChange)", isPractice: false },
      { text: "Handling submit events", isPractice: false },
      { text: "Local state for form data", isPractice: false },
      { text: "Build a signup form", isPractice: true }
    ]
  },
  {
    title: "useEffect & Fetching Data",
    description: "Handle side effects and connect to APIs.",
    items: [
      { text: "Intro to useEffect", isPractice: false },
      { text: "Side effects in React", isPractice: false },
      { text: "Fetch data from an API", isPractice: false },
      { text: "Weather app or User fetcher", isPractice: true },
      { text: "What is client-side routing?", isPractice: false },
      { text: "Install React Router", isPractice: false },
      { text: "Create pages: Home, About, Contact", isPractice: true },
      { text: "<Link>, <Route>, <BrowserRouter>", isPractice: false },
      { text: "Build a small multi-page app", isPractice: true }
    ]
  },
  {
    title: "Lifting State Up",
    description: "Share state between components.",
    items: [
      { text: "Share state between components", isPractice: false },
      { text: "Pass state and handlers from parent to child", isPractice: false },
      { text: "Calculator with inputs and result display", isPractice: true }
    ]
  },
  {
    title: "Context API (Global State)",
    description: "Manage global application state without prop drilling.",
    items: [
      { text: "What is Context?", isPractice: false },
      { text: "React.createContext, Provider, useContext", isPractice: false },
      { text: "When to use Context vs props", isPractice: false },
      { text: "Theme toggler (light/dark) using Context API", isPractice: true }
    ]
  },
  {
    title: "Custom Hooks",
    description: "Reuse logic across components.",
    items: [
      { text: "What is a custom hook?", isPractice: false },
      { text: "Reusing logic across components", isPractice: false },
      { text: "Example: useForm, useFetch", isPractice: false },
      { text: "Convert your form logic to a custom useForm hook", isPractice: true },
      { text: "How to deploy on Netlify, Vercel, GitHub Pages", isPractice: false },
      { text: "Build for production: npm run build", isPractice: false },
      { text: "Deploy a project online", isPractice: true }
    ]
  },
  {
    title: "Capstone Project",
    description: "Apply your knowledge to build a real application.",
    items: [
      { text: "Choose 1 simple app to build (Todo List, Weather App, Notes App, Blog frontend)", isPractice: true },
      { text: "Apply everything from routing to forms to hooks", isPractice: true }
    ]
  }
])
</script>
