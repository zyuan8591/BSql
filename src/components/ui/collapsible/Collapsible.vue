<script setup lang="ts">
import { CollapsibleRoot, useForwardPropsEmits } from 'radix-vue'

import type { CollapsibleRootEmits, CollapsibleRootProps } from 'radix-vue'

const props = defineProps<CollapsibleRootProps>()
const emits = defineEmits<CollapsibleRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <CollapsibleRoot
    v-slot="{ open }"
    v-bind="forwarded"
    class="rounded-bl-md rounded-tr-md border-2 border-border bg-card p-4 outline outline-2 outline-ring transition-colors duration-200 ease-in-out hover:border-foreground hover:bg-card-hover hover:outline-border"
  >
    <slot :open="open" />
  </CollapsibleRoot>
</template>
