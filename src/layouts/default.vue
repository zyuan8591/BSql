<script setup lang="ts">
import Header from '@/components/templates/Header.vue'
</script>

<template>
  <div class="min-h-screen px-4 pt-[calc(var(--header-height)_+_10px)]">
    <Header />
    <RouterView />
  </div>
</template>
