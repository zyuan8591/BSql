<script setup lang="ts">
import { useIsFetching } from '@tanstack/vue-query'

const isFetching = useIsFetching()
</script>
<template>
  <div v-if="isFetching" class="center fixed inset-0 z-50 bg-black/80">
    <span class="loader" />
  </div>
</template>
<style lang="scss" scoped>
.loader {
  @apply size-12 border-[5px] border-white border-b-[#e60012] rounded-full inline-block box-border;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
