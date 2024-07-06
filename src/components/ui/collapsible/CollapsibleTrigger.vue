<script setup lang="ts">
import { CollapsibleTrigger, type CollapsibleTriggerProps } from 'radix-vue'

const props = defineProps<CollapsibleTriggerProps>()
</script>

<template>
  <CollapsibleTrigger v-bind="props" class="w-full text-start focus:outline-none">
    <slot />
  </CollapsibleTrigger>
</template>
