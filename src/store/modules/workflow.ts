import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import type { Node, Edge, XYPosition } from '@vue-flow/core';
import { MarkerType } from '@vue-flow/core';

// 节点类型定义
export enum NodeType {
  BASE = 'base',
  DATA_PROCESS = 'dataProcess',
  DATA_INPUT = 'dataInput',
  DATA_OUTPUT = 'dataOutput',
  CONTROL_FLOW = 'controlFlow',
  LLM = 'llm',
  TOOL = 'tool',
}

// 节点分类
export interface NodeCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

// 节点模板
export interface NodeTemplate {
  id: string;
  type: NodeType;
  category: string;
  name: string;
  icon: string;
  description: string;
}

// 工作流定义
export interface Workflow {
  id: string;
  name: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
  createdAt: Date;
  updatedAt: Date;
}

// 模板定义
export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: string;
  createdAt: Date;
}

// 定义Store状态接口
interface WorkflowState {
  activeWorkflow: Workflow | null;
  workflows: Workflow[];
  templates: WorkflowTemplate[];
  nodeCategories: NodeCategory[];
  nodeTemplates: NodeTemplate[];
  isExecuting: boolean;
  executingNodeId: string | null;
}

export const useWorkflowStore = defineStore('workflow', {
  state: (): WorkflowState => ({
    // 当前活动的工作流
    activeWorkflow: null,
    
    // 所有工作流列表
    workflows: [],
    
    // 工作流模板
    templates: [],
    
    // 节点分类
    nodeCategories: [
      {
        id: 'base',
        name: '基础节点',
        icon: 'box',
        description: '基础功能节点',
      },
      {
        id: 'dataProcess',
        name: '处理数据节点',
        icon: 'file-cog',
        description: '数据处理相关节点',
      },
      {
        id: 'dataInput',
        name: '数据输入节点',
        icon: 'file-input',
        description: '数据输入相关节点',
      },
      {
        id: 'dataOutput',
        name: '数据输出节点',
        icon: 'file-output',
        description: '数据输出相关节点',
      },
      {
        id: 'controlFlow',
        name: '控制流节点',
        icon: 'git-branch',
        description: '控制流相关节点',
      },
      {
        id: 'llm',
        name: '大模型节点',
        icon: 'brain',
        description: '大语言模型相关节点',
      },
      {
        id: 'tool',
        name: 'MCP工具类节点',
        icon: 'tool',
        description: '工具相关节点',
      },
    ],
    
    // 节点模板
    nodeTemplates: [],
    
    // 是否在执行工作流
    isExecuting: false,
    
    // 当前执行的节点ID
    executingNodeId: null,
  }),

  getters: {
    // 获取指定分类的节点模板
    getTemplatesByCategory: (state) => (categoryId: string) => {
      return state.nodeTemplates.filter(template => template.category === categoryId);
    },
    
    // 获取所有工作流数据
    getAllWorkflows: (state) => {
      return state.workflows;
    },
    
    // 获取工作流模板数据
    getAllTemplates: (state) => {
      return state.templates;
    },
  },

  actions: {
    // 初始化节点模板
    initNodeTemplates() {
      this.nodeTemplates = [
        // 基础节点
        {
          id: 'trigger',
          type: NodeType.BASE,
          category: 'base',
          name: '触发器',
          icon: 'activity',
          description: '工作流的触发入口',
        },
        {
          id: 'filter',
          type: NodeType.BASE,
          category: 'base',
          name: '过滤器',
          icon: 'filter',
          description: '过滤数据',
        },
        {
          id: 'code',
          type: NodeType.BASE,
          category: 'base',
          name: '代码',
          icon: 'code',
          description: '执行自定义代码',
        },
        {
          id: 'function',
          type: NodeType.BASE,
          category: 'base',
          name: '函数',
          icon: 'function-square',
          description: '执行特定函数',
        },
        
        // 处理数据节点
        {
          id: 'transform',
          type: NodeType.DATA_PROCESS,
          category: 'dataProcess',
          name: '数据转换',
          icon: 'repeat',
          description: '转换数据格式',
        },
        {
          id: 'analyze',
          type: NodeType.DATA_PROCESS,
          category: 'dataProcess',
          name: '数据分析',
          icon: 'bar-chart',
          description: '分析数据',
        },
        
        // 数据输入节点
        {
          id: 'http-request',
          type: NodeType.DATA_INPUT,
          category: 'dataInput',
          name: 'HTTP请求',
          icon: 'wifi',
          description: '发送HTTP请求获取数据',
        },
        {
          id: 'database-input',
          type: NodeType.DATA_INPUT,
          category: 'dataInput',
          name: '数据库输入',
          icon: 'database',
          description: '从数据库读取数据',
        },
        
        // 数据输出节点
        {
          id: 'file-output',
          type: NodeType.DATA_OUTPUT,
          category: 'dataOutput',
          name: '文件输出',
          icon: 'save',
          description: '输出数据到文件',
        },
        {
          id: 'database-output',
          type: NodeType.DATA_OUTPUT,
          category: 'dataOutput',
          name: '数据库输出',
          icon: 'database',
          description: '输出数据到数据库',
        },
        
        // 控制流节点
        {
          id: 'if-condition',
          type: NodeType.CONTROL_FLOW,
          category: 'controlFlow',
          name: '条件判断',
          icon: 'git-branch',
          description: '条件分支',
        },
        {
          id: 'loop',
          type: NodeType.CONTROL_FLOW,
          category: 'controlFlow',
          name: '循环',
          icon: 'repeat',
          description: '循环处理数据',
        },
        
        // 大模型节点
        {
          id: 'llm-completion',
          type: NodeType.LLM,
          category: 'llm',
          name: '大模型生成',
          icon: 'brain',
          description: '调用大语言模型生成内容',
        },
        {
          id: 'llm-embedding',
          type: NodeType.LLM,
          category: 'llm',
          name: '文本嵌入',
          icon: 'layers',
          description: '生成文本向量嵌入',
        },
        
        // 工具类节点
        {
          id: 'search-tool',
          type: NodeType.TOOL,
          category: 'tool',
          name: '搜索工具',
          icon: 'search',
          description: '使用搜索引擎搜索信息',
        },
        {
          id: 'calculator',
          type: NodeType.TOOL,
          category: 'tool',
          name: '计算器',
          icon: 'calculator',
          description: '执行数学计算',
        },
      ];
    },

    // 创建新的工作流
    createWorkflow(name: string, description: string = '') {
      const newWorkflow: Workflow = {
        id: uuidv4(),
        name,
        description,
        nodes: [],
        edges: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      this.workflows.push(newWorkflow);
      this.activeWorkflow = newWorkflow;
      return newWorkflow;
    },
    
    // 加载工作流
    loadWorkflow(id: string) {
      const workflow = this.workflows.find(w => w.id === id);
      if (workflow) {
        this.activeWorkflow = workflow;
      }
      return this.activeWorkflow;
    },
    
    // 添加节点到工作流
    addNode(type: string, position: XYPosition) {
      if (!this.activeWorkflow) return null;
      
      const template = this.nodeTemplates.find(t => t.id === type);
      if (!template) return null;
      
      const newNode: Node = {
        id: `${type}-${uuidv4()}`,
        type: template.type,
        position,
        data: {
          label: template.name,
          description: template.description,
          icon: template.icon,
          template: template.id,
        },
      };
      
      this.activeWorkflow.nodes.push(newNode);
      this.activeWorkflow.updatedAt = new Date();
      
      return newNode;
    },
    
    // 连接两个节点
    connectNodes(sourceId: string, targetId: string, sourceHandle?: string, targetHandle?: string) {
      if (!this.activeWorkflow) return null;
      
      const newEdge: Edge = {
        id: `edge-${uuidv4()}`,
        source: sourceId,
        target: targetId,
        sourceHandle,
        targetHandle,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };
      
      this.activeWorkflow.edges.push(newEdge);
      this.activeWorkflow.updatedAt = new Date();
      
      return newEdge;
    },
    
    // 删除节点
    removeNode(nodeId: string) {
      if (!this.activeWorkflow) return;
      
      this.activeWorkflow.nodes = this.activeWorkflow.nodes.filter(n => n.id !== nodeId);
      // 同时删除相关连接
      this.activeWorkflow.edges = this.activeWorkflow.edges.filter(
        e => e.source !== nodeId && e.target !== nodeId
      );
      
      this.activeWorkflow.updatedAt = new Date();
    },
    
    // 删除连接
    removeEdge(edgeId: string) {
      if (!this.activeWorkflow) return;
      
      this.activeWorkflow.edges = this.activeWorkflow.edges.filter(e => e.id !== edgeId);
      this.activeWorkflow.updatedAt = new Date();
    },
    
    // 开始执行工作流
    startWorkflowExecution() {
      this.isExecuting = true;
      this.executingNodeId = null;
    },
    
    // 执行指定节点
    executeNode(nodeId: string) {
      this.executingNodeId = nodeId;
      // 这里将来会实现节点的实际执行逻辑
    },
    
    // 停止工作流执行
    stopWorkflowExecution() {
      this.isExecuting = false;
      this.executingNodeId = null;
    },
    
    // 从自然语言创建工作流
    async createWorkflowFromNaturalLanguage(description: string) {
      // TODO: 实现自然语言到工作流的转换
      console.log('创建工作流从:', description);
      
      // 简单模拟：创建一个包含触发器和代码节点的工作流
      const workflow = this.createWorkflow(`NL工作流_${new Date().toLocaleString()}`);
      
      // 添加触发器节点
      const triggerNode = this.addNode('trigger', { x: 100, y: 100 });
      
      // 添加代码节点
      const codeNode = this.addNode('code', { x: 100, y: 250 });
      
      // 连接节点
      if (triggerNode && codeNode) {
        this.connectNodes(triggerNode.id, codeNode.id);
      }
      
      return workflow;
    },
    
    // 初始化工作流模板数据
    initWorkflowTemplates() {
      this.templates = [
        {
          id: uuidv4(),
          name: '数据处理工作流',
          description: '通用数据获取和处理流程',
          preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
          category: '数据处理',
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'AI文本生成助手',
          description: '基于大模型的文本生成工作流',
          preview: 'https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=2069&auto=format&fit=crop',
          category: 'AI辅助',
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          name: '自动化报表生成',
          description: '定时获取数据并生成报表',
          preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
          category: '数据处理',
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          name: '客户服务聊天机器人',
          description: '智能客服工作流',
          preview: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1000&auto=format&fit=crop',
          category: 'AI辅助',
          createdAt: new Date(),
        },
      ];
    },
  }
}); 