<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)
</script>

<template>
  <header class="center fixed left-0 top-0 h-header w-full gap-2 p-2 backdrop-blur-sm">
    <i class="nes-icon coin m-0 scale-150 p-3"></i>
    <div class="relative">
      <h1 class="relative z-10 font-kong text-2xl text-yellow">BSql.app</h1>
      <h1 class="absolute left-1 top-1 font-kong text-2xl text-popover">BSql.app</h1>
    </div>
    <Avatar class="absolute right-4">
      <AvatarImage :src="userInfo.pictureUrl" alt="avatar" />
      <AvatarFallback>BSql</AvatarFallback>
    </Avatar>
  </header>
</template>
