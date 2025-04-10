<template>
  <div class="min-h-screen flex flex-col pb-16">
    <!-- 页头 -->
    <header class="bg-white p-4 flex items-center justify-between border-b sticky top-0 z-10">
      <h1 class="text-xl font-semibold">我的工作流</h1>
      <div class="flex items-center">
        <button class="p-2 rounded-full hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
        </button>
        <button class="p-2 rounded-full hover:bg-gray-100 ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v8"/>
            <path d="M8 12h8"/>
          </svg>
        </button>
      </div>
    </header>
    
    <!-- 过滤标签 -->
    <div class="px-4 py-3 bg-white flex gap-4 overflow-x-auto border-b">
      <button class="px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium">
        全部
      </button>
      <button class="px-4 py-2 rounded-full text-gray-600 text-sm hover:bg-gray-100">
        最近使用
      </button>
      <button class="px-4 py-2 rounded-full text-gray-600 text-sm hover:bg-gray-100">
        已收藏
      </button>
      <button class="px-4 py-2 rounded-full text-gray-600 text-sm hover:bg-gray-100">
        已归档
      </button>
    </div>
    
    <!-- 新建工作流按钮 -->
    <div class="p-4">
      <button @click="createNewWorkflow" class="w-full btn bg-primary-500 text-white py-3 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 5v14"/>
          <path d="M5 12h14"/>
        </svg>
        新建工作流
      </button>
    </div>
    
    <!-- 工作流列表 -->
    <div class="flex-1 p-4 space-y-4">
      <div v-for="workflow in workflows" :key="workflow.id" class="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div class="p-4 flex items-center gap-4">
          <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <svg v-if="workflow.icon === 'globe'" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" x2="22" y1="12" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <svg v-else-if="workflow.icon === 'file-json'" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
              <path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"/>
              <path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"/>
            </svg>
            <svg v-else-if="workflow.icon === 'brain'" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.96-4.03A2.5 2.5 0 0 1 9.5 2Z"/>
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.96-4.03A2.5 2.5 0 0 0 14.5 2Z"/>
            </svg>
            <svg v-else-if="workflow.icon === 'image'" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
            <svg v-else-if="workflow.icon === 'bar-chart'" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" x2="12" y1="20" y2="10"/>
              <line x1="18" x2="18" y1="20" y2="4"/>
              <line x1="6" x2="6" y1="20" y2="16"/>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="font-semibold">{{ workflow.name }}</h3>
            <p class="text-xs text-gray-500">最近更新: {{ workflow.updatedAt }}</p>
          </div>
          <button @click.stop="openWorkflow(workflow.id)" class="p-2 text-primary-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- 底部导航栏 -->
    <BottomNavbar />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import BottomNavbar from '../components/workflow/BottomNavbar.vue'

const router = useRouter()

interface Workflow {
  id: string
  name: string
  icon: string
  updatedAt: string
}

const workflows = ref<Workflow[]>([
  {
    id: '1',
    name: '网页爬取工作流',
    icon: 'globe',
    updatedAt: '今天 12:30'
  },
  {
    id: '2',
    name: '数据格式转换',
    icon: 'file-json',
    updatedAt: '昨天'
  },
  {
    id: '3',
    name: 'AI内容生成器',
    icon: 'brain',
    updatedAt: '3天前'
  },
  {
    id: '4',
    name: '批量图像处理',
    icon: 'image',
    updatedAt: '上周'
  },
  {
    id: '5',
    name: '销售数据分析',
    icon: 'bar-chart',
    updatedAt: '2周前'
  }
])

// 创建新工作流
const createNewWorkflow = () => {
  const id = uuidv4()
  router.push(`/workflow/editor/${id}`)
}

// 打开工作流
const openWorkflow = (id: string) => {
  router.push(`/workflow/editor/${id}`)
}
</script> 