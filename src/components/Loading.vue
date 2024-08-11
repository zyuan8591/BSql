<script setup lang="ts">
import { useIsFetching, useIsMutating } from '@tanstack/vue-query'
import { computed } from 'vue'

const isFetching = useIsFetching()
const isMutating = useIsMutating()

const isLoading = computed(() => {
  return !!isFetching.value || !!isMutating.value
})
</script>
<template>
  <div v-if="isLoading" class="center fixed inset-0 z-50 bg-black/80">
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
