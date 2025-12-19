import { ref } from 'vue'

// Helper to slugify text
const generateSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-')   // Replace multiple - with single -
}

// Transform items to include slugs
const transformModules = (modules) => {
    return modules.map(module => ({
        ...module,
        items: module.items.map(item => ({
            ...item,
            slug: generateSlug(item.text)
        }))
    }))
}

const vueModulesRaw = [
    {
        title: "Web Fundamentals (Prerequisite)",
        description: "Before diving into Vue.js, ensure you have a solid foundation in web development basics.",
        items: [
            { text: "HTML basics", isPractice: false },
            { text: "CSS basics (Flexbox, Grid)", isPractice: false },
            {
                text: "JavaScript (ES6+)",
                isPractice: false,
                children: ["let / const", "Arrow functions", "Destructuring", "Modules", "Promises & async/await"]
            }
        ]
    },
    {
        title: "Vue Basics",
        description: "Get started with Vue.js fundamentals and project structure.",
        items: [
            { text: "What is Vue & how it works", isPractice: false },
            { text: "Creating a Vue app", isPractice: false },
            { text: "Vue project structure", isPractice: false },
            {
                text: "Single File Components (SFC)",
                isPractice: false,
                children: ["<template>", "<script setup>", "<style>"]
            }
        ]
    },
    {
        title: "Template Syntax",
        description: "Learn how to write Vue templates and use directives.",
        items: [
            { text: "Text interpolation {{ }}", isPractice: false },
            {
                text: "Directives",
                isPractice: false,
                children: ["v-if, v-else", "v-for", "v-show"]
            },
            { text: "Event handling @click", isPractice: false },
            { text: "Attribute binding :class, :style", isPractice: false },
            { text: "Two-way binding v-model", isPractice: false }
        ]
    },
    {
        title: "Reactivity System",
        description: "Understand Vue's powerful reactivity system.",
        items: [
            { text: "ref() and reactive()", isPractice: false },
            { text: "Computed properties", isPractice: false },
            { text: "Watchers (watch, watchEffect)", isPractice: false },
            {
                text: "Lifecycle hooks",
                isPractice: false,
                children: ["onMounted", "onUpdated", "onUnmounted"]
            }
        ]
    },
    {
        title: "Components",
        description: "Master component-based architecture in Vue.",
        items: [
            { text: "Creating components", isPractice: false },
            { text: "Props", isPractice: false },
            { text: "Emits", isPractice: false },
            { text: "Slots", isPractice: false },
            { text: "Dynamic components", isPractice: false },
            { text: "Component registration", isPractice: false }
        ]
    },
    {
        title: "Forms & User Input",
        description: "Handle user input and form validation effectively.",
        items: [
            { text: "Handling forms", isPractice: false },
            { text: "Input validation", isPractice: false },
            { text: "Custom input components", isPractice: false },
            { text: "v-model with components", isPractice: false }
        ]
    },
    {
        title: "Vue Router",
        description: "Implement navigation and routing in your Vue applications.",
        items: [
            { text: "Routing basics", isPractice: false },
            { text: "Route params & query", isPractice: false },
            { text: "Nested routes", isPractice: false },
            { text: "Navigation guards", isPractice: false },
            { text: "Lazy loading routes", isPractice: false }
        ]
    },
    {
        title: "State Management",
        description: "Manage application state with Pinia.",
        items: [
            { text: "Pinia basics", isPractice: false },
            { text: "Store state", isPractice: false },
            { text: "Getters", isPractice: false },
            { text: "Actions", isPractice: false },
            { text: "Store modules", isPractice: false },
            { text: "Persisting state", isPractice: false }
        ]
    },
    {
        title: "API Integration",
        description: "Connect your Vue app to backend services.",
        items: [
            { text: "Fetch / Axios", isPractice: false },
            { text: "Async data handling", isPractice: false },
            { text: "Loading & error states", isPractice: false },
            { text: "Environment variables", isPractice: false },
            { text: "Authentication basics", isPractice: false }
        ]
    },
    {
        title: "Composables",
        description: "Create reusable composition functions.",
        items: [
            { text: "Creating composables", isPractice: false },
            { text: "Reusing logic", isPractice: false },
            { text: "Separation of concerns", isPractice: false },
            { text: "Best practices", isPractice: false }
        ]
    },
    {
        title: "Styling & UI",
        description: "Style your Vue applications beautifully.",
        items: [
            { text: "Scoped styles", isPractice: false },
            { text: "CSS Modules", isPractice: false },
            { text: "CSS preprocessors (SCSS)", isPractice: false },
            { text: "UI frameworks (Vuetify, Element Plus, Naive UI)", isPractice: false },
            { text: "Responsive design", isPractice: false }
        ]
    },
    {
        title: "Testing",
        description: "Ensure code quality with comprehensive testing.",
        items: [
            { text: "Unit testing with Vitest", isPractice: false },
            { text: "Component testing", isPractice: false },
            { text: "Mocking APIs", isPractice: false },
            { text: "Basic E2E testing (Cypress / Playwright)", isPractice: false }
        ]
    },
    {
        title: "Performance & Optimization",
        description: "Optimize your Vue applications for production.",
        items: [
            { text: "Code splitting", isPractice: false },
            { text: "Lazy loading components", isPractice: false },
            { text: "Memoization", isPractice: false },
            { text: "Devtools usage", isPractice: false }
        ]
    },
    {
        title: "Build & Deployment",
        description: "Prepare and deploy your Vue applications.",
        items: [
            { text: "Vite", isPractice: false },
            { text: "Environment configs", isPractice: false },
            { text: "Production builds", isPractice: false },
            { text: "Deployment (Netlify, Vercel, etc.)", isPractice: false }
        ]
    },
    {
        title: "Advanced Topics",
        description: "Explore advanced Vue.js concepts and patterns.",
        items: [
            { text: "Server-Side Rendering (Nuxt)", isPractice: false },
            { text: "Static Site Generation", isPractice: false },
            { text: "Internationalization (i18n)", isPractice: false },
            { text: "Accessibility (a11y)", isPractice: false },
            { text: "Security best practices", isPractice: false }
        ]
    },
    {
        title: "Ecosystem & Tooling",
        description: "Familiarize yourself with Vue's ecosystem and development tools.",
        items: [
            { text: "Vue Devtools", isPractice: false },
            { text: "ESLint & Prettier", isPractice: false },
            { text: "Git basics", isPractice: false },
            { text: "Project structure conventions", isPractice: false }
        ]
    },
    {
        title: "Final Step: Build & Practice",
        description: "The best way to solidify your Vue.js knowledge is through hands-on practice.",
        items: [
            { text: "Build real projects", isPractice: true },
            { text: "Read open-source Vue code", isPractice: true },
            { text: "Refactor and improve existing apps", isPractice: true }
        ]
    }
]

