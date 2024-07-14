<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { computed } from 'vue'

import Loading from './components/Loading.vue'

const isShowDevtools = computed(() => import.meta.env.DEV)
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route" />
  </router-view>
  <VueQueryDevtools v-if="isShowDevtools" />
  <Loading />
</template>
