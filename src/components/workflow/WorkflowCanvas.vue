<template>
  <div class="workflow-canvas w-full h-full flex flex-col">
    <!-- 工具栏 -->
    <div class="bg-gray-50 border-b py-2 px-4 flex gap-3 overflow-x-auto">
      <button class="rounded-md p-1.5 hover:bg-gray-100" title="添加节点" @click="toggleNodePanel">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <button class="rounded-md p-1.5 hover:bg-gray-100" title="撤销" @click="onUndo" :disabled="!canUndo">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" :class="canUndo ? '' : 'opacity-50'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h10a4 4 0 0 1 0 8H9" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 15l-3-3 3-3" />
        </svg>
      </button>
      <button class="rounded-md p-1.5 hover:bg-gray-100" title="重做" @click="onRedo" :disabled="!canRedo">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" :class="canRedo ? '' : 'opacity-50'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 10H11a4 4 0 0 0 0 8h4" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 15l3-3-3-3" />
        </svg>
      </button>
      <div class="h-6 w-px bg-gray-300 mx-1"></div>
      <button class="rounded-md p-1.5 hover:bg-gray-100" title="放大" @click="onZoomIn">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3h-6" />
        </svg>
      </button>
      <button class="rounded-md p-1.5 hover:bg-gray-100" title="缩小" @click="onZoomOut">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
        </svg>
      </button>
      <button class="rounded-md p-1.5 hover:bg-gray-100" title="重置视图" @click="onFitView">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </button>
      <div class="h-6 w-px bg-gray-300 mx-1"></div>
      <button class="rounded-md px-2 py-1 text-xs bg-primary-100 text-primary-700 flex items-center" @click="onAutoLayout">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        自动排列
      </button>
      <div class="flex-1"></div>
      <button 
        v-if="!isExecuting" 
        class="px-3 py-1.5 rounded-md bg-primary-600 text-white text-sm flex items-center"
        @click="onExecuteWorkflow"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        运行
      </button>
      <button 
        v-else 
        class="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm flex items-center"
        @click="onStopExecution"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        停止
      </button>
    </div>
    
    <div class="flex-1 overflow-hidden flex">
      <!-- 节点面板 (条件显示) -->
      <div 
        v-if="showNodePanel" 
        class="node-panel w-64 bg-gray-50 border-r overflow-y-auto"
      >
        <div class="p-3">
          <div class="text-sm font-medium text-gray-500 mb-2">节点分类</div>
          <div class="space-y-1.5 mb-4">
            <button 
              v-for="category in nodeCategories" 
              :key="category.id"
              class="w-full text-left p-2 rounded-lg text-sm flex items-center"
              :class="selectedCategory === category.id ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-100'"
              @click="selectCategory(category.id)"
            >
              <img :src="`https://unpkg.com/lucide-static@latest/icons/${category.icon}.svg`" class="w-4 h-4 mr-2" :alt="category.name">
              {{ category.name }}
            </button>
          </div>
          
          <div class="text-sm font-medium text-gray-500 mb-2">{{ selectedCategoryName }}</div>
          <div class="grid grid-cols-2 gap-2">
            <div 
              v-for="template in filteredTemplates" 
              :key="template.id"
              class="p-2 bg-white rounded-lg border border-gray-200 text-xs shadow-sm flex flex-col items-center cursor-move" 
              draggable="true"
              @dragstart="onDragStart($event, template.id)"
            >
              <img :src="`https://unpkg.com/lucide-static@latest/icons/${template.icon}.svg`" class="w-6 h-6 mb-1" :alt="template.name">
              <span>{{ template.name }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 工作流画布 -->
      <div class="flex-1 flex">
        <VueFlow
          v-model="elements"
          class="workflow-bg"
          :default-viewport="{ x: 0, y: 0, zoom: 1 }"
          :default-edges="[]"
          :default-nodes="[]"
          :node-types="nodeTypes"
          :min-zoom="0.2"
          :max-zoom="4"
          fit-view-on-init
          @drag-over="onDragOver"
          @drop="onDrop"
          @connect="onConnect"
          @node-click="onNodeClick"
          @edge-click="onEdgeClick"
          @pane-click="onPaneClick"
        >
          <template #node-base="nodeProps">
            <BaseNode
              :id="nodeProps.id"
              :node-data="nodeProps.data"
              :selected="selectedNode === nodeProps.id"
              :is-executing="executingNodeId === nodeProps.id"
              :show-close-button="true"
              @click="selectNode(nodeProps.id)"
              @connect="onNodeConnectStart"
              @remove="removeNode(nodeProps.id)"
            />
          </template>
          
          <Background pattern-color="#f1f1f1" gap="20" size="1" />
          <Controls />
          <MiniMap height="100" width="160" />
          
          <!-- 动态动画效果 -->
          <template v-if="isExecuting && executionPath.length > 0">
            <div
              v-for="(edge, index) in executionPath"
              :key="`flow-${index}`"
              class="execution-token" 
              :style="getExecutionTokenStyle(edge)"
            ></div>
          </template>
        </VueFlow>
      </div>
      
      <!-- 属性面板 -->
      <div 
        v-if="selectedNode && !showNodePanel" 
        class="property-panel w-72 border-l bg-white overflow-y-auto"
      >
        <div class="p-4 border-b flex justify-between items-center">
          <div>
            <h2 class="text-lg font-medium">节点属性</h2>
            <p class="text-sm text-gray-500">配置当前选中的节点</p>
          </div>
          <button class="p-1.5 rounded-full hover:bg-gray-100" @click="closePropertyPanel">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-4 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">节点名称</label>
            <input type="text" v-model="selectedNodeData.label" class="w-full p-2 border rounded-md" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">描述</label>
            <textarea v-model="selectedNodeData.description" class="w-full p-2 border rounded-md h-20"></textarea>
          </div>
          
          <!-- 各种节点的特定设置可以在这里动态显示 -->
          
          <div class="flex justify-end gap-2 mt-6">
            <button class="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 text-sm" @click="closePropertyPanel">
              取消
            </button>
            <button class="px-3 py-1.5 rounded-md bg-primary-600 text-white text-sm" @click="updateNodeData">
              应用
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
// 导入Vue Flow核心组件和类型
import * as VueFlowCore from '@vue-flow/core';
import { VueFlow, useVueFlow, MarkerType } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';
import { Controls } from '@vue-flow/controls';
import { useWorkflowStore, NodeType } from '../../store/modules/workflow';
import BaseNode from './BaseNode.vue';
import { v4 as uuidv4 } from 'uuid';
import dagre from 'dagre';

// 节点类型映射
const nodeTypes = {
  base: BaseNode,
  [NodeType.DATA_PROCESS]: BaseNode,
  [NodeType.DATA_INPUT]: BaseNode,
  [NodeType.DATA_OUTPUT]: BaseNode,
  [NodeType.CONTROL_FLOW]: BaseNode,
  [NodeType.LLM]: BaseNode,
  [NodeType.TOOL]: BaseNode,
};

// 工作流状态
const workflowStore = useWorkflowStore();
const elements = ref({
  nodes: [] as VueFlowCore.Node[],
  edges: [] as VueFlowCore.Edge[],
});

// Vue Flow实例
const { 
  onConnect: onConnectFlow, 
  zoomIn, 
  zoomOut, 
  fitView,
  canUndo,
  canRedo,
  undo,
  redo,
} = useVueFlow({
  nodes: elements.value.nodes,
  edges: elements.value.edges,
  onNodesChange: (changes) => {
    // 当节点变化时更新
    if (workflowStore.activeWorkflow) {
      workflowStore.activeWorkflow.nodes = elements.value.nodes;
    }
  },
  onEdgesChange: (changes) => {
    // 当边变化时更新
    if (workflowStore.activeWorkflow) {
      workflowStore.activeWorkflow.edges = elements.value.edges;
    }
  },
});

// 节点面板状态
const showNodePanel = ref(false);
const selectedCategory = ref('base');
const nodeCategories = computed(() => workflowStore.nodeCategories);

// 节点模板
const filteredTemplates = computed(() => {
  return workflowStore.getTemplatesByCategory(selectedCategory.value);
});

const selectedCategoryName = computed(() => {
  const category = nodeCategories.value.find(c => c.id === selectedCategory.value);
  return category ? category.name : '';
});

// 属性面板状态
const selectedNode = ref<string | null>(null);
const selectedNodeData = ref<any>({
  label: '',
  description: '',
});

// 执行状态
const isExecuting = ref(false);
const executingNodeId = ref<string | null>(null);
const executionPath = ref<VueFlowCore.Edge[]>([]);

// 页面初始化
onMounted(() => {
  // 初始化节点模板
  workflowStore.initNodeTemplates();
  
  // 加载或创建工作流
  const workflow = workflowStore.createWorkflow('新工作流');
  if (workflow) {
    elements.value.nodes = workflow.nodes;
    elements.value.edges = workflow.edges;
  }
});

// 观察activeWorkflow的变化，同步到elements
watch(() => workflowStore.activeWorkflow, (newWorkflow) => {
  if (newWorkflow) {
    elements.value.nodes = newWorkflow.nodes;
    elements.value.edges = newWorkflow.edges;
  }
}, { deep: true });

// 选择节点分类
const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId;
};

