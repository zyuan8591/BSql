import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { createRouter, createWebHistory } from 'vue-router'

import liffInit from '@/plugin/liffInit'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (_to, _from, next) => {
  await liffInit()
  next()
})

export default router
