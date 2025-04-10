<template>
  <div class="min-h-screen flex flex-col">
    <!-- 顶部导航 -->
    <header class="glass rounded-t-lg p-4 flex justify-between items-center sticky top-0 z-10 bg-white border-b">
      <div class="flex items-center gap-3">
        <button class="p-2 rounded-full hover:bg-gray-100" @click="goBack">
          <img src="https://unpkg.com/lucide-static@latest/icons/arrow-left.svg" class="w-5 h-5" alt="返回">
        </button>
        <h1 class="text-lg font-semibold text-gray-800">智能体工作流聊天</h1>
      </div>
      <div class="flex gap-2">
        <button class="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 text-sm flex items-center" @click="clearChat">
          <img src="https://unpkg.com/lucide-static@latest/icons/trash-2.svg" class="w-4 h-4 mr-1" alt="清空">
          清空聊天
        </button>
        <button class="p-2 rounded-full hover:bg-gray-100">
          <img src="https://unpkg.com/lucide-static@latest/icons/settings.svg" class="w-5 h-5" alt="设置">
        </button>
      </div>
    </header>
    
    <!-- 聊天界面 -->
    <div class="flex-1 overflow-hidden">
      <ChatInterface ref="chatInterface" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ChatInterface from '../components/workflow/ChatInterface.vue'

const router = useRouter()
const route = useRoute()
const chatInterface = ref<InstanceType<typeof ChatInterface> | null>(null)

// 返回工作流列表
const goBack = () => {
  router.push('/workflow')
}

// 清空聊天
const clearChat = () => {
  // 这里应该实现清空聊天的逻辑
  if (chatInterface.value) {
    // 实际组件中需要添加清空方法
    console.log('清空聊天')
  }
}
</script>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
}
</style> 