// 开始拖动节点
const onDragStart = (event: DragEvent, nodeType: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }
};

// 拖动悬停
const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
};

// 放置节点
const onDrop = (event: any) => {
  const nodeType = event.dataTransfer?.getData('application/vueflow');
  if (nodeType && workflowStore.activeWorkflow) {
    const position = {
      // 纵向布局优先
      x: event.position.x,
      y: event.position.y
    };
    
    const newNode = workflowStore.addNode(nodeType, position);
    if (newNode) {
      elements.value.nodes = [...elements.value.nodes, newNode];
      selectNode(newNode.id);
    }
  }
};

// 连接节点
const onConnect = (connection: VueFlowCore.Connection) => {
  if (workflowStore.activeWorkflow) {
    const edge = workflowStore.connectNodes(
      connection.source, 
      connection.target,
      connection.sourceHandle,
      connection.targetHandle
    );
    
    if (edge) {
      elements.value.edges = [...elements.value.edges, edge];
    }
  }
};

// 节点点击
const onNodeClick = ({ node }: { node: VueFlowCore.Node }) => {
  selectNode(node.id);
};

// 边点击
const onEdgeClick = ({ edge }: { edge: VueFlowCore.Edge }) => {
  // TODO: 实现边的配置
  console.log('Edge clicked:', edge);
};

