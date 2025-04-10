<template>
  <div class="min-h-screen flex flex-col">
    <!-- 顶部导航 -->
    <header class="glass rounded-t-lg p-4 flex justify-between items-center sticky top-0 z-10 bg-white border-b">
      <div class="flex items-center gap-3">
        <button class="p-2 rounded-full hover:bg-gray-100" @click="goBack">
          <img src="https://unpkg.com/lucide-static@latest/icons/arrow-left.svg" class="w-5 h-5" alt="返回">
        </button>
        <h1 class="text-lg font-semibold text-gray-800">工作流编辑器</h1>
      </div>
      <div class="flex gap-2">
        <button class="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 text-sm flex items-center" @click="saveWorkflow">
          <img src="https://unpkg.com/lucide-static@latest/icons/save.svg" class="w-4 h-4 mr-1" alt="保存">
          保存
        </button>
        <button class="px-3 py-1.5 rounded-md bg-primary-600 text-white text-sm flex items-center" @click="runWorkflow">
          <img src="https://unpkg.com/lucide-static@latest/icons/play.svg" class="w-4 h-4 mr-1" alt="运行">
          运行
        </button>
        <button class="p-2 rounded-full hover:bg-gray-100" @click="showMoreOptions">
          <img src="https://unpkg.com/lucide-static@latest/icons/more-horizontal.svg" class="w-5 h-5" alt="更多">
        </button>
      </div>
    </header>
    
    <!-- 工具栏 -->
    <div class="flex bg-gray-50 border-b py-2 px-4 gap-3 overflow-x-auto">
      <button class="rounded-md p-1.5 hover:bg-gray-100">
        <img src="https://unpkg.com/lucide-static@latest/icons/plus.svg" class="w-5 h-5" alt="添加">
      </button>
      <button class="rounded-md p-1.5 hover:bg-gray-100">
        <img src="https://unpkg.com/lucide-static@latest/icons/undo.svg" class="w-5 h-5" alt="撤销">
      </button>
      <button class="rounded-md p-1.5 hover:bg-gray-100">
        <img src="https://unpkg.com/lucide-static@latest/icons/redo.svg" class="w-5 h-5" alt="重做">
      </button>
      <div class="h-6 w-px bg-gray-300 mx-1"></div>
      <button class="rounded-md p-1.5 hover:bg-gray-100">
        <img src="https://unpkg.com/lucide-static@latest/icons/zoom-in.svg" class="w-5 h-5" alt="放大">
      </button>
      <button class="rounded-md p-1.5 hover:bg-gray-100">
        <img src="https://unpkg.com/lucide-static@latest/icons/zoom-out.svg" class="w-5 h-5" alt="缩小">
      </button>
      <div class="h-6 w-px bg-gray-300 mx-1"></div>
      <button class="rounded-md px-2 py-1 text-xs bg-primary-100 text-primary-700 flex items-center">
        <img src="https://unpkg.com/lucide-static@latest/icons/clipboard-check.svg" class="w-4 h-4 mr-1" alt="自动排列">
        自动排列
      </button>
    </div>
    
    <!-- 工作流画布和侧边组件库 -->
    <div class="flex flex-1 overflow-hidden">
      <!-- 组件库侧边栏 -->
      <div class="w-64 bg-gray-50 border-r p-3 overflow-y-auto">
        <div class="text-sm font-medium text-gray-500 mb-2">组件类型</div>
        <div class="space-y-1.5 mb-4">
          <button class="w-full text-left p-2 rounded-lg text-sm bg-primary-50 text-primary-700 flex items-center">
            <img src="https://unpkg.com/lucide-static@latest/icons/box.svg" class="w-4 h-4 mr-2" alt="基础">
            基础节点
          </button>
          <button class="w-full text-left p-2 rounded-lg text-sm hover:bg-gray-100 flex items-center">
            <img src="https://unpkg.com/lucide-static@latest/icons/file-cog.svg" class="w-4 h-4 mr-2" alt="处理">
            处理数据节点
          </button>
          <button class="w-full text-left p-2 rounded-lg text-sm hover:bg-gray-100 flex items-center">
            <img src="https://unpkg.com/lucide-static@latest/icons/file-input.svg" class="w-4 h-4 mr-2" alt="输入">
            数据输入节点
          </button>
          <button class="w-full text-left p-2 rounded-lg text-sm hover:bg-gray-100 flex items-center">
            <img src="https://unpkg.com/lucide-static@latest/icons/file-output.svg" class="w-4 h-4 mr-2" alt="输出">
            数据输出节点
          </button>
          <button class="w-full text-left p-2 rounded-lg text-sm hover:bg-gray-100 flex items-center">
            <img src="https://unpkg.com/lucide-static@latest/icons/git-branch.svg" class="w-4 h-4 mr-2" alt="控制">
            控制流节点
          </button>
          <button class="w-full text-left p-2 rounded-lg text-sm hover:bg-gray-100 flex items-center">
            <img src="https://unpkg.com/lucide-static@latest/icons/brain.svg" class="w-4 h-4 mr-2" alt="大模型">
            大模型节点
          </button>
          <button class="w-full text-left p-2 rounded-lg text-sm hover:bg-gray-100 flex items-center">
            <img src="https://unpkg.com/lucide-static@latest/icons/tool.svg" class="w-4 h-4 mr-2" alt="工具">
            工具类节点
          </button>
        </div>
        
        <div class="text-sm font-medium text-gray-500 mb-2">基础节点</div>
        <div class="grid grid-cols-2 gap-2">
          <div class="p-2 bg-white rounded-lg border border-gray-200 text-xs shadow-sm flex flex-col items-center cursor-move" 
               draggable="true" @dragstart="onDragStart($event, 'trigger')">
            <img src="https://unpkg.com/lucide-static@latest/icons/activity.svg" class="w-6 h-6 mb-1" alt="触发器">
            <span>触发器</span>
          </div>
          <div class="p-2 bg-white rounded-lg border border-gray-200 text-xs shadow-sm flex flex-col items-center cursor-move"
               draggable="true" @dragstart="onDragStart($event, 'filter')">
            <img src="https://unpkg.com/lucide-static@latest/icons/filter.svg" class="w-6 h-6 mb-1" alt="过滤器">
            <span>过滤器</span>
          </div>
          <div class="p-2 bg-white rounded-lg border border-gray-200 text-xs shadow-sm flex flex-col items-center cursor-move"
               draggable="true" @dragstart="onDragStart($event, 'code')">
            <img src="https://unpkg.com/lucide-static@latest/icons/code.svg" class="w-6 h-6 mb-1" alt="代码">
            <span>代码</span>
          </div>
          <div class="p-2 bg-white rounded-lg border border-gray-200 text-xs shadow-sm flex flex-col items-center cursor-move"
               draggable="true" @dragstart="onDragStart($event, 'function')">
            <img src="https://unpkg.com/lucide-static@latest/icons/function-square.svg" class="w-6 h-6 mb-1" alt="函数">
            <span>函数</span>
          </div>
        </div>
      </div>
      
      <!-- 工作流画布 -->
      <div class="flex-1 bg-gray-100 relative overflow-auto" ref="canvasRef" 
           @dragover="onDragOver" @drop="onDrop" @click="onCanvasClick">
        <!-- 画布网格背景样式通过CSS设置 -->
        
        <!-- 示例节点 -->
        <div class="node absolute" style="top: 100px; left: 100px;" 
             @mousedown="startDrag($event, '1')" @click.stop="selectNode('1')">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
              <img src="https://unpkg.com/lucide-static@latest/icons/activity.svg" class="w-3 h-3 text-primary-600" alt="触发器">
            </div>
            <span class="font-medium text-sm">HTTP触发器</span>
          </div>
          <div class="text-xs text-gray-500">当接收到HTTP请求时触发工作流</div>
          <div class="flex justify-end mt-2">
            <div class="w-3 h-3 rounded-full bg-primary-500 cursor-pointer" 
                 @mousedown.stop="startDrawConnection($event, '1', 'output')"></div>
          </div>
        </div>
        
        <div class="node absolute" style="top: 100px; left: 350px;"
             @mousedown="startDrag($event, '2')" @click.stop="selectNode('2')">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <img src="https://unpkg.com/lucide-static@latest/icons/file-cog.svg" class="w-3 h-3 text-green-600" alt="处理">
            </div>
            <span class="font-medium text-sm">数据处理</span>
          </div>
          <div class="text-xs text-gray-500">处理HTTP请求数据</div>
          <div class="flex justify-between mt-2">
            <div class="w-3 h-3 rounded-full bg-primary-500 cursor-pointer"
                 @mousedown.stop="startDrawConnection($event, '2', 'input')"></div>
            <div class="w-3 h-3 rounded-full bg-primary-500 cursor-pointer"
                 @mousedown.stop="startDrawConnection($event, '2', 'output')"></div>
          </div>
        </div>
        
        <!-- 连接线 -->
        <div class="workflow-line" style="top: 132px; left: 180px; width: 170px; transform: rotate(0deg);"></div>
      </div>
      
      <!-- 右侧属性面板 -->
      <div class="w-72 border-l bg-white overflow-y-auto" v-if="selectedNode">
        <div class="p-4 border-b">
          <h2 class="text-lg font-medium">节点属性</h2>
          <p class="text-sm text-gray-500">配置当前选中的节点</p>
        </div>
        
        <div class="p-4 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">节点名称</label>
            <input type="text" class="input" value="HTTP触发器" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">请求路径</label>
            <input type="text" class="input" value="/api/trigger" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">HTTP方法</label>
            <select class="input">
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">描述</label>
            <textarea class="input h-20">当接收到HTTP请求时触发工作流</textarea>
          </div>
          
          <div class="flex justify-end gap-2 mt-6">
            <button class="btn btn-secondary">取消</button>
            <button class="btn btn-primary">应用</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWorkflowStore } from '../store/modules/workflow'
