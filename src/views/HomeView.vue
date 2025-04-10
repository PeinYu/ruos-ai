<template>
  <div class="min-h-screen flex flex-col pb-16">
    <!-- 页头 -->
    <header class="bg-white p-4 flex items-center justify-between border-b sticky top-0 z-10">
      <div>
        <h1 class="text-xl font-semibold">RuosAI</h1>
        <p class="text-xs text-gray-500">智能工作流助手</p>
      </div>
      <div class="flex items-center">
        <button class="p-2 rounded-full hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="8" r="2"/>
            <path d="M12 14h.01"/>
          </svg>
        </button>
      </div>
    </header>
    
    <!-- 主内容 -->
    <div class="flex-1 p-4 space-y-6">
      <!-- 快速创建 -->
      <div>
        <h2 class="font-medium mb-3">快速创建</h2>
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-white rounded-lg border shadow-sm p-4 flex flex-col items-center" @click="goToWorkflows">
            <div class="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="7" height="7" x="3" y="3" rx="1"/>
                <rect width="7" height="7" x="14" y="3" rx="1"/>
                <rect width="7" height="7" x="14" y="14" rx="1"/>
                <rect width="7" height="7" x="3" y="14" rx="1"/>
              </svg>
            </div>
            <span class="text-sm">创建工作流</span>
          </div>
          
          <div class="bg-white rounded-lg border shadow-sm p-4 flex flex-col items-center" @click="goToTemplates">
            <div class="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="16" height="16" x="4" y="4" rx="2"/>
                <rect width="4" height="4" x="9" y="9" rx="0.5"/>
                <path d="M15 2v4"/>
                <path d="M8 2v4"/>
                <path d="M9 15h6"/>
              </svg>
            </div>
            <span class="text-sm">使用模板</span>
          </div>
          
          <div class="bg-white rounded-lg border shadow-sm p-4 flex flex-col items-center" @click="createChatWorkflow">
            <div class="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/>
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
              </svg>
            </div>
            <span class="text-sm">聊天创建</span>
          </div>
          
          <div class="bg-white rounded-lg border shadow-sm p-4 flex flex-col items-center" @click="goToComponents">
            <div class="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
                <polyline points="7.5 19.79 7.5 14.6 3 12"/>
                <polyline points="21 12 16.5 14.6 16.5 19.79"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" x2="12" y1="22.08" y2="12"/>
              </svg>
            </div>
            <span class="text-sm">浏览组件</span>
          </div>
        </div>
      </div>
      
      <!-- 最近使用 -->
      <div>
        <div class="flex justify-between items-center mb-3">
          <h2 class="font-medium">最近使用</h2>
          <button class="text-xs text-primary-600" @click="goToWorkflows">查看全部</button>
        </div>
        
        <div class="space-y-3">
          <div class="bg-white rounded-lg border shadow-sm overflow-hidden" @click="openWorkflow('1')">
            <div class="p-4 flex items-center gap-4">
              <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" x2="22" y1="12" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold">网页爬取工作流</h3>
                <p class="text-xs text-gray-500">最近更新: 今天 12:30</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>
          
          <div class="bg-white rounded-lg border shadow-sm overflow-hidden" @click="openWorkflow('3')">
            <div class="p-4 flex items-center gap-4">
              <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.96-4.03A2.5 2.5 0 0 1 9.5 2Z"/>
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.96-4.03A2.5 2.5 0 0 0 14.5 2Z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold">AI内容生成器</h3>
                <p class="text-xs text-gray-500">最近更新: 3天前</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 推荐模板 -->
      <div>
        <div class="flex justify-between items-center mb-3">
          <h2 class="font-medium">推荐模板</h2>
          <button class="text-xs text-primary-600" @click="goToTemplates">查看全部</button>
        </div>
        
        <div class="bg-white rounded-lg border shadow-sm overflow-hidden" @click="useTemplate('api-crawler')">
          <div class="p-4 flex items-center gap-4">
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
                <line x1="8" x2="8.01" y1="16" y2="16"/>
                <line x1="8" x2="8.01" y1="20" y2="20"/>
                <line x1="12" x2="12.01" y1="18" y2="18"/>
                <line x1="12" x2="12.01" y1="22" y2="22"/>
                <line x1="16" x2="16.01" y1="16" y2="16"/>
                <line x1="16" x2="16.01" y1="20" y2="20"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold">API 数据爬取器</h3>
              <p class="text-xs text-gray-500">适用于各类 REST API 数据获取</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部导航栏 -->
    <BottomNavbar />
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import BottomNavbar from '../components/workflow/BottomNavbar.vue'

const router = useRouter()

// 导航功能
const goToWorkflows = () => {
  router.push('/workflow')
}

const goToTemplates = () => {
  router.push('/workflow/templates')
}

const goToComponents = () => {
  router.push('/workflow/components')
}

const createChatWorkflow = () => {
  const id = uuidv4()
  router.push(`/workflow/chat/${id}`)
}

const openWorkflow = (id: string) => {
  router.push(`/workflow/editor/${id}`)
}

const useTemplate = (templateId: string) => {
  const id = uuidv4()
  router.push(`/workflow/editor/${id}?template=${templateId}`)
}
</script> 