// 空白处点击
const onPaneClick = () => {
  closePropertyPanel();
};

// 选择节点
const selectNode = (nodeId: string) => {
  selectedNode.value = nodeId;
  
  // 获取节点数据
  const node = elements.value.nodes.find(n => n.id === nodeId);
  if (node && node.data) {
    selectedNodeData.value = { ...node.data };
  }
};

// 开始节点连接
const onNodeConnectStart = (nodeId: string, handleType: 'input' | 'output') => {
  // 这个功能依赖Vue Flow内部实现，这里仅占位
  console.log(`Start connection from ${nodeId} ${handleType}`);
};

// 移除节点
const removeNode = (nodeId: string) => {
  workflowStore.removeNode(nodeId);
  
  // 更新视图
  elements.value.nodes = elements.value.nodes.filter(n => n.id !== nodeId);
  elements.value.edges = elements.value.edges.filter(
    e => e.source !== nodeId && e.target !== nodeId
  );
  
  if (selectedNode.value === nodeId) {
    selectedNode.value = null;
  }
};

// 关闭属性面板
const closePropertyPanel = () => {
  selectedNode.value = null;
};

// 更新节点数据
const updateNodeData = () => {
  if (selectedNode.value) {
    // 查找并更新节点
    const nodeIndex = elements.value.nodes.findIndex(n => n.id === selectedNode.value);
    if (nodeIndex !== -1) {
      const updatedNode = {
        ...elements.value.nodes[nodeIndex],
        data: {
          ...elements.value.nodes[nodeIndex].data,
          label: selectedNodeData.value.label,
          description: selectedNodeData.value.description,
        }
      };
      
      // 更新节点数组
      elements.value.nodes = [
        ...elements.value.nodes.slice(0, nodeIndex),
        updatedNode,
        ...elements.value.nodes.slice(nodeIndex + 1)
      ];
      
      // 同步到store
      if (workflowStore.activeWorkflow) {
        workflowStore.activeWorkflow.nodes = elements.value.nodes;
        workflowStore.activeWorkflow.updatedAt = new Date();
      }
    }
  }
};

