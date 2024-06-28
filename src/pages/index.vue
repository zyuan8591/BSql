<script setup lang="ts">
import { onMounted } from 'vue'

import useReadRTDB from '@/composables/useReadRTDB'

onMounted(async () => {
  try {
    const res = await useReadRTDB('/assets/setting')
    console.log(res)
  } catch (e) {
    console.log(e)
  }
})
</script>
<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
</template>
