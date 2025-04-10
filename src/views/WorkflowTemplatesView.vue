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
        <h1 class="text-lg font-semibold text-gray-800">工作流模板</h1>
      </div>
      <div class="flex gap-3">
        <button class="rounded-full p-2 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button class="rounded-full p-2 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>
    </header>
    
    <!-- 分类标签 -->
    <div class="px-4 py-2 border-b overflow-x-auto flex gap-2">
      <button class="whitespace-nowrap px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
        全部
      </button>
      <button class="whitespace-nowrap px-3 py-1.5 text-gray-500 rounded-full text-sm">
        数据处理
      </button>
      <button class="whitespace-nowrap px-3 py-1.5 text-gray-500 rounded-full text-sm">
        AI 模型
      </button>
      <button class="whitespace-nowrap px-3 py-1.5 text-gray-500 rounded-full text-sm">
        网络爬虫
      </button>
      <button class="whitespace-nowrap px-3 py-1.5 text-gray-500 rounded-full text-sm">
        内容生成
      </button>
    </div>
    
    <!-- 模板列表 -->
    <div class="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">
      <!-- 网络爬虫分类 -->
      <div>
        <h2 class="text-lg font-medium mb-3">网络爬虫</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- 模板卡片 1 -->
          <div class="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
               @click="useTemplate('web-crawler')">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium">网页爬虫</h3>
                <p class="text-xs text-gray-500">适用于网站内容抓取和分析</p>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-3">可快速配置对目标网站的数据获取，支持动态渲染和翻页</p>
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-1">
                <div class="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div class="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="w-6 h-6 rounded-full bg-yellow-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <span class="text-xs text-gray-500 ml-1">5 个节点</span>
              </div>
              <span class="text-xs text-gray-500">使用次数：319</span>
            </div>
          </div>
          
          <!-- 模板卡片 2 -->
          <div class="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
               @click="useTemplate('data-transform')">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium">数据转换</h3>
                <p class="text-xs text-gray-500">适用于数据格式转换与处理</p>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-3">将数据从一种格式转换为另一种格式，支持JSON、CSV、XML等</p>
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-1">
                <div class="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div class="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                  </svg>
                </div>
                <div class="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <span class="text-xs text-gray-500 ml-1">7 个节点</span>
              </div>
              <span class="text-xs text-gray-500">使用次数：245</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- AI 模型分类 -->
      <div>
        <h2 class="text-lg font-medium mb-3">AI 模型</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- 模板卡片 3 -->
          <div class="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
               @click="useTemplate('text-generation')">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
                <img src="https://unpkg.com/lucide-static@latest/icons/brain.svg" class="w-5 h-5 text-indigo-600" alt="文本生成">
              </div>
              <div>
                <h3 class="font-medium">AI 文本生成器</h3>
                <p class="text-xs text-gray-500">基于 LLM 的智能文本生成</p>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-3">根据提示生成高质量文本内容，支持多种 LLM 模型</p>
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-1">
                <div class="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center">
                  <img src="https://unpkg.com/lucide-static@latest/icons/text.svg" class="w-3 h-3 text-indigo-600" alt="节点">
                </div>
                <div class="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center">
                  <img src="https://unpkg.com/lucide-static@latest/icons/brain.svg" class="w-3 h-3 text-indigo-600" alt="节点">
                </div>
                <div class="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center">
                  <img src="https://unpkg.com/lucide-static@latest/icons/file-text.svg" class="w-3 h-3 text-indigo-600" alt="节点">
                </div>
                <span class="text-xs text-gray-500 ml-1">3 个节点</span>
              </div>
              <span class="text-xs text-gray-500">使用次数：412</span>
            </div>
          </div>
          
          <!-- 模板卡片 4 -->
          <div class="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
               @click="useTemplate('content-analyzer')">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                <img src="https://unpkg.com/lucide-static@latest/icons/file-search.svg" class="w-5 h-5 text-purple-600" alt="内容分析">
              </div>
              <div>
                <h3 class="font-medium">内容分析器</h3>
                <p class="text-xs text-gray-500">文本内容智能分析</p>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-3">分析文本内容，提取关键信息、情感和主题</p>
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-1">
                <div class="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center">
                  <img src="https://unpkg.com/lucide-static@latest/icons/file-input.svg" class="w-3 h-3 text-purple-600" alt="节点">
                </div>
                <div class="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center">
                  <img src="https://unpkg.com/lucide-static@latest/icons/brain.svg" class="w-3 h-3 text-purple-600" alt="节点">
                </div>
                <div class="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center">
                  <img src="https://unpkg.com/lucide-static@latest/icons/bar-chart.svg" class="w-3 h-3 text-purple-600" alt="节点">
                </div>
                <span class="text-xs text-gray-500 ml-1">4 个节点</span>
              </div>
              <span class="text-xs text-gray-500">使用次数：284</span>
            </div>
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
      <button class="p-2 flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
        <span class="text-xs text-primary-600 mt-1">模板</span>
      </button>
      <button class="p-2 flex flex-col items-center" @click="goToComponents">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <span class="text-xs text-gray-400 mt-1">组件</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'

const router = useRouter()

// 返回上一页
const goBack = () => {
  router.go(-1)
}

// 使用模板
const useTemplate = (templateId: string) => {
  const workflowId = uuidv4()
  console.log(`使用模板 ${templateId} 创建工作流`)
  router.push(`/workflow/editor/${workflowId}?template=${templateId}`)
}

// 导航到首页
const goToHome = () => {
  router.push('/')
}

// 导航到工作流页面
const goToWorkflows = () => {
  router.push('/workflow')
}

// 导航到组件页面
const goToComponents = () => {
  router.push('/workflow/components')
}
</script> 