// 自动布局
const onAutoLayout = () => {
  if (elements.value.nodes.length === 0) return;
  
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'TB' }); // TB = top to bottom (竖向布局)
  
  // 添加节点
  elements.value.nodes.forEach(node => {
    dagreGraph.setNode(node.id, { width: 180, height: 80 });
  });
  
  // 添加边
  elements.value.edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
  
  // 计算布局
  dagre.layout(dagreGraph);
  
  // 更新节点位置
  const newNodes = elements.value.nodes.map(node => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 90, // 中心点偏移
        y: nodeWithPosition.y - 40,
      },
    };
  });
  
  elements.value.nodes = newNodes;
  
  // 同步到store
  if (workflowStore.activeWorkflow) {
    workflowStore.activeWorkflow.nodes = newNodes;
    workflowStore.activeWorkflow.updatedAt = new Date();
  }
  
  // 调整视图
  setTimeout(() => {
    fitView({ padding: 0.2 });
  }, 10);
};

// 执行工作流
const onExecuteWorkflow = async () => {
  if (!workflowStore.activeWorkflow || elements.value.nodes.length === 0) return;
  
  isExecuting.value = true;
  workflowStore.startWorkflowExecution();
  
  // 寻找入口节点(通常是没有输入边的节点)
  const incomingEdges = new Map<string, number>();
  
  elements.value.edges.forEach(edge => {
    const count = incomingEdges.get(edge.target) || 0;
    incomingEdges.set(edge.target, count + 1);
  });
  
  // 找到没有输入的节点作为起点
  const startNodes = elements.value.nodes.filter(node => !incomingEdges.has(node.id));
  
  if (startNodes.length === 0) {
    console.error('找不到工作流起点');
    isExecuting.value = false;
    workflowStore.stopWorkflowExecution();
    return;
  }
  
  // 模拟执行工作流
  await executeNodeChain(startNodes[0].id);
  
  // 执行完成
  isExecuting.value = false;
  workflowStore.stopWorkflowExecution();
};

// 执行节点链
const executeNodeChain = async (nodeId: string, depth = 0) => {
  if (depth > 50 || !isExecuting.value) return; // 防止无限循环
  
  executingNodeId.value = nodeId;
  workflowStore.executeNode(nodeId);
  
  // 模拟节点执行时间
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 找到当前节点的所有输出边
  const outgoingEdges = elements.value.edges.filter(edge => edge.source === nodeId);
  
  // 准备执行路径动画
  executionPath.value = outgoingEdges;
  
  // 如果有下一个节点，继续执行
  for (const edge of outgoingEdges) {
    await showEdgeAnimation(edge, 500);
    await executeNodeChain(edge.target, depth + 1);
  }
  
  executingNodeId.value = null;
};

// 显示边动画
const showEdgeAnimation = async (edge: VueFlowCore.Edge, duration: number) => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

// 获取执行令牌样式
const getExecutionTokenStyle = (edge: VueFlowCore.Edge) => {
  // 在实际实现中，这里需要根据edgeId查找DOM元素位置计算样式
  // 这里仅做示例
  return {
    top: '0px',
    left: '0px',
    width: '10px',
    height: '10px',
  };
};

// 停止执行
const onStopExecution = () => {
  isExecuting.value = false;
  executingNodeId.value = null;
  executionPath.value = [];
  workflowStore.stopWorkflowExecution();
};

// 放大
const onZoomIn = () => {
  zoomIn({ duration: 300 });
};

// 缩小
const onZoomOut = () => {
  zoomOut({ duration: 300 });
};

// 适应视图
const onFitView = () => {
  fitView({ padding: 0.2, duration: 300 });
};

// 显示/隐藏节点面板
const toggleNodePanel = () => {
  showNodePanel.value = !showNodePanel.value;
};

// 撤销/重做
const onUndo = () => {
  undo();
};

const onRedo = () => {
  redo();
};
</script>

<style scoped>
.workflow-bg {
  background-color: #f8f8f8;
}

.execution-token {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--color-primary-500, #6366f1);
  animation: moveAlong 1s linear;
  z-index: 10;
}

@keyframes moveAlong {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.8;
  }
}
</style> 