import WorkflowCanvas from '../components/workflow/WorkflowCanvas.vue'

const router = useRouter()
const route = useRoute()
const workflowStore = useWorkflowStore()
const workflowCanvas = ref<InstanceType<typeof WorkflowCanvas> | null>(null)

// 获取工作流ID
const workflowId = route.params.id as string

const canvasRef = ref<HTMLElement | null>(null)
const selectedNode = ref<string | null>('1') // 默认选中第一个节点用于演示
const isDragging = ref(false)
const currentNodeId = ref<string | null>(null)
const offset = ref({ x: 0, y: 0 })

// 返回工作流列表
const goBack = () => {
  router.push('/workflow')
}

// 保存工作流
const saveWorkflow = () => {
  if (workflowStore.activeWorkflow) {
    // 这里应该实现实际的保存逻辑，例如持久化到数据库
    console.log('保存工作流:', workflowStore.activeWorkflow.id)
  }
}

// 运行工作流
const runWorkflow = () => {
  if (workflowCanvas.value) {
    // 调用canvas组件的执行方法
    workflowCanvas.value.onExecuteWorkflow()
  }
}

// 显示更多选项
const showMoreOptions = () => {
  // 这里可以实现更多选项菜单，如导出、分享等
  console.log('显示更多选项')
}

