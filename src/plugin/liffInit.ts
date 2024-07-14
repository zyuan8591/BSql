import liff from '@line/liff'

import { useAuthStore } from '@/store/auth'

export default async function liffInit() {
  await liff
    .init({
      liffId: import.meta.env.VITE_APP_LIFF_ID,
      withLoginOnExternalBrowser: true // Enable automatic login process
    })
    .then(async () => {
      const authStore = useAuthStore()
      const profile = await liff.getProfile()
      authStore.$patch({ userInfo: profile })
    })
    .catch((error) => {
      console.log('error', error)
    })
}
