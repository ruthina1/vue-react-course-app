/*
  MAIN.JS - Vue Application Entry Point
  ======================================
  
  This is the entry point of our Vue application. Think of it as the "main" function
  that starts everything.
  
  Key Concepts:
  - createApp(): Creates a new Vue application instance
  - .use(): Registers plugins (like Vue Router, Pinia for state management)
  - .mount(): Attaches the Vue app to an HTML element (in this case, #app)
*/

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/css/main.css' // Import Tailwind CSS

// Create a Pinia instance for state management
// Pinia is Vue 3's official state management library (replacement for Vuex)
const pinia = createPinia()

// Create the Vue application instance
// createApp() is a function that returns an app instance
const app = createApp(App)

// Register plugins
// Plugins extend Vue's functionality
app.use(pinia)  // Enable state management
app.use(router) // Enable routing

// Mount the app to the DOM
// This connects our Vue app to the <div id="app"></div> in index.html
app.mount('#app')

