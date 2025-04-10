<template>
  <div class="min-h-screen flex flex-col">
    <!-- 顶部导航 -->
    <header class="glass rounded-t-lg p-4 flex justify-between items-center sticky top-0 z-10">
      <div class="flex items-center gap-2">
        <button class="p-2 rounded-full hover:bg-gray-100" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 class="text-lg font-semibold text-gray-800">组件库</h1>
      </div>
      <div class="flex gap-3">
        <button class="rounded-full p-2 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button class="rounded-full p-2 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </header>
    
    <!-- 组件分类列表 -->
    <div class="flex-1 overflow-y-auto bg-gray-50">
      <!-- 基础节点 -->
      <div class="p-4 border-b">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 class="font-medium">基础节点</h2>
          </div>
          <button class="p-1 rounded-md hover:bg-gray-100" @click="toggleCategory('basic')">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                :d="expandedCategories.basic ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'" 
              />
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-2 gap-3" v-if="expandedCategories.basic">
          <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/activity.svg" class="w-5 h-5 text-blue-600" alt="触发器">
            </div>
            <span class="text-xs">触发器</span>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/filter.svg" class="w-5 h-5 text-blue-600" alt="过滤器">
            </div>
            <span class="text-xs">过滤器</span>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/code.svg" class="w-5 h-5 text-blue-600" alt="代码">
            </div>
            <span class="text-xs">代码</span>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/function-square.svg" class="w-5 h-5 text-blue-600" alt="函数">
            </div>
            <span class="text-xs">函数</span>
          </div>
        </div>
      </div>
      
      <!-- 处理数据节点 -->
      <div class="p-4 border-b">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 class="font-medium">处理数据节点</h2>
          </div>
          <button class="p-1 rounded-md hover:bg-gray-100" @click="toggleCategory('processing')">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                :d="expandedCategories.processing ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'" 
              />
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-2 gap-3" v-if="expandedCategories.processing">
          <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/filter.svg" class="w-5 h-5 text-green-600" alt="过滤">
            </div>
            <span class="text-xs">数据过滤</span>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/move.svg" class="w-5 h-5 text-green-600" alt="转换">
            </div>
            <span class="text-xs">数据转换</span>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/combine.svg" class="w-5 h-5 text-green-600" alt="合并">
            </div>
            <span class="text-xs">数据合并</span>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/split.svg" class="w-5 h-5 text-green-600" alt="分割">
            </div>
            <span class="text-xs">数据分割</span>
          </div>
        </div>
      </div>
      
      <!-- 数据输入节点 -->
      <div class="p-4 border-b">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 class="font-medium">数据输入节点</h2>
          </div>
          <button class="p-1 rounded-md hover:bg-gray-100" @click="toggleCategory('input')">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                :d="expandedCategories.input ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'" 
              />
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-2 gap-3" v-if="expandedCategories.input">
          <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/file-text.svg" class="w-5 h-5 text-purple-600" alt="文本">
            </div>
            <span class="text-xs">文本输入</span>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/file-json.svg" class="w-5 h-5 text-purple-600" alt="JSON">
            </div>
            <span class="text-xs">JSON输入</span>
          </div>
        </div>
      </div>
      
      <!-- 数据输出节点 -->
      <div class="p-4 border-b">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 class="font-medium">数据输出节点</h2>
          </div>
          <button class="p-1 rounded-md hover:bg-gray-100" @click="toggleCategory('output')">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                :d="expandedCategories.output ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'" 
              />
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-2 gap-3" v-if="expandedCategories.output">
          <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center mb-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/save.svg" class="w-5 h-5 text-yellow-600" alt="保存">
            </div>
            <span class="text-xs">文件保存</span>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center mb-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/database.svg" class="w-5 h-5 text-yellow-600" alt="数据库">
            </div>
            <span class="text-xs">数据库存储</span>
          </div>
        </div>
      </div>
      
      <!-- 控制流节点 -->
      <div class="p-4 border-b">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
            <h2 class="font-medium">控制流节点</h2>
          </div>
          <button class="p-1 rounded-md hover:bg-gray-100" @click="toggleCategory('control')">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                :d="expandedCategories.control ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'" 
              />
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-2 gap-3" v-if="expandedCategories.control">
          <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/git-fork.svg" class="w-5 h-5 text-orange-600" alt="条件">
            </div>
            <span class="text-xs">条件分支</span>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/repeat.svg" class="w-5 h-5 text-orange-600" alt="循环">
            </div>
            <span class="text-xs">循环</span>
          </div>
        </div>
      </div>
      
      <!-- 大模型节点 -->
      <div class="p-4 border-b">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 class="font-medium">大模型节点</h2>
          </div>
          <button class="p-1 rounded-md hover:bg-gray-100" @click="toggleCategory('ai')">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                :d="expandedCategories.ai ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'" 
              />
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-2 gap-3" v-if="expandedCategories.ai">
          <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/message-square.svg" class="w-5 h-5 text-indigo-600" alt="生成">
            </div>
            <span class="text-xs">文本生成</span>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/file-search.svg" class="w-5 h-5 text-indigo-600" alt="分析">
            </div>
            <span class="text-xs">内容分析</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部导航 -->
    <div class="px-2 py-3 bg-white border-t flex justify-around">
      <button class="p-2 flex flex-col items-center" @click="goToHome">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="text-xs text-gray-400 mt-1">首页</span>
      </button>
      <button class="p-2 flex flex-col items-center" @click="goToWorkflows">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span class="text-xs text-gray-400 mt-1">工作流</span>
      </button>
      <button class="p-2 flex flex-col items-center" @click="goToTemplates">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
        <span class="text-xs text-gray-400 mt-1">模板</span>
      </button>
      <button class="p-2 flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <span class="text-xs text-primary-600 mt-1">组件</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 分类展开状态
const expandedCategories = ref({
  basic: true,
  processing: true,
  input: false,
  output: false,
  control: false,
  ai: false,
  tools: false
})

// 切换分类展开状态
const toggleCategory = (category: keyof typeof expandedCategories.value) => {
  expandedCategories.value[category] = !expandedCategories.value[category]
}

// 返回上一页
const goBack = () => {
  router.go(-1)
}

// 导航到首页
const goToHome = () => {
  router.push('/')
}

// 导航到工作流页面
const goToWorkflows = () => {
  router.push('/workflow')
}

// 导航到模板页面
const goToTemplates = () => {
  router.push('/workflow/templates')
}
</script> 