const reactModulesRaw = [
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
]

const resourcesRaw = [
    {
        id: 1,
        title: 'Vue Components',
        description: 'Ready-to-use Vue components with detailed explanations. Learn by example.',
        category: 'Components',
        icon: '⚡',
        topics: ['vue'],
        link: 'https://vuejs.org/guide/essentials/component-basics.html'
    },
    {
        id: 2,
        title: 'React Patterns',
        description: 'Modern React patterns and best practices. Hooks, Context, and more.',
        category: 'Patterns',
        icon: '🎯',
        topics: ['react'],
        link: 'https://react.dev/learn'
    },
    {
        id: 3,
        title: 'Interactive Lessons',
        description: 'Step-by-step tutorials with code examples. Build real projects.',
        category: 'Lessons',
        icon: '📚',
        topics: ['vue', 'react']
    },
    {
        id: 4,
        title: 'State Management',
        description: 'Learn Pinia (Vue) and Redux (React). Manage complex application state.',
        category: 'State',
        icon: '🗄️',
        topics: ['vue', 'react'],
        link: 'https://pinia.vuejs.org/'
    },
    {
        id: 5,
        title: 'Routing',
        description: 'Vue Router and React Router. Navigate between pages seamlessly.',
        category: 'Navigation',
        icon: '🧭',
        topics: ['vue', 'react'],
        link: 'https://router.vuejs.org/'
    },
    {
        id: 6,
        title: 'Animations',
        description: 'Smooth transitions and animations. GSAP, Framer Motion, and CSS.',
        category: 'Animations',
        icon: '✨',
        topics: ['vue', 'react'],
        link: 'https://vuejs.org/guide/extras/animation.html'
    }
]

export function useCourseData() {
    const vueModules = ref(transformModules(vueModulesRaw))
    const reactModules = ref(transformModules(reactModulesRaw))
    const resources = ref(resourcesRaw)

    const getModule = (courseId) => {
        return courseId === 'vue' ? vueModules.value : reactModules.value
    }

    const getLesson = (courseId, lessonId) => {
        const modules = getModule(courseId)
        for (const module of modules) {
            const item = module.items.find(i => i.slug === lessonId)
            if (item) return item
        }
        return null
    }

    const getResources = (topic = 'all') => {
        if (topic === 'all') return resources.value
        return resources.value.filter(resource => resource.topics.includes(topic))
    }

    return {
        vueModules,
        reactModules,
        resources,
        getModule,
        getLesson,
        getResources
    }
}
