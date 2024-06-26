/// <reference types="vite/client" />

// https://blog.csdn.net/m0_46170663/article/details/129948013
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
