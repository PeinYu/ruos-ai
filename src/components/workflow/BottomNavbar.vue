<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center p-2 z-10">
    <router-link to="/" class="flex flex-col items-center p-2 text-xs">
      <div class="w-6 h-6 mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </div>
      <span>首页</span>
    </router-link>
    
    <router-link to="/workflow" class="flex flex-col items-center p-2 text-xs">
      <div class="w-6 h-6 mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
          <rect width="7" height="7" x="3" y="3" rx="1"/>
          <rect width="7" height="7" x="14" y="3" rx="1"/>
          <rect width="7" height="7" x="14" y="14" rx="1"/>
          <rect width="7" height="7" x="3" y="14" rx="1"/>
        </svg>
      </div>
      <span>工作流</span>
    </router-link>
    
    <router-link to="/workflow/templates" class="flex flex-col items-center p-2 text-xs">
      <div class="w-6 h-6 mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
          <rect width="16" height="16" x="4" y="4" rx="2"/>
          <rect width="4" height="4" x="9" y="9" rx="0.5"/>
          <path d="M15 2v4"/>
          <path d="M8 2v4"/>
          <path d="M9 15h6"/>
        </svg>
      </div>
      <span>模板</span>
    </router-link>
    
    <router-link to="/workflow/components" class="flex flex-col items-center p-2 text-xs">
      <div class="w-6 h-6 mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
          <polyline points="7.5 19.79 7.5 14.6 3 12"/>
          <polyline points="21 12 16.5 14.6 16.5 19.79"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" x2="12" y1="22.08" y2="12"/>
        </svg>
      </div>
      <span>组件</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style scoped>
.router-link-active {
  color: var(--color-primary-600);
}
</style> 