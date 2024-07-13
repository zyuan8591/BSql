import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import CleanCss from 'vite-plugin-clean-css'
import Pages from 'vite-plugin-pages'
// import vueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
    Pages({
      importMode: 'async',
      dirs: [
        {
          dir: resolve(__dirname, './src/pages'),
          baseRoute: ''
        }
      ]
    }),
    Layouts(),
    CleanCss()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
