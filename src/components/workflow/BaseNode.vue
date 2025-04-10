<template>
  <div 
    :class="[
      'workflow-node relative glass rounded-lg p-3 shadow-md',
      isExecuting ? 'border-2 border-primary-500 animate-pulse bg-primary-50' : '',
      isSelected ? 'border-2 border-primary-400' : 'border border-gray-200'
    ]"
    @click="onNodeClick"
  >
    <!-- 节点头部 -->
    <div class="flex items-center gap-2 mb-2">
      <div class="w-6 h-6 rounded-full" :class="iconBgColor">
        <img 
          :src="`https://unpkg.com/lucide-static@latest/icons/${nodeData.icon}.svg`" 
          class="w-4 h-4 m-1" 
          :class="iconColor" 
          :alt="nodeData.label"
        >
      </div>
      <span class="font-medium text-sm">{{ nodeData.label }}</span>
      <div class="ml-auto">
        <button 
          v-if="showCloseButton" 
          @click.stop="onRemoveNode" 
          class="p-1 rounded-full hover:bg-gray-100"
        >
          <img src="https://unpkg.com/lucide-static@latest/icons/x.svg" class="w-3 h-3 text-gray-500" alt="关闭">
        </button>
      </div>
    </div>
    
    <!-- 节点内容 -->
    <div class="text-xs text-gray-500">{{ nodeData.description }}</div>
    
    <!-- 输入和输出句柄 -->
    <div class="flex justify-between mt-2 relative">
      <!-- 输入句柄 -->
      <div 
        v-if="!hideInput"
        :class="[
          'handle-input w-3 h-3 rounded-full cursor-pointer absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2', 
          isExecuting ? 'bg-primary-500' : 'bg-gray-400 hover:bg-primary-500'
        ]"
        @mousedown.stop="onConnectStart('input')"
      ></div>
      
      <!-- 输出句柄 -->
      <div 
        v-if="!hideOutput"
        :class="[
          'handle-output w-3 h-3 rounded-full cursor-pointer absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2', 
          isExecuting ? 'bg-primary-500' : 'bg-gray-400 hover:bg-primary-500'
        ]"
        @mousedown.stop="onConnectStart('output')"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface NodeData {
  label: string;
  description: string;
  template: string;
  icon: string;
}

const props = defineProps<{
  id: string;
  nodeData: NodeData; 
  selected?: boolean;
  isExecuting?: boolean;
  hideInput?: boolean;
  hideOutput?: boolean;
  showCloseButton?: boolean;
}>();

const emit = defineEmits<{
  (e: 'click', id: string): void;
  (e: 'connect', id: string, handleType: 'input' | 'output'): void;
  (e: 'remove', id: string): void;
}>();

const isSelected = computed(() => props.selected || false);

// 根据节点类型生成不同的样式
const iconBgColor = computed(() => {
  const type = props.nodeData.template;
  switch (type) {
    case 'trigger':
      return 'bg-primary-100';
    case 'filter':
    case 'transform':
    case 'analyze':
      return 'bg-green-100';
    case 'http-request':
    case 'database-input':
      return 'bg-blue-100';
    case 'file-output':
    case 'database-output':
      return 'bg-purple-100';
    case 'if-condition':
    case 'loop':
      return 'bg-yellow-100';
    case 'llm-completion':
    case 'llm-embedding':
      return 'bg-indigo-100';
    case 'search-tool':
    case 'calculator':
      return 'bg-orange-100';
    default:
      return 'bg-gray-100';
  }
});

const iconColor = computed(() => {
  const type = props.nodeData.template;
  switch (type) {
    case 'trigger':
      return 'text-primary-600';
    case 'filter':
    case 'transform':
    case 'analyze':
      return 'text-green-600';
    case 'http-request':
    case 'database-input':
      return 'text-blue-600';
    case 'file-output':
    case 'database-output':
      return 'text-purple-600';
    case 'if-condition':
    case 'loop':
      return 'text-yellow-600';
    case 'llm-completion':
    case 'llm-embedding':
      return 'text-indigo-600';
    case 'search-tool':
    case 'calculator':
      return 'text-orange-600';
    default:
      return 'text-gray-600';
  }
});

// 节点点击事件
const onNodeClick = () => {
  emit('click', props.id);
};

// 开始连线事件
const onConnectStart = (handleType: 'input' | 'output') => {
  emit('connect', props.id, handleType);
};

// 移除节点
const onRemoveNode = () => {
  emit('remove', props.id);
};
</script>

<style scoped>
.workflow-node {
  min-width: 180px;
  transition: all 0.2s ease;
  user-select: none;
}

.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style> 