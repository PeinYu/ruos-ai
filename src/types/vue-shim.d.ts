declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 为Vue和Vue Router模块提供声明
declare module 'vue' {
  export * from '@vue/runtime-dom'
}

declare module 'vue-router' {
  export * from 'vue-router/dist/vue-router'
} 