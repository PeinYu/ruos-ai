<template>
  <div class="chat-interface h-full flex flex-col overflow-hidden">
    <!-- 聊天消息区域 -->
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- 欢迎消息 -->
      <div v-if="messages.length === 0" class="welcome-message flex flex-col items-center justify-center h-full text-center py-10">
        <img src="https://unpkg.com/lucide-static@latest/icons/workflow.svg" class="w-16 h-16 mb-4 text-primary-500" alt="欢迎">
        <h2 class="text-xl font-semibold mb-2">智能工作流助手</h2>
        <p class="text-gray-500 max-w-md mb-6">
          通过自然语言描述您的需求，我将自动为您创建智能工作流。例如："创建一个从网络获取数据并分析的工作流"
        </p>
        <div class="grid grid-cols-2 gap-3 w-full max-w-md">
          <button 
            v-for="(suggestion, index) in suggestions" 
            :key="index"
            class="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left text-sm border border-gray-200"
            @click="usePromptSuggestion(suggestion)"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>

      <!-- 消息列表 -->
      <template v-for="(message, index) in messages" :key="index">
        <!-- 用户消息 -->
        <div v-if="message.role === 'user'" class="flex justify-end">
          <div class="bg-primary-500 text-white p-3 rounded-lg rounded-tr-none max-w-[85%] break-words">
            {{ message.content }}
          </div>
        </div>
        
        <!-- 系统消息 -->
        <div v-else class="flex justify-start">
          <div class="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[85%] break-words">
            <div v-if="message.isWorkflowResponse" class="workflow-response">
              <!-- 工作流节点展示 -->
              <div class="text-sm mb-3">{{ message.content }}</div>
              <div class="workflow-preview bg-gray-50 p-3 rounded-md border border-gray-200 mb-2">
                <div v-for="(node, nodeIndex) in message.workflow?.nodes" :key="nodeIndex" class="workflow-node-preview">
                  <div class="flex items-center">
                    <div class="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      <span class="text-xs font-bold">{{ nodeIndex + 1 }}</span>
                    </div>
                    <span class="text-sm font-medium">{{ node.data.label }}</span>
                  </div>
                  <div v-if="nodeIndex < message.workflow?.nodes.length - 1" class="h-4 border-l border-gray-300 ml-2.5"></div>
                </div>
                
                <div class="mt-2 text-right">
                  <button 
                    class="px-2 py-1 bg-primary-500 text-white text-xs rounded"
                    @click="openWorkflow(message.workflow)"
                  >
                    在编辑器中打开
                  </button>
                </div>
              </div>
            </div>
            <div v-else>{{ message.content }}</div>
          </div>
        </div>
      </template>
      
      <!-- 加载中提示 -->
      <div v-if="isProcessing" class="flex justify-start">
        <div class="bg-gray-100 p-3 rounded-lg rounded-tl-none">
          <div class="flex items-center space-x-2">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span class="text-sm text-gray-500">思考中...</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 输入区域 -->
    <div class="border-t p-4 bg-white">
      <div class="relative">
        <textarea 
          v-model="userInput" 
          placeholder="描述您需要的工作流..." 
          class="w-full pl-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          :rows="inputRows"
          @keydown.enter.prevent="sendMessage"
          @input="adjustTextareaHeight"
        ></textarea>
        <button 
          class="absolute right-3 bottom-3 p-2 bg-primary-500 text-white rounded-full disabled:opacity-50"
          :disabled="!userInput.trim()"
          @click="sendMessage"
        >
          <img src="https://unpkg.com/lucide-static@latest/icons/send.svg" class="w-4 h-4" alt="发送">
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useWorkflowStore } from '../../store/modules/workflow';

// 工作流存储
const workflowStore = useWorkflowStore();
const router = useRouter();

// 聊天状态
const chatContainer = ref<HTMLElement | null>(null);
const userInput = ref('');
const inputRows = ref(1);
const isProcessing = ref(false);

// 消息类型定义
interface ChatMessage {
  role: 'user' | 'system';
  content: string;
  isWorkflowResponse?: boolean;
  workflow?: any;
}

// 聊天消息
const messages = ref<ChatMessage[]>([]);

// 提示建议
const suggestions = [
  "创建一个数据分析工作流",
  "构建一个AI文本生成工作流",
  "设计一个自动化报表工作流",
  "创建一个处理HTTP请求的工作流"
];

// 使用提示建议
const usePromptSuggestion = (suggestion: string) => {
  userInput.value = suggestion;
};

// 根据内容调整文本框高度
const adjustTextareaHeight = () => {
  const lines = userInput.value.split('\n').length;
  inputRows.value = Math.min(5, Math.max(1, lines));
};

// 发送消息
const sendMessage = async () => {
  const content = userInput.value.trim();
  if (!content || isProcessing.value) return;
  
  // 添加用户消息
  messages.value.push({
    role: 'user',
    content
  });
  
  // 清空输入
  userInput.value = '';
  inputRows.value = 1;
  
  // 滚动到底部
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
  
  // 设置处理中状态
  isProcessing.value = true;
  
  try {
    // 模拟处理延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 创建工作流
    const workflow = await workflowStore.createWorkflowFromNaturalLanguage(content);
    
    // 构建工作流描述
    let response = "";
    
    if (workflow && workflow.nodes.length > 0) {
      response = "我已根据您的描述创建了一个工作流。以下是工作流节点结构:";
      
      // 添加系统消息
      messages.value.push({
        role: 'system',
        content: response,
        isWorkflowResponse: true,
        workflow: workflow
      });
    } else {
      response = "很抱歉，我无法理解您的需求或创建相应的工作流。请尝试更清晰地描述您需要的工作流功能。";
      
      // 添加系统消息
      messages.value.push({
        role: 'system',
        content: response
      });
    }
  } catch (error) {
    console.error('工作流创建失败:', error);
    messages.value.push({
      role: 'system',
      content: "创建工作流时发生错误，请稍后重试。"
    });
  } finally {
    // 关闭处理中状态
    isProcessing.value = false;
    
    // 滚动到底部
    await nextTick();
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  }
};

// 打开工作流
const openWorkflow = (workflow: any) => {
  if (workflow && workflow.id) {
    // 导航到工作流编辑器页面
    router.push({
      name: 'WorkflowEditor',
      params: { id: workflow.id }
    });
  }
};

// 组件挂载
onMounted(() => {
  // 初始化节点模板
  workflowStore.initNodeTemplates();
});
</script>

<style scoped>
.typing-indicator {
  display: flex;
  align-items: center;
}

.typing-indicator span {
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #aaa;
  border-radius: 50%;
  margin: 0 2px;
  animation: bounce 1.5s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-4px);
  }
}

.workflow-node-preview {
  padding: 6px 0;
}
</style> 