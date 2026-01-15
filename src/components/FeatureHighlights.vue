<!--
  FEATUREHIGHLIGHTS.VUE - Feature Benefits Section
  =================================================
  
  Inspired by Osmo's "Build faster and better" section.
  Showcases key benefits of the course platform.
-->

<template>
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-black mb-4">
          Why Choose Our Platform
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          A comprehensive learning experience designed to accelerate your journey from beginner to professional developer.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <!-- Feature 1 -->
        <div class="group">
          <div class="mb-4 transition-transform duration-300 group-hover:scale-110">
            <Zap :size="48" class="text-orange-500" />
          </div>
          <h3 class="text-2xl font-bold text-black mb-3">
            Build faster and better
          </h3>
          <p class="text-gray-600 leading-relaxed text-lg">
            Our structured courses save you hours of searching for resources. Each lesson is crafted for real-world projects, so you can focus on building work that stands out.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="group">
          <div class="mb-4 transition-transform duration-300 group-hover:scale-110">
            <Target :size="48" class="text-pink-500" />
          </div>
          <h3 class="text-2xl font-bold text-black mb-3">
            Practice without compromise
          </h3>
          <p class="text-gray-600 leading-relaxed text-lg">
            These aren't just tutorials. Every lesson includes hands-on exercises and real projects, so you can apply what you learn immediately and build portfolio-worthy work.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="group">
          <div class="mb-4 transition-transform duration-300 group-hover:scale-110">
            <BookOpen :size="48" class="text-green-500" />
          </div>
          <h3 class="text-2xl font-bold text-black mb-3">
            Clear documentation
          </h3>
          <p class="text-gray-600 leading-relaxed text-lg">
            We don't skip the details. Every concept is explained clearly with well-documented code examples. You'll see exactly how it works, so you can understand, modify, and master it.
          </p>
        </div>

        <!-- Feature 4 -->
        <div class="group">
          <div class="mb-4 transition-transform duration-300 group-hover:scale-110">
            <Rocket :size="48" class="text-red-500" />
          </div>
          <h3 class="text-2xl font-bold text-black mb-3">
            A living and growing system
          </h3>
          <p class="text-gray-600 leading-relaxed text-lg">
            We continuously add new lessons, projects, and techniques. The platform evolves with the latest industry standards, so your skills never stop growing.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Zap, Target, BookOpen, Rocket } from 'lucide-vue-next'
</script>

<style scoped>
/* Scoped styles for feature highlights */
</style>
