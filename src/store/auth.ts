import { defineStore } from 'pinia'
import { ref } from 'vue'

interface UserInfo {
  displayName: string
  pictureUrl: string
  userId: string
}

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref<UserInfo>({
    displayName: '',
    pictureUrl: '',
    userId: ''
  })

  return { userInfo }
})