// 开始拖动组件
const onDragStart = (event: DragEvent, nodeType: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('nodeType', nodeType)
  }
}

// 拖动悬停
const onDragOver = (event: DragEvent) => {
  event.preventDefault()
}

// 放置组件
const onDrop = (event: DragEvent) => {
  event.preventDefault()
  if (!event.dataTransfer) return
  
  const nodeType = event.dataTransfer.getData('nodeType')
  if (!nodeType || !canvasRef.value) return
  
  console.log(`放置了一个 ${nodeType} 节点在 x: ${event.offsetX}, y: ${event.offsetY}`)
  // 这里应该创建一个新节点并添加到画布
}

// 开始拖动节点
const startDrag = (event: MouseEvent, nodeId: string) => {
  event.preventDefault()
  
  isDragging.value = true
  currentNodeId.value = nodeId
  
  // 计算偏移量
  const target = event.currentTarget as HTMLElement
  if (target) {
    const rect = target.getBoundingClientRect()
    offset.value = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }
  
  // 添加鼠标移动和松开事件监听器
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

// 鼠标移动
const onMouseMove = (event: MouseEvent) => {
  if (!isDragging.value || !currentNodeId.value) return
  
  // 在这里更新节点位置
  console.log(`移动节点 ${currentNodeId.value} 到 x: ${event.clientX - offset.value.x}, y: ${event.clientY - offset.value.y}`)
}

// 鼠标松开
const onMouseUp = () => {
  isDragging.value = false
  currentNodeId.value = null
  
  // 移除事件监听器
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
}

// 选择节点
const selectNode = (nodeId: string) => {
  selectedNode.value = nodeId
}

// 画布点击
const onCanvasClick = () => {
  selectedNode.value = null
}

// 开始绘制连接线
const startDrawConnection = (event: MouseEvent, nodeId: string, portType: 'input' | 'output') => {
  event.stopPropagation()
  console.log(`开始从节点 ${nodeId} 的 ${portType} 端口绘制连接线`)
  // 这里应该实现连接线绘制逻辑
}

// 组件挂载
onMounted(() => {
  // 如果有workflowId，加载已有工作流
  if (workflowId && workflowId !== 'new') {
    workflowStore.loadWorkflow(workflowId)
  } else {
    // 创建新工作流
    workflowStore.createWorkflow('新工作流')
  }
})
</script>

<style scoped>
/* 画布背景网格 */
.bg-gray-100 {
  background-size: 20px 20px;
  background-image:
    linear-gradient(to right, #f1f1f1 1px, transparent 1px),
    linear-gradient(to bottom, #f1f1f1 1px, transparent 1px);
}

.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
}
</style> 