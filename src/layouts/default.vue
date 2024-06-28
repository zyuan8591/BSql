<script setup lang="ts">
import Header from '@/components/templates/Header.vue'
</script>

<template>
  <div class="min-h-screen bg-main_background pt-header">
    <Header />
    <RouterView />
  </div>
</template>
